<template>
    <view class="cf-flex-col section_2 pos_8">
        <text class="cf-self-center text_2">题目{{ currentQuestion }}/3</text>
        <text class="cf-self-center font text_3">{{ question }}</text>
        <view class="cf-flex-col cf-self-stretch group_1">
            <view v-for="(option, index) in options" :key="index"
                class="cf-flex-col cf-justify-start cf-items-start text-wrapper_1" :class="{ 'cf-mt-4': index > 0 }"
                @tap="selectOption(index)">
                <text class="font_2 text_4">{{ String.fromCharCode(65 + index) }}：{{ option }}</text>
            </view>
        </view>
    </view>
</template>

<script>
import { getRebornQuestion } from '@/services/http';

export default {
    props: {
        currentQuestion: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            question: '',
            options: [],
            correctOption: null
        };
    },
    async mounted() {
        await this.fetchQuestion();
    },
    methods: {
        async fetchQuestion() {
            const response = await getRebornQuestion();
            if (response.status === 'success') {
                this.question = response.data.question;
                this.options = response.data.options;
                this.correctOption = response.data.correctOption;
            }
        },
        selectOption(index) {
            if (index === this.correctOption) {
                this.$emit('correct');
            } else {
                this.$emit('wrong');
            }
        }
    }
};
</script>

<style scoped lang="css">
.section_2 {
    padding: 25.92rpx 7.52rpx 99.88rpx 12.27rpx;
    background-color: #8af078;
    border-radius: 87.62rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 506.43rpx;
}

.text_2 {
    color: #0e0e0e;
    font-size: 43.81rpx;
    font-family: Segoe UI;
    line-height: 40.04rpx;
}

.font {
    font-size: 52.57rpx;
    font-family: Segoe UI;
    line-height: 48.57rpx;
}

.text_3 {
    margin-top: 72.46rpx;
    color: #0e0e0e;
}

.group_1 {
    margin-top: 51.33rpx;
}

.text-wrapper_1 {
    margin-right: 6.5rpx;
    padding: 41.67rpx 0 25.48rpx;
    background-color: #f8dcc6;
    border-radius: 35.05rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 480.14rpx;
}

.font_2 {
    font-size: 35.05rpx;
    font-family: Segoe UI;
    line-height: 32.73rpx;
    color: #150035;
}

.text_4 {
    margin-left: 28.41rpx;
}

.text_5 {
    margin-left: 31.26rpx;
}

.text-wrapper {
    margin-right: 6.5rpx;
    padding: 41.71rpx 0 25.62rpx;
    background-color: #f8dcc6;
    border-radius: 35.05rpx;
    box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
    width: 480.14rpx;
}

.text_6 {
    margin-left: 29.65rpx;
    line-height: 32.56rpx;
}

.text_7 {
    margin-left: 31.26rpx;
}
</style>