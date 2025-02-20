<template>
    <view class="cf-flex-col cf-justify-start cf-relative page">
        <view class="section"></view>
        <image class="image pos"
            src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=cc6ca04c63ea4ab0ff237089460cc896.png" />
        <text class="font pos_2">今日已挑战3次</text>
        <text class="text pos_3">恭喜获得时令</text>
        <view class="cf-flex-col cf-items-center section_2 pos_4">
            <image class="image_2"
                src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=44597f61ff81f3f4350b10c6948d102a.png" />
            <text class="cf-mt-34 text_2">立春</text>
        </view>
        <text class="font text_3 pos_5">点击继续</text>
    </view>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },

    methods: {},
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
    top: 374.04rpx;
}

.section_2 {
    padding: 43.81rpx 0 112.15rpx;
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
    width: 332.94rpx;
    height: 359.23rpx;
}

.text_2 {
    color: #150035;
    font-size: 87.62rpx;
    font-family: Segoe UI;
    line-height: 81.05rpx;
}

.text_3 {
    line-height: 48.52rpx;
}

.pos_5 {
    position: absolute;
    left: 50%;
    bottom: 256.24rpx;
    transform: translateX(-50%);
}
</style>