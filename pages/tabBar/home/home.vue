<template>
	<view class="content">
		<view class="serch">
			<u--input placeholder="请输入搜索内容" shape="circle" suffixIcon="search" suffixIconStyle="color: #b6292f">
			</u--input>
		</view>

		<view class="category">
			<u-grid :border="false" col="4" @click="categoryDetail">
				<u-grid-item v-for="(listItem,listIndex) in categorylist" :key="listIndex" :name="listItem.id">
					<u--image class="img" :src="listItem.imgurl" width="60px" height="60px"></u--image>
					<!-- <u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="22"></u-icon> -->
					<text class="grid-text">{{listItem.name}}</text>
				</u-grid-item>
			</u-grid>
			<u-toast ref="uToast" />
		</view>

		<view class="switch">
			<u-swiper  :list="switchlist" keyName="imgurl" indicator indicatorMode="dot" current="id" @click="clickswitch()" circular>
			</u-swiper>
		</view>
	</view>
</template>

<script>
	import {
		getcategory,
		getswiper
	} from '@/config/api.js';
	export default {
		data() {
			return {
				categorylist: {},
				switchlist: {}
			}
		},
		onLoad() {
			getcategory({}).then((res) => {
					this.categorylist = res
				}).catch(() => {

				}),
				getswiper({}).then((res) => {
					this.switchlist = res
					
				}).catch(() => {

				})

		},
		onReady() {
		},
		methods: {
			categoryDetail(name) {
				//console.log(name)
			},
			clickswitch(id){
				console.log(this.switchlist[id].shopId)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		margin: 5px;
		border-radius: 20px;
	}

	/deep/.switch{
		margin: 15px 5px 15px 5px;
		.u-swiper{
			border-radius: 20px !important;
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

	/deep/ .serch {
		background-color: #FFFFFF;
		border-radius: 20px;
		margin-top: 20px;

		.u-border {
			border-color: #b6292f !important;
		}

	}
</style>
