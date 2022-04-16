<template>
	<view class="">

		<view class="top-row">
			<u-row>
				<u-col span="3">
					<view class="avatar">
						<u-avatar :src="avatarscr" shape="circle" size="80"></u-avatar>
					</view>
				</u-col>
				<u-col span="9">
					<u-row>
						<view class="nickname">{{nickname}}</view>
					</u-row>
					<u-row>
						<view class="city">
							{{city}}
						</view>
					</u-row>
				</u-col>
			</u-row>
		</view>

		<view class="list">
			<u-cell-group title-bg-color="rgb(246, 103, 7)" class="cell-bar">
				<u-cell icon="order" title="我的预约" url="/pages/myorder/myorder" iconStyle="color:#b6292f" rightIconStyle="color:#b6292f"
					titleStyle="color:#909193" isLink></u-cell>
				<!-- <u-cell icon="order" title="个人中心"  url="/pages/myinfo/myinfo" iconStyle="color:#b6292f" rightIconStyle="color:#b6292f"
					titleStyle="color:#909193" isLink></u-cell> -->
				<u-cell class="chatwe" icon="chat" title="联系我们"   iconStyle="color:#b6292f" rightIconStyle="color:#b6292f"
					titleStyle="color:#909193" isLink>
					<text slot="value" class="u-slot-value">121293</text>
				</u-cell>
				<u-cell icon="info-circle" url="/pages/aboutus/aboutus" iconStyle="color:#b6292f" title="关于我们" rightIconStyle="color:#b6292f"
					titleStyle="color:#909193" isLink></u-cell>
			</u-cell-group>
		</view>
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
		uni.setNavigationBarTitle({
			title: '个人中心'
		});
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
	.top-row {
		border-radius: 4px;
		margin: 10px;
		padding: 10px;
		background: linear-gradient(690deg, #ffff, #fcedfa);
	}

	.nickname {
		color: $u-content-color;
		font-size: 30px;
		padding-left: 3%;
	}

	.city {
		color: $u-tips-color;
		padding-top: 1%;
		padding-left: 3%;
	}

	.list {
		background-color: #FFFFFF;
		border-radius: 4px;
		margin-top: 20px;
		//padding-top: 15px;
	}

	.u-slot-value {
		color: #909193;
	}
</style>
