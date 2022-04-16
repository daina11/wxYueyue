<template>
	<view class="content">
		<view class="serch">
			<u-search v-model="slable" :clearabled="true" searchIconColor="#b6292f" @custom="search()" @search="search()" bgColor="#FFFFFF" borderColor="#b6292f" placeholder="请输入搜索内容"  @click="search()" shape="round" actionText="搜索">
			</u-search>
		</view>

		<view class="category">
			<u-grid :border="false" col="4" @click="categoryDetail">
				<u-grid-item v-for="(listItem,listIndex) in categorylist" :key="listIndex" :name="listItem.id">
					<u--image class="img" :src="listItem.imgurl" width="60px" height="60px"></u--image>
					<text class="grid-text">{{listItem.name}}</text>
				</u-grid-item>
			</u-grid>
			<u-toast ref="uToast" />
		</view>

		<view class="switch">
			<u-swiper :list="switchlist" keyName="imgurl" indicator indicatorMode="dot" current="id"  previousMargin="30"
                nextMargin="30"
                circular
                :autoplay="true"
                radius="5"
				@click="clickswitch()" circular>
			</u-swiper>
		</view>

		<view class="shop">
			<view class="card-group">
				<uni-card class="uc" is-full="true" :cover="listItem.imgurl" v-for="(listItem,listIndex) in shoplist"
					:key="listIndex" @click="to_detail(listItem.id)">
					<text class="c-text">{{listItem.title}}</text>
					<view class="location">
						<text>位置：{{listItem.location}}</text>
					</view>
					<view class="b-text">
						<text class="price">￥{{listItem.price}}</text><text
							class="yy">{{listItem.subscribeStatus.name}}</text>
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
		getshop
	} from '@/config/api.js';
	export default {
		data() {
			return {
				categorylist: {},
				switchlist: {},
				totalPages: '',
				shoplist: {},
				page: 0,
				status: 'loadmore',
				scrollTop: 0,
				iconStyle: {
					color: '#FFFFFF'
				},
				slable:''
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
					getshop({
						params: {
							page: this.page
						}
					}).then((res) => {
						this.totalPages = res.totalPages
						this.shoplist = this.shoplist.concat(res.content)
					}).catch(() => {

					})
				}, 800)

			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '预餐首页'
			});
			getcategory({}).then((res) => {
					this.categorylist = res
				}).catch(() => {

				}),
				getswiper({}).then((res) => {
					this.switchlist = res

				}).catch(() => {

				}),
				//获取首页商店
				getshop({
					params: {
						page: this.page
					}
				}).then((res) => {
					this.totalPages = res.totalPages
					this.shoplist = res.content
				}).catch(() => {

				})
		},
		onReady() {},
		methods: {
			categoryDetail(name) {
				//console.log(name)
				uni.$u.route({
					url: 'pages/fenleiindex/fenleiindex',
					params: {
						id:name
					}
				})
			},
			//搜索
			search(value){
				uni.$u.route({
					url: 'pages/searchindex/searchindex',
					params: {
						searchword:this.slable
					}
				})
			},
			
			
			clickswitch(id) {
				
				uni.$u.route({
					url: 'pages/shopindex/shopindex',
					params: {
						id:this.switchlist[id].shopId
					}
				})
				
			},
			to_detail(id) {
				uni.$u.route({
					url: 'pages/shopindex/shopindex',
					params: {
						id:id
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		margin: 5px;
		border-radius: 20px;
	}

	.shop {
		margin: 10px 5px 0px 5px;

		.card-group {
			display: flex;
			flex-wrap: wrap;
		}

		.uc {
			width: 47%;
			height: 30%;
			margin: 5px;

			/deep/.uni-card__cover-image {
				height: 150px !important;
			}

			.c-text {
				font-size: 16px;
				font-weight: bold;
				color: $u-content-color;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
			}
			.location{
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
			}

			.price {
				color: #e7141a;
			}

			.yy {
				color: $u-tips-color;
				padding-left: 35px;
				width: 55px;

			}
		}
	}

	/deep/.switch {
		margin: 15px 5px 15px 5px;

		.u-swiper {
	
		}
	}

	/deep/.category {
		margin: 15px 5px 15px 5px;
		background-color: #FFFFFF;
		border-radius: 20px;

		.u-image__image {
			margin-top: 10px;
		}
	}

</style>
