<template>
    <view class="cf-flex-row cf-items-center pos_24" style="margin: 8rpx ;">
        <view class="cf-flex-col cf-justify-start cf-items-center cf-shrink-0 image-wrapper_6">
            <image class="image_13" :src="image" />
        </view>
        <view class="cf-flex-col cf-justify-center cf-items-start cf-shrink-0 text-wrapper ml-21">
            <text class="cf-relative font">{{ term }}的知识</text>
        </view>
    </view>
</template>

<script>
export default {
    name: 'SeasonalKnowledgeItem',
    props: {
        image: String,
        term: String,
        hasRead: Boolean
    }
};
</script>

<style scoped lang="css">
.ml-21 {
    margin-left: 36.8rpx;
}

.image-wrapper_6 {
    padding: 26.29rpx 0 29.79rpx;
background-color: #ffffff;
    background-color: #ffffff;
    border-radius: 50%;
    width: 120.91rpx;
    height: 120.91rpx;
}

.image_13 {
    width: 91.12rpx;
    height: 64.84rpx;
}

.text-wrapper {
    padding-left: 20.15rpx;
    opacity: 0.81;
    border-radius: 52.57rpx;
    width: calc(100% - 170rpx);
    height: 92.87rpx;
    border: solid 5.26rpx #dae36a;
}

.font {
    font-size: 52.57rpx;
    font-family: Segoe UI;
    line-height: 63.08rpx;
    color: #707070;
}
</style>