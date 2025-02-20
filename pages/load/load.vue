<template>
  <view class="load-page">
    <text class="title">消时令</text>
    <image class="logo"
      src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/ce77ccbd29e8d87c8e1bce83ee055672.png" />
    <view class="progress-container">
      <view class="progress-bar" :style="{ width: progress + '%' }"></view>
    </view>
    <text class="loading-text">{{ progress }}%加载中</text>
    <text class="notice-text">
      抵制不良游戏，拒绝盗版游戏。<br />
      注意自我保护，谨防受骗上当。<br />
      适度游戏益脑，沉迷游戏伤身。<br />
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

<style scoped>
.load-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("https://minio.plotmax.opencs.site/seasonal-delights/assets/images/background/index_background.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  color: #150035;
  font-size: 140rpx;
  font-family: Segoe UI;
  margin-bottom: 40rpx;
}

.logo {
  width: 368rpx;
  height: 386rpx;
  margin-bottom: 60rpx;
}

.progress-container {
  width: 589rpx;
  height: 56rpx;
  background-color: #b7d5a4;
  border-radius: 53rpx;
  border: solid 18rpx #ffffff;
  overflow: hidden;
  margin-bottom: 30rpx;
}

.progress-bar {
  height: 100%;
  background-color: #f8eccc;
  border-radius: 88rpx;
  transition: width 0.3s ease;
}

.loading-text {
  font-size: 35rpx;
  font-family: Segoe UI;
  color: #150035;
  margin-bottom: 40rpx;
}

.notice-text {
  font-size: 35rpx;
  font-family: Segoe UI;
  color: #150035;
  line-height: 49rpx;
  text-align: center;
  position: absolute;
  bottom: 100rpx;
}
</style>