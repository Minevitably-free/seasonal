<script setup>
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useUserStore } from "/store/user";

// Initialize global state
const globalData = {
  safeAreaTop: 0
};

// Make it accessible globally
uni.$globalData = globalData;

// Initialize stores
const userStore = useUserStore();

onLaunch(() => {
  // 获取系统信息
  const systemInfo = uni.getSystemInfoSync();
  console.log(systemInfo);
  if (systemInfo.safeAreaInsets) {
    // 计算顶部安全区域高度
    const safeAreaTop = systemInfo.safeAreaInsets.top;
    console.log("safeAreaTop", safeAreaTop);

    // Store in global state
    uni.$globalData.safeAreaTop = safeAreaTop;
  }

  // 初始化用户ID
  userStore.setUserId("1");
});

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});

// 全局分享配置
uni.onShareAppMessage(() => {
  return {
    title: '消时令 - 二十四节气',
    path: '/pages/index/index',
    imageUrl: 'https://minio.plotmax.opencs.site/seasonal-delights/assets/images/logo/LOGO.png'
  }
});
</script>
<style>
/************************************************************
** 请将全局样式拷贝到项目的全局 CSS 文件或者当前页面的顶部 **
** 否则页面将无法正常显示                                  **
************************************************************/

html {
  font-size: 16px;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', 'Microsoft Yahei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 所有平台通用 */
.safe-area-inset-top {
  width: 100%;
}

view,
image,
text {
  box-sizing: border-box;
  flex-shrink: 0;
}

#app {
  width: 100vw;
  height: 100vh;
}

.cf-flex-row {
  display: flex;
  flex-direction: row;
}

.cf-flex-col {
  display: flex;
  flex-direction: column;
}

.cf-justify-start {
  justify-content: flex-start;
}

.cf-justify-end {
  justify-content: flex-end;
}

.cf-justify-center {
  justify-content: center;
}

.cf-justify-between {
  justify-content: space-between;
}

.cf-justify-around {
  justify-content: space-around;
}

.cf-justify-evenly {
  justify-content: space-evenly;
}

.cf-items-start {
  align-items: flex-start;
}

.cf-items-end {
  align-items: flex-end;
}

.cf-items-center {
  align-items: center;
}

.cf-items-baseline {
  align-items: baseline;
}

.cf-items-stretch {
  align-items: stretch;
}

.cf-self-start {
  align-self: flex-start;
}

.cf-self-end {
  align-self: flex-end;
}

.cf-self-center {
  align-self: center;
}

.cf-self-baseline {
  align-self: baseline;
}

.cf-self-stretch {
  align-self: stretch;
}

.cf-flex-1 {
  flex: 1 1 0%;
}

.cf-flex-auto {
  flex: 1 1 auto;
}

.cf-grow {
  flex-grow: 1;
}

.cf-grow-0 {
  flex-grow: 0;
}

.cf-shrink {
  flex-shrink: 1;
}

.cf-shrink-0 {
  flex-shrink: 0;
}

.cf-relative {
  position: relative;
}

.cf-ml-2 {
  margin-left: 3.5rpx;
}

.cf-mt-2 {
  margin-top: 3.5rpx;
}

.cf-ml-4 {
  margin-left: 7.01rpx;
}

.cf-mt-4 {
  margin-top: 7.01rpx;
}

.cf-ml-6 {
  margin-left: 10.51rpx;
}

.cf-mt-6 {
  margin-top: 10.51rpx;
}

.cf-ml-8 {
  margin-left: 14.02rpx;
}

.cf-mt-8 {
  margin-top: 14.02rpx;
}

.cf-ml-10 {
  margin-left: 17.52rpx;
}

.cf-mt-10 {
  margin-top: 17.52rpx;
}

.cf-ml-12 {
  margin-left: 21.03rpx;
}

.cf-mt-12 {
  margin-top: 21.03rpx;
}

.cf-ml-14 {
  margin-left: 24.53rpx;
}

.cf-mt-14 {
  margin-top: 24.53rpx;
}

.cf-ml-16 {
  margin-left: 28.04rpx;
}

.cf-mt-16 {
  margin-top: 28.04rpx;
}

.cf-ml-18 {
  margin-left: 31.54rpx;
}

.cf-mt-18 {
  margin-top: 31.54rpx;
}

.cf-ml-20 {
  margin-left: 35.05rpx;
}

.cf-mt-20 {
  margin-top: 35.05rpx;
}

.cf-ml-22 {
  margin-left: 38.55rpx;
}

.cf-mt-22 {
  margin-top: 38.55rpx;
}

.cf-ml-24 {
  margin-left: 42.06rpx;
}

.cf-mt-24 {
  margin-top: 42.06rpx;
}

.cf-ml-26 {
  margin-left: 45.56rpx;
}

.cf-mt-26 {
  margin-top: 45.56rpx;
}

.cf-ml-28 {
  margin-left: 49.07rpx;
}

.cf-mt-28 {
  margin-top: 49.07rpx;
}

.cf-ml-30 {
  margin-left: 52.57rpx;
}

