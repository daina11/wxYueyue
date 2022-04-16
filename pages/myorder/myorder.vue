<template>
	<view>
		<view class="top">
			<u-subsection fontSize="16px" activeColor="#f56c6c" :list="list" :current="curNow" @change="sectionChange">
			</u-subsection>
		</view>

		<view class="a" v-for="(listItem,listIndex) in orderitem" :key="listIndex">
			<view class="left">
				<view class="name">
					店铺名称：{{listItem.shop.name}}
				</view>
				<view class="time">
					预约时间：{{listItem.time}}
				</view>
			</view>
			<view class="right">
				<u-button :type="btype" :text="btext" :disabled="isdisabled" @click="del(listItem.id)"></u-button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getorderunsuccess,
		getordersuccess,
		delorder
	} from '../../config/api.js'
	export default {
		data() {
			return {
				list: ['未完成', '已完成', ],
				curNow: 0,
				page: 0,
				orderitem: {},
				totalPages: '',
				btype:'error',
				isdisabled:false,
				btext:"取消预约"
			
			}
		},

		onLoad() {
			getorderunsuccess({
				params: {
					openid: this.openid,
				}
			}).then((res) => {
				this.orderitem = res
			}).catch(() => {

			})
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
				console.log(this.curNow)
				if (this.curNow == 1) {
					this.isdisabled=true
					this.btext="已完成"
					this.btype="success"
					getordersuccess({
						params: {
							openid: this.openid,
						}
					}).then((res) => {
						this.orderitem = res
					}).catch(() => {

					})
				} else {
					this.isdisabled=false
					this.btext="取消预约"
					this.btype="error"
					getorderunsuccess({
						params: {
							openid: this.openid,
						}
					}).then((res) => {
						this.orderitem = res
					}).catch(() => {

					})
				}
			},
			del(id) {
				//取消订单
				delorder({
					params: {
						id: id,
					}
				}).then((res) => {
					uni.showToast({
						title: '取消成功！',
						icon: 'none',
					});
					getorderunsuccess({
						params: {
							openid: this.openid,
						}
					}).then((res) => {
						this.orderitem = res
					}).catch(() => {

					})
				}).catch(() => {
					uni.showToast({
						title: '取消失败！',
						icon: 'none',
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.a {
		background-color: #FFFFFF;
		display: flex;
		margin: 0px 0px 10px 0px;

		.left {
			width: 80%;

			.name {
				margin-bottom: 10px;
				color: $u-main-color;
				font-size: 18px;
				font-weight: bold;
			}

			.time {
				color: $u-tips-color;
			}
		}

		/deep/.u-button {
			width: 70px;
			float: right;
			margin-top: 5px;
		}

	}

	.top {}

	.u-page {
		padding: 0;
	}

	.u-demo-block__title {
		padding: 10px 0 2px 15px;
	}

	.swipe-action {
		&__content {
			padding: 25rpx 0;

			&__text {
				font-size: 15px;
				color: $u-main-color;
				padding-left: 30rpx;
			}
		}
	}
</style>
