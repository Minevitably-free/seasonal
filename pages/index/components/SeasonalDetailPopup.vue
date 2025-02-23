<template>
    <view class="popup-overlay">
        <view class="cf-flex-col cf-justify-start cf-items-center cf-relative group">
            <view class="cf-flex-col cf-justify-start cf-items-center cf-relative text-wrapper">
                <text class="text">{{ termData.term }}</text>
            </view>
            <view class="cf-flex-col section_2 pos_2">
                <image class="cf-self-center image_4" :src="termData.image" />
                <view class="cf-flex-col cf-justify-start cf-items-center cf-self-stretch cf-mt-60">
                    <text class="font">{{ termData.content }}</text>
                </view>
            </view>
            <image class="image_3 pos" @tap="$emit('close')"
                src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/a01e03256b7f5206e73759f9b12e139c.png" />
        </view>
    </view>
</template>

<script>
export default {
    props: {
        termData: {
            type: Object,
            required: true,
            default: () => ({
                term: '',
                image: '',
                content: '',
                id: null
            })
        }
    },
    emits: ['close']
};
</script>

<style scoped lang="css">
.popup-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}

.group {
    position: relative;
    z-index: 101;
    padding: 6.99rpx 0 1002.34rpx;
    width: 646.61rpx;
}

.text-wrapper {
    padding: 42.06rpx 0 35.05rpx;
    background-color: #aaaf21db;
    border-radius: 35.05rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 480.14rpx;
}

.text {
    color: #150035;
    font-size: 87.62rpx;
    line-height: 87.62rpx;
}

.section_2 {
    padding: 42.06rpx 56.07rpx 462.62rpx;
    background-color: #b7d5a4;
    border-radius: 87.62rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 646.61rpx;
}

.pos_2 {
    position: absolute;
    left: 0;
    right: 0;
    top: 134.91rpx;
}

.image_4 {
    width: 332.94rpx;
    height: 359.21rpx;
}

.font {
    color: #707070;
    font-size: 52.59rpx;
    line-height: 63.08rpx;
}

.image_3 {
    width: 61.33rpx;
    height: 63.08rpx;
}

.pos {
    position: absolute;
    right: 68.34rpx;
    top: 0;
}
</style>