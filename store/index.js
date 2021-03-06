import Vue from 'vue'
import Vuex from 'vuex'
//import { login, auth } from '../config/api.js';
Vue.use(Vuex)

let lifeData = {};

try{
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
}catch(e){
	
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token',"nickname"];

// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	// 下面这些值仅为示例，使用过程中请删除
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		vuex_version: '1.0.1',
		nickname:lifeData.nickname ? lifeData.nickname:"",
		avatarurl:lifeData.avatarurl ? lifeData.avatarurl:"",
		openid:lifeData.openid ? lifeData.openid:"",
		city:lifeData.city ? lifeData.city:"",
		shopbegintime:"",
		Shopendtime:'',
		//phone:lifeData.phone ? lifeData.phone:"",
		//是否需要授权
		needAuth:true,
		//登录状态
		isLogin:false
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(nameArr.length >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	},
	actions:{
		//封装登录授权
		login(){
			uni.login({
				provider:'weixin',
				success: (res) => {
					//console.log(res.code)
					//把code传到后端获取openid
					uni.$u.http.get('/wx/user/login',{params: {code: res.code}}).then((res)=>{
						// console.log(res.nickname) 
						// console.log(res) 
						var oid=res.openid
						if(res.nickname==null){
							uni.showModal({
								title: '提示！',
								content: '用户未授权，是否去授权',
								success: function (res) {
									if (res.confirm) {
										
										uni.getUserProfile({
											desc: '用于完善会员资料',//没有这个不会显示弹窗
											lang:'zh_CN',
											success: (res) => {
												//获取到用户信息后传给后台
												uni.$u.http.post('/wx/user/saveinfo', {openid: oid, nickname: res.userInfo.nickName,avatarurl:res.userInfo.avatarUrl})
												.then((res) => {
													//把用户信息保存到vuex
													store.state.nickname=res.nickname
													store.state.avatarurl=res.avatarurl
													store.state.openid=res.openid
													store.state.city=res.city
													//store.state.phone=res.phone
													uni.showToast({
														title: '授权成功！',
														duration: 2000
													});
													// console.log(store.state.nickname)
													// console.log(store.state.avatarurl)
												}).catch(() =>{
													
												})
												
											},fail: (res) => {
												uni.$u.route({url:'/pages/tabBar/home/home',type:'switchTab'});
											}
										},500)
									} else if (res.cancel) {
										uni.$u.route({url:'/pages/tabBar/home/home',type:'switchTab'});
									}
								}
							});
							
						}else if(res.nickname!=null){
							//用户名不为空的时候返回的数据直接存到vuex
							// console.log('222不为空')
							// console.log(this.avatarurl)
							// console.log(this.state)
							store.state.nickname=res.nickname
							store.state.avatarurl=res.avatarurl
							store.state.openid=res.openid
							store.state.city=res.city
							//store.state.phone=res.phone
							// console.log(store.state.phone)
							// console.log(store.state.avatarurl)
						}
					}).catch(()=>{
						
					})
				}
			})
		
		},
	}
})

export default store
