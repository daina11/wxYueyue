<template>
	<view class="content">
		<view class="shop">
			<view class="card-group">
				<uni-card padding="0" spacing="0" class="uc" is-full="true">
					<image class="cover-image"  style="width:100% ; height:240px ;" :src="shopinfo.imgurl">
						<view class="c-text">
							<text class="">{{shopinfo.title}}</text>
						</view>
						<view class="b-text">
							<text class="price">￥{{shopinfo.price}}</text>
							<u-tag class="yy" :text="shopinfo.subscribeStatus.name" plain size="mini" type="warning">
							</u-tag>
						</view>
				</uni-card>

			</view>
		</view>

		<view class="info">
			<view class="name">
				{{shopinfo.name}}
			</view>
			<view class="location">
				<u-icon name="map-fill" color="#dd6161" size="20"></u-icon>我们在：{{shopinfo.location}}
			</view>
			<view class="phone">
				<u-icon name="phone-fill" color="#dd6161" size="20"></u-icon>联系电话：{{shopinfo.phone}}
			</view>
		</view>

		<view class="detail">
			<view class="s-text">
				商店详情
			</view>
			<view class="fuwenben">
				<u-parse :content="content"></u-parse>
			</view>
		</view>

		<u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true" inactiveColor="#FFFFFF"
			activeColor="#f8f8f8">
			<u-tabbar-item text="立即预定" @click="toyuding()"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		getshopbyid
	} from '@/config/api.js';
	export default {
		data() {
			return {
				shopinfo: {},
				content: ``,
				status:''
			}
		},
		computed: {

		},
		methods: {
			 toyuding() {
				this.$u.vuex('shopbegintime', this.shopinfo.begintime);
				this.$u.vuex('Shopendtime', this.shopinfo.endtime);
				 if(this.status==1){
					 uni.showToast({
					 	title: '暂停预定！',
					 	icon: 'none',
					 });
				 }else{
					 if (this.nickname == "" || this.nickname == null) {
						
					 	setTimeout(() => {
					 		var isroute = false
					 		if (isroute) {
					 			console.log("true")
					 			uni.$u.route({
					 				url: 'pages/yuyueindex/yuyueindex',
					 				params: {
					 					oid: this.openid,
					 					shopid:this.shopinfo.id,
					 					phone1:this.phone,
										btime:this.shopinfo.begintime,
										etime:this.shopinfo.endtime
					 				}
					 			})
					 		} else {
					 			this.$store.dispatch('login')
					 			console.log("false")
					 			isroute = true
					 		}
					 	}, 500);
					 } else {
					 	uni.$u.route({
					 		url: 'pages/yuyueindex/yuyueindex',
					 		params: {
					 			oid: this.openid,
					 			shopid:this.shopinfo.id,
					 			phone1:this.phone,
								btime:this.shopinfo.begintime,
								etime:this.shopinfo.endtime
					 		}
					 	})
					 }
				 }
				
			}
		},

		onLoad(option) {
			this.shopid = option.id
			getshopbyid({
				params: {
					id: option.id
				}
			}).then((res) => {
				this.shopinfo = res
				this.content = res.content
				this.status=res.subscribeStatusId
			}).catch(() => {

			})
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-tabbar__content {
		background-color: #d81e06 !important;

		.u-tabbar-item__text {
			font-size: 18px;
		}
	}

	.detail {
		//color: #f7281a;
		background-color: #FFFFFF;
		margin: 10px 5px 10px 5px;
		border-radius: 10px;
		padding: 10px;

		.s-text {
			font-size: 20px;
			color: $u-content-color;
		}

		.fuwenben {
			margin-top: 15px;
		}
	}

	.info {
		background-color: #FFFFFF;
		margin: 10px 5px 10px 5px;
		border-radius: 10px;
		padding: 10px;
		color: $u-content-color;

		.name {
			font-size: 20px;
			font-weight: bold;
			text-align: center;
			margin: 5px;
		}

		.location {
			display: flex;
			margin: 5px;
		}

		.phone {
			display: flex;
			margin: 5px;
		}
	}

	.c-text {
		color: $u-main-color;
		font-size: 25px;
		font-weight: bold;
		margin: 10px 10px 10px 10px;
		line-height: 28px;
	}

	.b-text {
		margin: 10px;
		display: flex;

		.price {
			font-size: 23px;
			color: #e7141a;
			margin-right: 70%;
		}
	}
</style>
