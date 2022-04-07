<template>
	<view class="">
		<u-button @click="r()">dian</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		onLoad() {
			
			
		},
		onReady(){
			
		},
		methods: {
		r(){
			uni.$u.route('/pages/index/index');
			console.log("nihoa")
		}
		}
	}
</script>

<style>
</style>
