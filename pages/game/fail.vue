<template>
    <view class="cf-flex-col cf-justify-start cf-relative page">
        <text class="font pos_2">今日已挑战{{ displayPlayTimes }}次</text>
        <text class="text pos_3">失败</text>
        <view class="cf-flex-col cf-justify-start cf-items-center image-wrapper pos_4">
            <image class="image_2"
                src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=61b9cf467b4f5cd23c050189d89b6610.png" />
        </view>
        <text class="font text_2 pos_5" @tap="toIndex">点击继续</text>
    </view>
</template>

<script>
import { useGameStore } from '@/store/game';

export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    computed: {
        displayPlayTimes() {
            const gameStore = useGameStore();
            return gameStore.botPlay
                ? gameStore.botPlayInfo.winTimes + gameStore.botPlayInfo.loseTimes
                : gameStore.playTimes;
        }
    },
    methods: {
        toIndex() {
            uni.redirectTo({
                url: '/pages/index/index'
            });
        }
    }
};
</script>

<style scoped lang="css">
.page {
    background-color: #ffffff;
    background-image: url('https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=05c732ed80560ec032e06e3279ec366f.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

.font {
    font-size: 52.57rpx;
    font-family: Segoe UI;
    line-height: 48.94rpx;
    color: #0e932e;
}

.pos_2 {
    position: absolute;
    right: 187.41rpx;
    top: 257.42rpx;
}

.text {
    color: #0e932e;
    font-size: 122.66rpx;
    font-family: Segoe UI;
    line-height: 112.97rpx;
}

.pos_3 {
    position: absolute;
    right: 245.43rpx;
    top: 378.03rpx;
}

.image-wrapper {
    padding: 84.11rpx 0;
    background-color: #f7dbc7;
    border-radius: 87.62rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 646.61rpx;
}

.pos_4 {
    position: absolute;
    right: 45.56rpx;
    top: 588.79rpx;
}

.image_2 {
    width: 444.25rpx;
    height: 487.78rpx;
}

.text_2 {
    line-height: 48.52rpx;
}

.pos_5 {
    position: absolute;
    left: 50%;
    bottom: 256.24rpx;
    transform: translateX(-50%);
}
</style>