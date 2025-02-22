<template>
    <view class="cf-flex-row cf-relative page">
        <view class="control-buttons">
            <view class="control-btn" @tap="togglePause">
                <image src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/others/pause.png"
                    mode="aspectFit" class="control-icon"></image>
            </view>
            <view class="control-btn" @tap="init">
                <image src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/others/restart.png"
                    mode="aspectFit" class="control-icon"></image>
            </view>
        </view>
        <text class="timer text">10:00</text>
        <view class="seasonal-slot cf-flex-col cf-justify-start section_4 pos_19">
            <view class="seasonal-slot-grid cf-flex-row cf-justify-evenly cf-relative section_5">
                <view class="section_1" v-for="(item, index) in 7" :key="index"></view>
            </view>
        </view>
        <view class="cf-flex-row cf-justify-evenly equal-division group_7">
            <view class="cf-flex-col section_8" @tap="handleChangeSeason">
                <view class="cf-flex-col cf-justify-start cf-items-center cf-self-start cf-relative text-wrapper">
                    <text class="font">{{ itemInfo.seasonExchangeItems }}</text>
                </view>
                <image class="cf-shrink-0 image_15 image_17 cf-self-center"
                    src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/item/change_season.png" />
                <text class="font_2 text_3 text_4">换节</text>
            </view>
            <view class="cf-flex-col section_7" @tap="handleAssemblySeason">
                <view class="cf-flex-col cf-justify-start cf-items-center cf-relative text-wrapper">
                    <text class="font">{{ itemInfo.groupExchangeItems }}</text>
                </view>
                <image class="cf-shrink-0 image_15 image_18"
                    src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/item/assembly_season.png" />
                <text class="font_2 text_3 text_5">组节</text>
            </view>
        </view>

        <!-- 弹窗 -->
        <view class="pop" v-if="show && !showRevivePopup && !showQuizPopup">
            <view class="title">{{ getGameOverText }}</view>
            <view class="button" v-if="!canRevive" @tap="init()">重新挑战</view>
            <view class="button" v-if="!canRevive" @tap="toIndex">回到首页</view>
        </view>

        <!-- 复活弹窗 -->
        <RevivePopup v-if="showRevivePopup" @start-quiz="startQuiz" @abandon="handleAbandon" />

        <!-- 答题弹窗 -->
        <Question v-if="showQuizPopup" :currentQuestion="currentQuestion" @correct="handleQuizAnswer(true)"
            @wrong="handleQuizAnswer(false)" />

        <!-- 暂停遮罩 -->
        <view class="pause-mask" v-if="isPaused" @tap="togglePause">
            <view class="pause-text">已暂停</view>
            <view class="pause-tip">点击屏幕继续</view>
        </view>
    </view>
</template>

<script>
import game from "./js/game.js";
import RevivePopup from './components/RevivePopup.vue';
import Question from './components/Question.vue';
import { getItemInfo, useItem } from '@/services/http';
import { useUserStore } from '@/store/user';
import { useGameStore } from '@/store/game';

export default {
    components: {
        RevivePopup,
        Question
    },
    ...game,
    data() {
        return {
            ...game.data(),
            safeAreaTop: 0
        };
    },
    computed: {
        ...game.computed,
        pageStyle() {
            return {
                paddingTop: this.safeAreaTop + 'px'
            };
        },
        itemInfo() {
            return useGameStore().itemInfo;
        }
    },
    async onLoad() {
        this.safeAreaTop = uni.$globalData.safeAreaTop;
        if (game.onLoad) {
            game.onLoad.call(this);
        }
        // 获取道具信息
        await this.fetchItemInfo();
    },
    methods: {
        async fetchItemInfo() {
            const userStore = useUserStore();
            await getItemInfo(userStore.userId);
        },

        async handleChangeSeason() {
            if (this.isPaused) return;
            const userStore = useUserStore();
            const response = await useItem(userStore.userId, 'seasonExchange');
            if (response.status === 'success') {
                this.changeSeason();
            }
        },

        async handleAssemblySeason() {
            if (this.isPaused) return;
            const userStore = useUserStore();
            const response = await useItem(userStore.userId, 'groupExchange');
            if (response.status === 'success') {
                this.assemblySeason();
            }
        }
    }
};
</script>

