<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<view class="page safe-area-inset-top" :style="pageStyle">
		<SettingButton class="button-scale" />
		<BestTime />
		<view class="grid">
			<!-- 第一行 -->
			<view class="row">
				<SeasonalButton class="grid-item button-scale" />
				<RankingButton @tap="showRankingPopup" class="grid-item button-scale" />
				<MySeasonalButton @tap="showMySeasonalPopup" class="grid-item button-scale" />
			</view>
			<!-- 第二行 -->
			<view class="row">
				<inviteButton @tap="showinvitePopup" class="grid-item button-scale" />
				<StartGameButton @tap="toGame" class="grid-item button-scale" />
				<ChallengeSeasonalButton class="grid-item button-scale" />
			</view>
		</view>
		<uni-popup ref="rankingPopup" type="center">
			<RankingPopup @close="closeRankingPopup" />
		</uni-popup>
		<uni-popup ref="mySeasonalPopup" type="center" :mask-click="false">
			<MySeasonalPopup @close="closeMySeasonalPopup" />
		</uni-popup>
		<uni-popup ref="invitePopup" type="center">
			<invitePopup @close="closeinvitePopup" />
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
import { useUserStore } from '@/store/user';
import { useGameStore } from '@/store/game';
import { startGame } from '@/services/http';
import {
	getUserInfo,
	getUserSettings,
	getCollectedSolarTerms,
	getShareInfo,
	getItemInfo,
	getBotPlayInfo
} from '@/services/http';

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
	async onLoad() {
		// Check if resources are loaded
		if (!uni.$globalData.resourcesLoaded) {
			uni.redirectTo({
				url: '/pages/load/load'
			});
			return;
		}
		this.safeAreaTop = uni.$globalData.safeAreaTop;

		// 初始化游戏数据
		await this.initGameData();
	},
	methods: {
		async toGame() {
			const userStore = useUserStore();
			const gameStore = useGameStore();

			try {
				const response = await startGame(userStore.userId, false, '');
				if (response.status === 'success') {
					gameStore.setGameInfo(response.data);
					gameStore.setBotPlay(false); // 设置为普通游戏模式
					uni.navigateTo({
						url: '/pages/game/game1'
					});
				} else {
					uni.showToast({
						title: '挑战次数不足',
						icon: 'none'
					});
				}
			} catch (error) {
				uni.showToast({
					title: error?.message || '开始游戏失败',
					icon: 'none'
				});
			}
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
		async initGameData() {
			const userStore = useUserStore();
			const gameStore = useGameStore();

			try {
				// 并行请求所有数据
				const [
					userInfoRes,
					settingsRes,
					solarTermsRes,
					shareInfoRes,
					itemInfoRes,
					botPlayInfoRes
				] = await Promise.all([
					getUserInfo(userStore.userId),
					getUserSettings(userStore.userId),
					getCollectedSolarTerms(userStore.userId),
					getShareInfo(userStore.userId),
					getItemInfo(userStore.userId),
					getBotPlayInfo()
				]);

				// 更新Store状态
				if (userInfoRes.status === 'success') {
					userStore.setUserInfo(userInfoRes.data);
				}

				if (settingsRes.status === 'success') {
					userStore.setSettings(settingsRes.data);
				}

				if (solarTermsRes.status === 'success') {
					gameStore.setSolarTerms(solarTermsRes.data.allSolarTerms);
				}

				if (shareInfoRes.status === 'success') {
					gameStore.setShareInfo(shareInfoRes.data);
				}

				if (itemInfoRes.status === 'success') {
					gameStore.setItemInfo(itemInfoRes.data);
				}

				if (botPlayInfoRes.status === 'success') {
					gameStore.setBotPlayInfo(botPlayInfoRes.data);
				}

			} catch (error) {
				console.error('初始化游戏数据失败:', error);
				uni.showToast({
					title: '初始化游戏数据失败',
					icon: 'none'
				});
			}
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

.button-scale {
	transition: transform 0.3s ease;
}

.button-scale:active {
	transform: scale(1.2);
}
</style>