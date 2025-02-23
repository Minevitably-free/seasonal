<template>
    <view class="cf-flex-col section_2">
        <view class="cf-flex-col cf-justify-start cf-items-center cf-self-center cf-relative text-wrapper">
            <text class="cf-self-start text_2">
                放置篮满了
                <br />
                关卡已完成：1%
            </text>
        </view>
        <view class="cf-flex-col cf-self-center group_1">
            <view class="cf-flex-col cf-justify-start cf-items-center cf-relative group">
                <image class="image_6"
                    src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=0a927f77fbe66a8ae02707b4b188565e.png" />
                <image class="image_5 pos_10"
                    src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=3fc3273af3a84afe07ded072100f18fd.png" />
            </view>
            <view class="cf-flex-col cf-justify-start cf-items-center cf-relative group_2 cf-mt-2">
                <image class="image_7"
                    src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=9e0791c51069ccd5e968d61fef9411a2.png" />
                <image class="image_8 pos_4"
                    src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=4fb175b76e2f50f0bb735bf0325dc8c3.png" />
                <view class="cf-flex-col cf-justify-start section_6 pos_11">
                    <view class="cf-flex-col section_7">
                        <image class="cf-self-center image_9"
                            src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=dc9f32f1bea94b11935707f800053184.png" />
                        <view class="cf-flex-col cf-self-stretch mt-33">
                            <image class="image_10"
                                src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=c1bbb3087e48c985ade145b27b0f6e80.png" />
                            <view class="cf-flex-col cf-mt-8">
                                <image class="image_11"
                                    src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=d5e6c171cf3e0ace8d9355f63b5f9f73.png" />
                                <view class="cf-flex-col cf-justify-start cf-items-center cf-relative group_4">
                                    <image class="image_13"
                                        src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=d7b32e7c6b33b0da758ec5e1fe7aba97.png" />
                                    <image class="image_12 pos_13"
                                        src="https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=13b9f7f0a4f39ed5bf2519d68f1c292e.png" />
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="cf-flex-col cf-justify-start cf-self-center mt-17"><text class="font">复活并移出所有物品</text></view>
        <view class="cf-flex-col cf-justify-start cf-items-center cf-self-center text-wrapper_2" @tap="startQuiz">
            <text class="text_4">答题复活</text>
        </view>
        <text class="abandon-text" @tap="abandon">放弃</text>
    </view>
</template>

<script>
export default {
    emits: ['start-quiz', 'abandon'],
    components: {},
    props: {},
    data() {
        return {};
    },

    methods: {
        startQuiz() {
            this.$emit('start-quiz');
        },
        abandon() {
            this.$emit('abandon');
        }
    }
};
</script>

<style scoped lang="css">
.mt-33 {
    margin-top: 57.83rpx;
}

.mt-17 {
    margin-top: 29.74rpx;
    width: 308rpx;
}

.section_2 {
    padding-bottom: 154.38rpx;
    background-color: #8af078;
    border-radius: 87.62rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 506rpx;
    height: 839.37rpx;
}

.text-wrapper {
    margin-top: -96.38rpx;
    padding: 119.16rpx 0 7.01rpx;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.text_2 {
    color: #0e0e0e;
    font-size: 35.05rpx;
    font-family: Segoe UI;
    line-height: 49.07rpx;
    text-align: center;
}

.group_1 {
    margin-top: 80.33rpx;
    width: 408.08rpx;
}

.group {
    padding: 3.15rpx 0 2.1rpx;
}

.image_6 {
    width: 173.48rpx;
    height: 61.33rpx;
}

.image_5 {
    width: 180.49rpx;
    height: 66.59rpx;
}

.pos_10 {
    position: absolute;
    left: 109.21rpx;
    bottom: 0;
}

.group_2 {
    padding: 3.98rpx 0 32.82rpx;
}

.image_7 {
    width: 403.04rpx;
    height: 175.23rpx;
}

.image_8 {
    width: 205.02rpx;
    height: 205.02rpx;
}

.pos_4 {
    position: absolute;
    left: 96.83rpx;
    top: 50%;
    transform: translateY(-50%);
}

.section_6 {
    padding: 3.17rpx 0 19.61rpx;
    background-image: url('https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=dd3c793e3ace48b5032b44821fa31a6b.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 212.03rpx;
}

.pos_11 {
    position: absolute;
    left: 93.66rpx;
    top: 0;
}

.section_7 {
    margin: 0 11.39rpx;
    padding: 14.14rpx 25.97rpx 0;
    background-image: url('https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=2f4629878a57777010a322a8f6f08019.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 189.25rpx;
}

.image_9 {
    width: 64.84rpx;
    height: 21.03rpx;
}

.image_10 {
    margin-right: 1.75rpx;
    width: 134.93rpx;
    height: 14.02rpx;
}

.image_11 {
    width: 136.68rpx;
    height: 15.77rpx;
}

.group_4 {
    padding: 3.12rpx 0 3.89rpx;
}

.image_13 {
    width: 108.64rpx;
    height: 49.07rpx;
}

.image_12 {
    width: 113.9rpx;
    height: 56.07rpx;
}

.pos_13 {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
}

.font {
    color: #0e0e0e;
    font-size: 61.33rpx;
    font-family: Segoe UI;
    line-height: 85.86rpx;
    text-align: center;
}

.text-wrapper_2 {
    margin-top: 28.18rpx;
    padding: 28.02rpx 0 23.29rpx;
    background-color: #f8dcc6;
    border-radius: 35.05rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 282.13rpx;
}

.text_4 {
    color: #150035;
    font-size: 52.57rpx;
    font-family: Segoe UI;
    line-height: 48.57rpx;
}

.abandon-text {
    margin-top: 20rpx;
    color: #0e0e0e;
    font-size: 35.05rpx;
    text-align: center;
}
</style>