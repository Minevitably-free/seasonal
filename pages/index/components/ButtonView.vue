<template>
    <view class="equal-division-item">
        <image class="image-button" :src="imageSrc" mode="widthFix" />
        <view v-if="text" class="  text-wrapper">
            <text class="text-button font-button">{{ text }}</text>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    props: {
        text: {
            type: String,
            default: ''
        },
        imageSrc: {
            type: String,
            required: true
        },
        size: {
            type: String,
            default: '120rpx'
        }
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped>
.equal-division-item {
    position: relative;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
}

.text-wrapper {
    padding: 64rpx 0 8rpx;
    background-color: #f8eccc;
    border-radius: 53rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    border: solid 17.52rpx #ffffff;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    /* position: absolute; */
    /* bottom: 0; */
}

.image-button {
    width: v-bind(size);
    height: v-bind(size);
    position: absolute;
    bottom: 50%;
    /* 定位到父容器中间 */
    /* left: 50%; */
    /* transform: translate(-50%, -50%); */
    /* 偏移自身宽高的一半 */
    z-index: 1;
}

.text-button {
    -webkit-text-stroke: 1.75rpx #150035;
}

.font-button {
    color: #ffffff;
    font-size: 35rpx;
}
</style>