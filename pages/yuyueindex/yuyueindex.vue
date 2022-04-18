<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<times @change="getTime" :beginTime="shopbegintime" :endTime="Shopendtime"></times>
		<view class="phone">
			<view style="margin-bottom: 45px ;">
				<u-input placeholder="请输入手机号码!" type="number " maxlength="11" @blur="cphone()" >
					<u--text text="手机号:" slot="prefix" margin="0 3px 0 0" type="tips"></u--text>
				</u-input>
			</view>
		</view>
	</view>
</template>

<script>
	import times from '../../components/pretty-times/pretty-times.vue'
	import {
		postorder,
		getshopbyid
	} from '../../config/api.js'
	export default {
		data() {
			return {
				Openid: '',
				shopid: '',
				disTime: {
					begin_time: "2022-04-18 15:00:00",
					end_time: "2022-04-18 16:00:00"
				},
				phone: '',

			}
		},
		onLoad(option) {
			const that =this
			that.Openid = option.oid
			that.shopid = option.shopid
			
		},
		methods: {
			getTime(e) {
				if (this.phone == null || this.phone == ""||e==null||e=="暂无选择") {
					uni.showToast({
						title: '请输入联系电话和选择时间！',
						icon: 'none',
					});
				} else {
					postorder({
						openid: this.Openid,
						time: e,
						shopid: this.shopid,
						phone: this.phone
					}).then((res) => {
						uni.showToast({
								title: '预约成功！！',
							},
							setTimeout(() => {
								// uni.$u.route('/pages/shopindex/shopindex', {
								// 	id: this.shopid
								// })
								uni.navigateBack({
										delta:1
									})
							}, 500)
						);

					}).catch(() => {
						uni.showToast({
							title: '预约失败！',
							icon: 'none',
						});
					})
				}

			},
			cphone(value) {
				this.phone = value
				
			}
		},
		components: {
			times
		},
		computed:{
			
		},
		watch: {
		  beginTime: {
		　　　handler (newValue, oldValue) {
		      this.beginTime = newValue
		    },
		　　　　deep: true
		　　},
		endTime: {
		　　　handler (newValue, oldValue) {
		      this.endTime = newValue
		    },
		　　　　deep: true
		　　}
		},
	
	}
</script>

<style lang="scss" scoped>
	.phone {
		background-color: #FFFFFF;
		display: flex;
		line-height: 32px;
		padding: 10px;

		.a {
			text-align: center;
			line-height: 32px;
		}
	}
</style>
