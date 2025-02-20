<template>
  <view class="cf-flex-col cf-justify-start cf-relative page" :style="pageStyle">
    <image class="image-back"
      src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/e11edf570e79834f348a31a56da4999a.png"
      @tap="navigateBack" />
    <view class="cf-flex-col cf-justify-start cf-items-start text-wrapper pos_2">
      <text class="text">今日 胜{{ winTimes }} 败{{ loseTimes }}</text>
    </view>
    <image class="image_2 pos_3"
      src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/9b2362b66cad80bafb98e1664a4a0886.png" />
    <image class="image_3 pos_4"
      src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/da121d4293287b18fee7ef802cf64e33.png"
      @tap="navigateToSeasonalChanllenge" />
  </view>
</template>

<script>
import { getBotPlayInfo } from '@/services/http';

export default {
  components: {},
  props: {},
  data() {
    return {
      safeAreaTop: 0,
      winTimes: 0,
      loseTimes: 0
    };
  },
  computed: {
    pageStyle() {
      return {
        paddingTop: this.safeAreaTop + 'px'
      };
    }
  },
  async onLoad() {
    this.safeAreaTop = uni.$globalData.safeAreaTop;
    try {
      const response = await getBotPlayInfo();
      if (response.status === 'success') {
        this.winTimes = response.data.winTimes;
        this.loseTimes = response.data.loseTimes;
      }
    } catch (error) {
      console.error('Failed to fetch bot play info:', error);
    }
  },
  methods: {
    navigateToSeasonalChanllenge() {
      uni.navigateTo({
        url: '/pages/index/components/SeasonalChanllenge'
      });
    },
    navigateBack() {
      uni.navigateBack();
    }
  },
};
</script>

<style scoped lang="css">
.page {
  background-image: url("https://minio.plotmax.opencs.site/seasonal-delights/assets/images/background/game_background.jpg");
  width: 100%;
  height: 100vh;

}

.image-back {
  position: absolute;
  /* 改为absolute定位 */
  left: 50rpx;
  width: 43.81rpx;
  height: 35.05rpx;
  z-index: 1;
  /* 确保图标在scroll-view上层 */
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

.text-wrapper {
  padding: 42.06rpx 0 14.02rpx;
  background-color: #aaaf21db;
  border-radius: 35.05rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
  width: 480.14rpx;
}

.pos_2 {
  position: absolute;
  right: 127.92rpx;
  top: 127.92rpx;
}

.text {
  margin-left: 42.06rpx;
  color: #150035;
  font-size: 70.09rpx;
  font-family: Segoe UI;
  line-height: 98.13rpx;
  width: 396.14rpx;
  /* 增加宽度 */
  white-space: nowrap;
  /* 添加此行 */
  text-overflow: ellipsis;
  /* 添加此行 */
  overflow: hidden;
  /* 添加此行 */
  transform-origin: center;
  /* 添加此行 */
  transform: scale(0.8);
  /* 添加此行，根据需要调整缩放比例 */
}

.image_2 {
  width: 578.27rpx;
  height: 832.36rpx;
}

.pos_3 {
  position: absolute;
  left: 50%;
  top: 339.95rpx;
  transform: translateX(-50%);
}

.image_3 {
  opacity: 0.8;
  width: 516.94rpx;
  height: 154.21rpx;
}

.pos_4 {
  position: absolute;
  left: 50%;
  bottom: 238.32rpx;
  transform: translateX(-50%);
}
</style>