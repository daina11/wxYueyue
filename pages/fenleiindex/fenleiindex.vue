<template>
	<view class="content">
		<view class="switch">
			<u-swiper :list="switchlist" keyName="imgurl" indicator indicatorMode="dot" current="id"
				@click="clickswitch()" circular>
			</u-swiper>
		</view>
		<u-sticky>
			<view class="category">
				<u-tabs @change="slect()" :list="categorylist" lineWidth="30" lineColor="#f56c6c"
					:current="currentindex" :activeStyle="{
			            color: '#303133',
			            fontWeight: 'bold',
			            transform: 'scale(1.05)'
			        }" :inactiveStyle="{
			            color: '#606266',
			            transform: 'scale(1)'
			        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
				</u-tabs>
			</view>
		</u-sticky>
		<view class="shop">
			<view class="card-group">
				<uni-card class="uc" is-full="true" :cover="listItem.imgurl" v-for="(listItem,listIndex) in shoplist"
					:key="listIndex" @click="to_detail(listItem.id)">
					<view class="r">

						<view class="c-name">{{listItem.name}}</view>
						<view class="c-text">{{listItem.title}}</view>
						<view class="location">
							位置：{{listItem.location}}
						</view>
						<view class="b-text">
							<text class="price">￥{{listItem.price}}</text><text
								class="yy">{{listItem.subscribeStatus.name}}</text>
						</view>
					</view>
				</uni-card>

			</view>
			<u-loadmore :status="status" />
			<u-back-top :scroll-top="scrollTop" customStyle="background-color:#b6292f" :iconStyle="iconStyle"
				bottom="30"></u-back-top>
		</view>
	</view>
</template>

<script>
	import {
		getcategory,
		getswiper,
		getbycid
	} from '@/config/api.js';
	export default {
		data() {
			return {
				fenleiid: '',
				categorylist: {},
				currentindex: '',
				totalPages: '',
				shoplist: {},
				switchlist: {},
				page: 0,
				status: 'loadmore',
				scrollTop: 0,
				iconStyle: {
					color: '#FFFFFF'
				}
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			this.status = 'loading';
			this.page += 1
			if (this.totalPages <= this.page) {
				this.status = 'nomore'
			} else {
				//加载下一页
				setTimeout(() => {
					getbycid({
						params: {
							page: this.page,
							cid: this.fenleiid
						}
					}).then((res) => {
						this.totalPages = res.totalPages
						this.shoplist = this.shoplist.concat(res.content)
					}).catch(() => {

					})
				}, 800)

			}
		},
		methods: {
			clickswitch(id) {

				uni.$u.route({
					url: 'pages/shopindex/shopindex',
					params: {
						id: this.switchlist[id].shopId
					}
				})

			},
			slect(e) {
				this.fenleiid = e.id
				this.page = 0
				getbycid({
					params: {
						page: this.page,
						cid: this.fenleiid
					}
				}).then((res) => {
					this.totalPages = res.totalPages
					this.shoplist = res.content
					if (res.totalPages <= this.page + 1) {
						this.status = 'nomore'
					}

				}).catch(() => {

				})
			},
			to_detail(id) {
				uni.$u.route({
					url: 'pages/shopindex/shopindex',
					params: {
						id: id
					}
				})
			}
		},
		onLoad(e) {
			this.fenleiid = e.id
			this.currentindex = e.id - 1
			getcategory({}).then((res) => {
					this.categorylist = res
				}).catch(() => {

				}),
				getbycid({
					params: {
						page: this.page,
						cid: this.fenleiid
					}
				}).then((res) => {
					this.totalPages = res.totalPages
					this.shoplist = res.content
					if (this.totalPages <= this.page + 1) {
						this.status = 'nomore'
					}
				}).catch(() => {

				}),
				getswiper({}).then((res) => {
					this.switchlist = res

				}).catch(() => {

				})

		}
	}
</script>

<style lang="scss" scoped>
	/deep/.switch {
		margin: 15px 5px 15px 5px;

		.u-swiper {
			border-radius: 20px !important;
		}
	}

	.content {
		margin: 5px;
		border-radius: 20px;
	}

	.category {
		background-color: #FFFFFF;
		margin: 10px 0px 10px 0px;
		border-radius: 20px;
	}

	.shop {
		margin: 0px 5px 10px 5px;

		/deep/.uni-card {
			border-radius: 10px;
			display: flex;
			height: 150px;
			margin-bottom: 10px !important;
			padding-bottom: 12px !important;

			/deep/.uni-card__cover-image {
				height: 150px !important;
				width: 150px;
				float: left;
			}

			.r {
				width: 150px;
				float: right;
			}

			.c-name {
				color: $u-main-color;
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 10px;
			}

		.c-text {
		font-size: 15px;
		color: $u-content-color;
		font-weight: 800;
		height: 65px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		}
			.location {

				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
			}

			.price {
				font-size: 18px;
				color: #e7141a;
			}

			.yy {
				color: $u-tips-color;
				padding-left: 35px;
				width: 55px;

			}
		}
	}
</style>
