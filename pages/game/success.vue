<template>
    <view class="cf-flex-col cf-justify-start cf-relative page">
        <view class="section"></view>
        <image class="image pos"
            src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=cc6ca04c63ea4ab0ff237089460cc896.png" />
        <text class="font pos_2">今日已挑战{{ playTimes }}次</text>
        <text class="text pos_3">恭喜挑战成功</text>
        <image class="image_2 pos_4"
            src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=196c76cc616288300527a914d6bca5ed.png" />
        <text class="text_2 pos_5">用时{{ formatTime(duration) }}</text>
        <text class="font text_3 pos_6" @tap="toIndex">点击继续</text>
    </view>
</template>

<script>
import { useGameStore } from '@/store/game';

export default {
    components: {},
    props: {},
    data() {
        return {
            duration: 0
        };
    },
    computed: {
        playTimes() {
            const gameStore = useGameStore();
            return gameStore.botPlayInfo.winTimes + gameStore.botPlayInfo.loseTimes;
        }
    },
    onLoad(options) {
        this.duration = Number(options.duration || 0);
    },
    methods: {
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        },
        toIndex() {
            uni.redirectTo({
                url: '/pages/index/index'
            });
        }
    },
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

.section {
    background-image: url('https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=05c732ed80560ec032e06e3279ec366f.png');
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
    line-height: 113.95rpx;
}

.pos_3 {
    position: absolute;
    left: 17.45rpx;
    right: -5.19rpx;
    top: 374.28rpx;
}

.image_2 {
    width: 390.77rpx;
    height: 551.99rpx;
}

.pos_4 {
    position: absolute;
    left: 50%;
    top: 481.89rpx;
    transform: translateX(-50%);
}

.text_2 {
    color: #150035;
    font-size: 87.62rpx;
    font-family: Segoe UI;
    line-height: 80.61rpx;
}

.pos_5 {
    position: absolute;
    right: 142.64rpx;
    bottom: 486.85rpx;
}

.text_3 {
    line-height: 48.52rpx;
}

.pos_6 {
    position: absolute;
    left: 50%;
    bottom: 256.24rpx;
    transform: translateX(-50%);
}
</style>