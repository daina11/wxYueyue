<template>
	<view class="content">
		<view class="title">热门榜单</view>
		<view class="select">
			<u-radio-group v-model="radiovalue1" placement="row" @change="groupChange">
				<u-radio activeColor="#fa3534" :customStyle="{margin: '8px'}" v-for="(item, index) in radiolist1"
					:key="index" :label="item.name" :name="item.name">
				</u-radio>
			</u-radio-group>
		</view>

		<view class="shop">
			<view class="card-group">
				<uni-card class="uc" is-full="true" :cover="listItem.imgurl" v-for="(listItem,listIndex) in shoplist"
					:key="listIndex" @click="to_detail(listItem.id)">
					<view class="r">
						
						<view class="c-name">{{listItem.name}}</view>
						<view class="c-text">{{listItem.title}}</view>
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
		hotlist
	} from '@/config/api.js';
	export default {
		data() {
			return {
				radiolist1: [{
						name: '默认排序'
					},
					{
						name: '价格低到高'
					},
					{
						name: '价格高到低'
					}
				],
				radiovalue1: '默认排序',
				totalPages: '',
				shoplist: {},
				page: 0,
				status: 'loadmore',
				ptype:1,
				scrollTop: 0,
				iconStyle: {
					color: '#FFFFFF'
				}
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			groupChange(n) {
				if (n == '默认排序') {
					console.log('默认')
					this.ptype=1
					this.page=0
					hotlist({
						params: {
							page: this.page,
							type:this.ptype
						}
					}).then((res) => {
						this.totalPages = res.totalPages
						this.shoplist = res.content
					}).catch(() => {
					
					})
				} else if (n == '价格低到高') {
					console.log('价格低到高')
					this.page=0
					this.ptype=2
					hotlist({
						params: {
							page: this.page,
							type:this.ptype
						}
					}).then((res) => {
						this.totalPages = res.totalPages
						this.shoplist = res.content
					}).catch(() => {
					
					})
				} else if (n == '价格高到低') {
					console.log('价格高到低')
					this.page=0
					this.ptype=3
					hotlist({
						params: {
							page: this.page,
							type:this.ptype
						}
					}).then((res) => {
						this.totalPages = res.totalPages
						this.shoplist = res.content
					}).catch(() => {
					
					})
				}
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
		onReachBottom() {
			this.status = 'loading';
			this.page += 1
			if (this.totalPages <= this.page) {
				this.status = 'nomore'
			} else {
				//加载下一页
				setTimeout(() => {
					hotlist({
						params: {
							page: this.page,
							type:this.ptype
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
				title: ''
			});
			hotlist({
				params: {
					page: this.page,
					type:this.ptype
				}
			}).then((res) => {
				this.totalPages = res.totalPages
				this.shoplist = res.content
			}).catch(() => {

			})
		}
	}
</script>

<style lang="scss" scoped>
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
			.c-name{
				color: $u-main-color;
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 10px;
			}
			.c-text {
				color: $u-content-color;
				height: 85px;
				overflow: hidden;
				text-overflow: ellipsis;
				;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
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

	.title {
		color: $u-error-dark;
		font-size: 28px;
		text-align: center;
		background: linear-gradient(690deg, #eae1e0, #fa3534);
		padding: 10px;
	}

	.select {
		margin: 10px 5px 10px 5px;
		border-radius: 20px;
		background-color: #FFFFFF;
	}
</style>