.cf-mt-30 {
  margin-top: 52.57rpx;
}

.cf-ml-32 {
  margin-left: 56.07rpx;
}

.cf-mt-32 {
  margin-top: 56.07rpx;
}

.cf-ml-34 {
  margin-left: 59.58rpx;
}

.cf-mt-34 {
  margin-top: 59.58rpx;
}

.cf-ml-36 {
  margin-left: 63.08rpx;
}

.cf-mt-36 {
  margin-top: 63.08rpx;
}

.cf-ml-38 {
  margin-left: 66.59rpx;
}

.cf-mt-38 {
  margin-top: 66.59rpx;
}

.cf-ml-40 {
  margin-left: 70.09rpx;
}

.cf-mt-40 {
  margin-top: 70.09rpx;
}

.cf-ml-42 {
  margin-left: 73.6rpx;
}

.cf-mt-42 {
  margin-top: 73.6rpx;
}

.cf-ml-44 {
  margin-left: 77.1rpx;
}

.cf-mt-44 {
  margin-top: 77.1rpx;
}

.cf-ml-46 {
  margin-left: 80.61rpx;
}

.cf-mt-46 {
  margin-top: 80.61rpx;
}

.cf-ml-48 {
  margin-left: 84.11rpx;
}

.cf-mt-48 {
  margin-top: 84.11rpx;
}

.cf-ml-50 {
  margin-left: 87.62rpx;
}

.cf-mt-50 {
  margin-top: 87.62rpx;
}

.cf-ml-52 {
  margin-left: 91.12rpx;
}

.cf-mt-52 {
  margin-top: 91.12rpx;
}

.cf-ml-54 {
  margin-left: 94.63rpx;
}

.cf-mt-54 {
  margin-top: 94.63rpx;
}

.cf-ml-56 {
  margin-left: 98.13rpx;
}

.cf-mt-56 {
  margin-top: 98.13rpx;
}

.cf-ml-58 {
  margin-left: 101.64rpx;
}

.cf-mt-58 {
  margin-top: 101.64rpx;
}

.cf-ml-60 {
  margin-left: 105.14rpx;
}

.cf-mt-60 {
  margin-top: 105.14rpx;
}

.cf-ml-62 {
  margin-left: 108.64rpx;
}

.cf-mt-62 {
  margin-top: 108.64rpx;
}

.cf-ml-64 {
  margin-left: 112.15rpx;
}

.cf-mt-64 {
  margin-top: 112.15rpx;
}

.cf-ml-66 {
  margin-left: 115.65rpx;
}

.cf-mt-66 {
  margin-top: 115.65rpx;
}

.cf-ml-68 {
  margin-left: 119.16rpx;
}

.cf-mt-68 {
  margin-top: 119.16rpx;
}

.cf-ml-70 {
  margin-left: 122.66rpx;
}

.cf-mt-70 {
  margin-top: 122.66rpx;
}

.cf-ml-72 {
  margin-left: 126.17rpx;
}

.cf-mt-72 {
  margin-top: 126.17rpx;
}

.cf-ml-74 {
  margin-left: 129.67rpx;
}

.cf-mt-74 {
  margin-top: 129.67rpx;
}

.cf-ml-76 {
  margin-left: 133.18rpx;
}

.cf-mt-76 {
  margin-top: 133.18rpx;
}

.cf-ml-78 {
  margin-left: 136.68rpx;
}

.cf-mt-78 {
  margin-top: 136.68rpx;
}

.cf-ml-80 {
  margin-left: 140.19rpx;
}

.cf-mt-80 {
  margin-top: 140.19rpx;
}

.cf-ml-82 {
  margin-left: 143.69rpx;
}

.cf-mt-82 {
  margin-top: 143.69rpx;
}

.cf-ml-84 {
  margin-left: 147.2rpx;
}

.cf-mt-84 {
  margin-top: 147.2rpx;
}

.cf-ml-86 {
  margin-left: 150.7rpx;
}

.cf-mt-86 {
  margin-top: 150.7rpx;
}

.cf-ml-88 {
  margin-left: 154.21rpx;
}

.cf-mt-88 {
  margin-top: 154.21rpx;
}

.cf-ml-90 {
  margin-left: 157.71rpx;
}

.cf-mt-90 {
  margin-top: 157.71rpx;
}

.cf-ml-92 {
  margin-left: 161.21rpx;
}

.cf-mt-92 {
  margin-top: 161.21rpx;
}

.cf-ml-94 {
  margin-left: 164.72rpx;
}

.cf-mt-94 {
  margin-top: 164.72rpx;
}

.cf-ml-96 {
  margin-left: 168.22rpx;
}

.cf-mt-96 {
  margin-top: 168.22rpx;
}

.cf-ml-98 {
  margin-left: 171.73rpx;
}

.cf-mt-98 {
  margin-top: 171.73rpx;
}

.cf-ml-100 {
  margin-left: 175.23rpx;
}

.cf-mt-100 {
  margin-top: 175.23rpx;
}
</style>
