<template>
    <view class="cf-flex-col cf-justify-start cf-relative page" :style="pageStyle">
        <view class="section"></view>
        <image class="image_2 pos_2"
            src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/e11edf570e79834f348a31a56da4999a.png"
            @tap="navigateBack" />
        <view class="cf-flex-col cf-justify-start cf-items-center section_2 pos_3">
            <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper"><text class="font text">{{ readCount
            }}</text>
            </view>
        </view>
        <view class="cf-flex-col cf-justify-start cf-items-center section_3 pos_4">
            <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper_2">
                <text class="font text_2">{{ currentIndex }}/{{ totalItems }}</text>
            </view>
        </view>
        <view class="cf-flex-col cf-justify-start cf-items-center section_4 pos_5"><text class="text_3">{{ term
        }}</text></view>
        <text class="font_2 pos_6">{{ content }}</text>
    </view>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { getSolarTermDetail } from '@/services/http';
import { useUserStore } from '@/store/user';

export default defineComponent({
    data() {
        return {
            term: '',
            content: '',
            currentIndex: 0,
            totalItems: 0,
            readCount: 0,
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
        async markAsRead() {
            try {
                const userStore = useUserStore();
                await getSolarTermDetail(parseInt(this.term));
                this.readCount++;
            } catch (error) {
                console.error('Error marking term as read:', error);
            }
        }
    },
    mounted() {
        const { term, content, index, total } = this.$route.query;
        this.term = term as string;
        this.content = content as string;
        this.currentIndex = parseInt(index as string, 10);
        this.totalItems = parseInt(total as string, 10);
        this.markAsRead();
    },
    onLoad() {
        this.safeAreaTop = uni.$globalData.safeAreaTop;
    }
});
</script>

<style scoped lang="css">
.page {
    position: absolute;
    background-image: url("https://minio.plotmax.opencs.site/seasonal-delights/assets/images/background/game_background.jpg");
    width: 100%;
    height: 100vh;
    background-repeat: no-repeat;
}

.image_2 {
    width: 43.81rpx;
    height: 35.05rpx;
}

.pos_2 {
    position: absolute;
    left: 52.57rpx;
    top: 75.35rpx;
}

.section_2 {
    padding: 12.27rpx 0 1286.21rpx;
    background-color: #ffffffb3;
    border-radius: 87.62rpx;
    width: 145.44rpx;
}

.pos_3 {
    position: absolute;
    left: 54.32rpx;
    top: 159.46rpx;
}

.text-wrapper {
    padding: 30.61rpx 0 27.46rpx;
    background-color: #f80911;
    border-radius: 50%;
    width: 77.1rpx;
}

.font {
    font-size: 26.29rpx;
    font-family: Segoe UI;
    color: #ffffff;
}

.text {
    line-height: 19.03rpx;
}

.section_3 {
    padding: 10.51rpx 0 1287.97rpx;
    background-color: #ffffffb3;
    border-radius: 87.62rpx;
    width: 145.44rpx;
}

.pos_4 {
    position: absolute;
    right: 52.59rpx;
    top: 159.46rpx;
}

.text-wrapper_2 {
    padding: 32.26rpx 0 22.97rpx;
    background-color: #f80911;
    border-radius: 50%;
    width: 77.1rpx;
}

.text_2 {
    line-height: 21.87rpx;
}

.section_4 {
    padding: 55.2rpx 0 55.2rpx;
    background-color: #ffffffb3;
    width: 352.22rpx;
    height: 1200.35rpx;
}

.pos_5 {
    position: absolute;
    left: 50%;
    top: 250.58rpx;
    transform: translateX(-50%);
}

.text_3 {
    color: #150035;
    font-size: 87.62rpx;
    font-family: Segoe UI;
    line-height: 81.05rpx;
}

.font_2 {
    color: #707070;
    font-size: 52.57rpx;
    font-family: Segoe UI;
    line-height: 63.08rpx;
    text-indent: 0rpx;
    width: 533.64rpx;
}

.pos_6 {
    position: absolute;
    right: 100.99rpx;
    top: 448.9rpx;
}
</style>