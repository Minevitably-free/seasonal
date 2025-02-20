<template>
  <view class="cf-flex-col cf-justify-start cf-relative page">
    <text class="title">消时令</text>
    <image class="logo"
      src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/ce77ccbd29e8d87c8e1bce83ee055672.png" />
    <view class="progress-container">
      <view class="progress-bar" :style="{ width: progress + '%' }"></view>
    </view>
    <text class="loading-text">{{ progress }}%加载中</text>
    <text class="notice-text">
      抵制不良游戏，拒绝盗版游戏。
      <br />
      注意自我保护，谨防受骗上当。
      <br />
      适度游戏益脑，沉迷游戏伤身。
      <br />
      合理安排时间，享受健康生活。
    </text>
  </view>
</template>

<script>
import ResourceLoader from '../../utils/resourceLoader';

export default {
  data() {
    return {
      progress: 0
    };
  },
  onLoad() {
    // Initialize global data
    if (!uni.$globalData) {
      uni.$globalData = {};
    }
    // Get system info for safe area
    const systemInfo = uni.getSystemInfoSync();
    uni.$globalData.safeAreaTop = systemInfo.safeAreaInsets?.top || 0;

    this.startLoading();
  },
  methods: {
    async startLoading() {
      try {
        await ResourceLoader.loadAll(progress => {
          this.progress = progress;
        });

        // Store loaded resources in global state
        uni.$globalData.resourcesLoaded = true;

        // Navigate to index page
        uni.redirectTo({
          url: '/pages/index/index'
        });
      } catch (error) {
        console.error('Resource loading failed:', error);
        uni.showToast({
          title: '资源加载失败，请重试',
          icon: 'none'
        });
      }
    }
  }
};
</script>

<style scoped lang="css">
.page {
  background-color: #ffffff;
  background-image: url("https://minio.plotmax.opencs.site/seasonal-delights/assets/images/background/index_background.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
}

.title {
  color: #150035;
  font-size: 140.19rpx;
  font-family: Segoe UI;
  line-height: 130.23rpx;
  position: absolute;
  right: 157.64rpx;
  top: 263.9rpx;
}

.logo {
  width: 367.99rpx;
  height: 385.51rpx;
  position: absolute;
  left: 50%;
  top: 396.03rpx;
  transform: translateX(-50%);
}

.progress-container {
  background-color: #b7d5a4;
  border-radius: 52.57rpx;
  width: 588.79rpx;
  height: 56.07rpx;
  border: solid 17.52rpx #ffffff;
  position: absolute;
  right: 73.6rpx;
  top: 802.57rpx;
}

.progress-bar {
  background-color: #f8eccc;
  border-radius: 87.62rpx;
  height: 26.29rpx;
  transition: width 0.3s ease;
  will-change: width;
}

.base-text {
  font-size: 35.05rpx;
  font-family: Segoe UI;
  color: #150035;
}

.loading-text {
  composes: base-text;
  line-height: 32.35rpx;
  position: absolute;
  left: 50%;
  bottom: 705.56rpx;
  transform: translateX(-50%);
}

.notice-text {
  composes: base-text;
  line-height: 49.07rpx;
  width: 278.62rpx;
  position: absolute;
  right: 222.76rpx;
  top: 1415.4rpx;
}
</style>