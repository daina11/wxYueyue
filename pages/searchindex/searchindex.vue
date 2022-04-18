<template>
	<view class="content">
		<view class="serch">
			<u-search v-model="stext" :value="stext" :clearabled="true" searchIconColor="#b6292f" @custom="search()"
				@search="search()" bgColor="#FFFFFF" borderColor="#b6292f" placeholder="请输入搜索内容" @click="search()"
				shape="round" actionText="搜索">
			</u-search>
		</view>

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
		search
	} from '@/config/api.js';
	export default {
		data() {
			return {
				stext: '',
				totalPages: '',
				shoplist: {},
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
		methods: {
			search() {
				console.log(this.stext)
				this.page=0
				search({
					params: {
						page: this.page,
						text: this.stext
					}
				}).then((res) => {
					if (res.content == "") {
						this.shoplist=""
						this.status = 'nomore'
					} else {
						this.totalPages = res.totalPages
						this.shoplist = res.content
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
		onReachBottom() {
			this.status = 'loading';
			this.page += 1
			if (this.totalPages <= this.page) {
				this.status = 'nomore'
			} else {
				//加载下一页
				setTimeout(() => {
					search({
						params: {
							page: this.page,
							text: this.stext
						}
					}).then((res) => {
						this.totalPages = res.totalPages
						this.shoplist = this.shoplist.concat(res.content)
					}).catch(() => {

					})
				}, 800)

			}
		},
		onLoad(option) {
			this.stext = option.searchword
			console.log(this.stext)
			search({
				params: {
					page: this.page,
					text: this.stext
				}
			}).then((res) => {
				if (res.content == "") {
					this.status = 'nomore'
				} else {
					if (this.totalPages <= this.page) {
						this.status = 'nomore'
					}
					this.totalPages = res.totalPages
					this.shoplist = res.content
				}

			}).catch(() => {

			})

		}
	}
</script>

<style lang="scss" scoped>
.shop {
		margin: 10px 5px 10px 5px;
		
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
			.location{
				
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
