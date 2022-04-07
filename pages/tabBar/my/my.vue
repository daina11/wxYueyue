<template>
	<view class="">
		<u-avatar :src="avatarscr" shape="circle" size="80"></u-avatar>
		<u-cell-group title-bg-color="rgb(246, 103, 7)">
			<u-cell icon="order" title="我的订单" iconStyle="color:#b6292f" rightIconStyle="color:#b6292f"
				titleStyle="color:#909193" isLink></u-cell>
			<u-cell class="chatwe" icon="chat" title="联系我们" iconStyle="color:#b6292f" rightIconStyle="color:#b6292f"
				titleStyle="color:#909193" isLink>
				<text slot="value" class="u-slot-value">121293</text>
			</u-cell>
			<u-cell icon="info-circle" iconStyle="color:#b6292f" title="关于我们" rightIconStyle="color:#b6292f"
				titleStyle="color:#909193" isLink></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarscr: '',
				
			}
		},
		computed: {
			//更新最新用户数据
			a() {
				this.avatarscr = this.avatarurl
			}
		},
		created() {


		},
		onLoad() {

		},
		onReady() {},
		onShow() {
			//调用封装好的登录方法 获取用户信息，查看是否授权
			this.$store.dispatch('login')
		},
		watch: {

		},
		methods: {


		},

	}
</script>

<style lang="scss" scoped>
	.u-slot-value {
		color: #909193;
	}
</style>