<style scoped lang="css">
.page {
    background-image: url("https://minio.plotmax.opencs.site/seasonal-delights/assets/images/background/game_background.jpg");
    background-size: cover;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

/* 第一排：控制按钮 */
.control-buttons {
    display: flex;
    align-items: center;
}

.control-btn {
    width: 80rpx;
    height: 80rpx;
    /* background-color: #ffffff; */
    /* border: 2rpx solid #000; */
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.control-icon {
    width: 60%;
    height: 60%;
}

.image {
    width: 117.41rpx;
    height: 105.14rpx;
    position: absolute;
    left: 113.9rpx;
    top: 30.35rpx;
}

.text {
    color: #0e932e;
    font-size: 61.33rpx;
    font-family: Segoe UI;
    line-height: 44.65rpx;
    -webkit-text-stroke: 1.75rpx #ffffff;
    position: absolute;
    left: 50%;
    top: 142.41rpx;
    transform: translateX(-50%);
}


.section_4 {
    padding: 14.02rpx 0 12.27rpx;
    background-color: #ffffff;
    border-radius: 35.05rpx;
}

.pos_19 {
    position: absolute;
    left: 36.8rpx;
    right: 33.29rpx;
    bottom: 270rpx;
}

.section_5 {
    margin: 0 21.03rpx;
    padding: 28.04rpx 9.64rpx 19.28rpx;
    background-color: #f5f5f5;
    border-radius: 35.05rpx;
    box-shadow: 0rpx 5.26rpx 10.51rpx #00000029 inset;
}

.section_1 {
    background-color: #dbdbdb;
    border-radius: 17.52rpx;
    width: 78.86rpx;
    height: 78.86rpx;
}

.equal-division {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100rpx;
}

.group_7 {
    padding-left: 144.57rpx;
    padding-right: 144.57rpx;
    gap: 29.79rpx;
}

.section_8 {
    background-color: #f8eccc;
    border-radius: 52.57rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 210rpx;
    height: 140rpx;
    border: solid 17.52rpx #ffffff;
}

.text-wrapper {
    margin-left: 131.43rpx;
    margin-top: -36.8rpx;
    padding: 13.14rpx 0 13.14rpx;
    background-color: #f80911;
    border-radius: 50%;
    width: 50.82rpx;
}

.font {
    font-size: 35.05rpx;
    font-family: Segoe UI;
    line-height: 25.09rpx;
    color: #ffffff;
}

.image_15 {
    width: 64rpx;
    height: 64rpx;
}

.image_17 {
    margin-top: -8.76rpx;
}

.cf-self-center {
    align-self: center;
}

.font_2 {
    font-size: 35.05rpx;
    font-family: Segoe UI;
    line-height: 32.35rpx;
    color: #ffffff;
}

.text_3 {
    -webkit-text-stroke: 1.75rpx #150035;
}

.text_4 {
    margin-top: 3.73rpx;
    text-align: center;
}

.section_7 {
    align-items: center;
    background-color: #f8eccc;
    border-radius: 52.57rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 210rpx;
    height: 140.19rpx;
    border: solid 17.52rpx #ffffff;
}



.image_18 {
    margin-left: 2.45rpx;
    margin-top: -8.81rpx;
}

.text_5 {
    margin-top: 3.79rpx;
    line-height: 32.17rpx;
}

/* Add popup styles */
.pop {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background: white;
    padding: 30rpx;
    border-radius: 20rpx;
    text-align: center;
}

.pause-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.pause-text {
    color: white;
    font-size: 48rpx;
    margin-bottom: 20rpx;
}

.pause-tip {
    color: white;
    font-size: 32rpx;
}

.button {
    margin: 20rpx 0;
    padding: 20rpx 40rpx;
    background: #0e932e;
    color: white;
    border-radius: 10rpx;
}
</style>