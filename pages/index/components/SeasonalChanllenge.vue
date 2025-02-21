<template>
    <view class="cf-flex-col cf-justify-start cf-relative page" :style="pageStyle">
        <image class="image-back"
            src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/e11edf570e79834f348a31a56da4999a.png"
            @tap="navigateBack" />
        <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper pos_2"
            @tap="startSeasonalGame('spring')">
            <text class="font">挑战春</text>
        </view>
        <view class="cf-flex-col section_2 pos_3">
            <view class="cf-flex-col cf-justify-start cf-items-center cf-relative text-wrapper"
                @tap="startSeasonalGame('summer')">
                <text class="font">挑战夏</text>
            </view>
            <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper mt-109"
                @tap="startSeasonalGame('autumn')">
                <text class="font">挑战秋</text>
            </view>
        </view>
        <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper_2 pos_4"
            @tap="startSeasonalGame('winter')">
            <text class="font text">挑战冬</text>
        </view>
    </view>
</template>

<script>
import { useUserStore } from '@/store/user';
import { useGameStore } from '@/store/game';
import { startGame } from '@/services/http';

export default {
    components: {},
    props: {},
    data() {
        return {
            safeAreaTop: 0
        };
    },
    computed: {
        pageStyle() {
            return {
                paddingTop: this.safeAreaTop + 'px'
            };
        }
    },
    methods: {
        navigateBack() {
            uni.navigateBack();
        },
        async startSeasonalGame(theme) {
            const userStore = useUserStore();
            const gameStore = useGameStore();

            try {
                const response = await startGame(userStore.userId, true, theme);
                if (response.status === 'success') {
                    gameStore.setGameInfo(response.data);
                    gameStore.setBotPlay(true); // 设置为人机对战模式
                    uni.navigateTo({
                        url: '/pages/game/game'
                    });
                } else {
                    uni.showToast({
                        title: '无法挑战',
                        icon: 'none'
                    });
                }
            } catch (error) {
                uni.showToast({
                    title: error?.message || '开始游戏失败',
                    icon: 'none'
                });
            }
        }
    },
    onLoad() {
        this.safeAreaTop = uni.$globalData.safeAreaTop;
    }
};
</script>

<style scoped lang="css">
.mt-109 {
    margin-top: 191rpx;
}

.image-back {
    position: absolute;
    /* 改为absolute定位 */
    left: 50rpx;
    width: 43.81rpx;
    height: 35.05rpx;
    z-index: 1;
    /* 确保图标在scroll-view上层 */
}

.page {
    background-image: url("https://minio.plotmax.opencs.site/seasonal-delights/assets/images/background/game_background.jpg");
    width: 100%;
    height: 100vh;
}

.section {
    /* FIX 重复背景 */
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 750rpx;
    height: 1622.66rpx;
}

.image {
    border-radius: 87.62rpx;
    width: 140.19rpx;
    height: 40.3rpx;
}

.pos {
    position: absolute;
    right: 33.29rpx;
    top: 45.56rpx;
}

.text-wrapper {
    padding: 28.04rpx 0 10.51rpx;
    background-color: #aaaf21db;
    border-radius: 35.05rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 480.14rpx;
}

.pos_2 {
    position: absolute;
    right: 127.92rpx;
    top: 127.92rpx;
}

.font {
    font-size: 122.66rpx;
    font-family: Segoe UI;
    line-height: 112.85rpx;
    color: #0e932e;
}

.section_2 {
    padding: 115.65rpx 42.06rpx 220.79rpx 56.07rpx;
    background-image: url('https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/f38b6837f3184243ea7a66e4492a0349.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 578.27rpx;
}

.pos_3 {
    position: absolute;
    left: 50%;
    top: 339.95rpx;
    transform: translateX(-50%);
}

.text-wrapper_2 {
    padding: 24.53rpx 0 14.02rpx;
    background-color: #aaaf21db;
    border-radius: 35.05rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 480.14rpx;
}

.pos_4 {
    position: absolute;
    right: 127.92rpx;
    top: 1126.75rpx;
}

.text {
    line-height: 114.08rpx;
}
</style>