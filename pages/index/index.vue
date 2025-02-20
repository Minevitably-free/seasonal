<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<view class="page safe-area-inset-top" :style="pageStyle">
		<SettingButton />
		<BestTime />
		<view class="grid">
			<!-- 第一行 -->
			<view class="row">
				<SeasonalButton class="grid-item" />
				<RankingButton @tap="showRankingPopup" class="grid-item" />
				<MySeasonalButton @tap="showMySeasonalPopup" class="grid-item" />
			</view>
			<!-- 第二行 -->
			<view class="row">
				<inviteButton @tap="showinvitePopup" class="grid-item" />
				<StartGameButton @tap="toGame" class="grid-item" />
				<ChallengeSeasonalButton class="grid-item" />
			</view>
		</view>
		<uni-popup ref="rankingPopup" type="center">
			<RankingPopup />
		</uni-popup>
		<uni-popup ref="mySeasonalPopup" type="center" :mask-click="false">
			<MySeasonalPopup @close="closeMySeasonalPopup" />
		</uni-popup>
		<uni-popup ref="invitePopup" type="center">
			<invitePopup />
		</uni-popup>
	</view>
</template>

<script>
import SettingButton from "./components/SettingButton.vue";
import BestTime from "./components/BestTime.vue";
import SeasonalButton from "./components/SeasonalButton.vue";
import RankingButton from "./components/RankingButton.vue";
import MySeasonalButton from "./components/MySeasonalButton.vue";
import inviteButton from "./components/inviteButton.vue";
import StartGameButton from "./components/StartGameButton.vue";
import ChallengeSeasonalButton from "./components/ChallengeSeasonalButton.vue";
import ButtonView from "./components/ButtonView.vue";
import RankingPopup from "./components/RankingPopup.vue";
import MySeasonalPopup from "./components/MySeasonalPopup.vue";
import invitePopup from "./components/invitePopup.vue";

export default {
	components: {
		SettingButton,
		BestTime,
		SeasonalButton,
		RankingButton,
		MySeasonalButton,
		inviteButton,
		StartGameButton,
		ChallengeSeasonalButton,
		ButtonView,
		RankingPopup,
		MySeasonalPopup,
		invitePopup,
	},
	data() {
		return {
			safeAreaTop: 0
		};
	},
	onShareAppMessage() {
		return {
			title: '消时令 - 二十四节气',
			path: '/pages/index/index',
			imageUrl: 'https://minio.plotmax.opencs.site/seasonal-delights/assets/images/logo/LOGO.png'
		}
	},
	computed: {
		pageStyle() {
			return {
				paddingTop: this.safeAreaTop + 'px'
			};
		}
	},
	onLoad() {
		// Check if resources are loaded
		if (!uni.$globalData.resourcesLoaded) {
			uni.redirectTo({
				url: '/pages/load/load'
			});
			return;
		}
		this.safeAreaTop = uni.$globalData.safeAreaTop;
	},
	methods: {

		toGame() {
			// Implement game start logic here
		},
		showRankingPopup() {
			this.$refs.rankingPopup.open();
		},
		closeRankingPopup() {
			this.$refs.rankingPopup.close();
		},
		showMySeasonalPopup() {
			this.$refs.mySeasonalPopup.open();
		},
		closeMySeasonalPopup() {
			this.$refs.mySeasonalPopup.close();
		},
		showinvitePopup() {
			this.$refs.invitePopup.open();
		},
		closeinvitePopup() {
			this.$refs.invitePopup.close();
		},
		calcPageHeight() {

		}
	},
};
</script>

<style scoped>
.page {
	background-image: url("https://minio.plotmax.opencs.site/seasonal-delights/assets/images/background/index_background.jpg");
	background-size: cover;
	background-position: center;
	width: 100%;
	height: 100vh;
	box-sizing: border-box;
	flex: column;
	align-items: center;
}

.grid {
	position: absolute;
	bottom: 0;
	height: 557rpx;
	width: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	padding-left: 30rpx;
	padding-right: 30rpx;
}

.row {
	flex: 1;
	/* 每行高度均分 */
	display: flex;
	gap: 30rpx;
	/* 列间距 */
}

.grid-item {
	flex: 1;
	flex-direction: column;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>