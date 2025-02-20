<template>
  <view class="cf-flex-col cf-justify-start cf-relative page">
    <view class="section"></view>
    <text class="text pos_2">消时令</text>
    <image class="image_2 pos_3"
      src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/ce77ccbd29e8d87c8e1bce83ee055672.png" />
    <view class="cf-flex-col cf-justify-start cf-items-start section_2 pos_4">
      <view class="cf-shrink-0 section_3"></view>
    </view>
    <text class="font text_2 pos_5">30%加载中</text>
    <text class="font text_3 pos_6">
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
export default {
  components: {},
  props: {},
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped lang="css">
.page {
  background-color: #ffffff;
  background-image: url("https://minio.plotmax.opencs.site/seasonal-delights/assets/images/background/index_background.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.section {
  background-image: url('https://ide.code.fun/api/image?token=67b77de14ae84d001226a9eb&name=f092726461de6fb9502110baceb8300b.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 750rpx;
  height: 1622.66rpx;
}

.image {
  border-radius: 87.62rpx;
  width: 140.19rpx;
  height: 40.3rpx;
}

.text {
  color: #150035;
  font-size: 140.19rpx;
  font-family: Segoe UI;
  line-height: 130.23rpx;
}

.pos_2 {
  position: absolute;
  right: 157.64rpx;
  top: 263.9rpx;
}

.image_2 {
  width: 367.99rpx;
  height: 385.51rpx;
}

.pos_3 {
  position: absolute;
  left: 50%;
  top: 396.03rpx;
  transform: translateX(-50%);
}

.section_2 {
  background-color: #b7d5a4;
  border-radius: 52.57rpx;
  width: 588.79rpx;
  height: 56.07rpx;
  border-left: solid 17.52rpx #ffffff;
  border-right: solid 17.52rpx #ffffff;
  border-top: solid 17.52rpx #ffffff;
  border-bottom: solid 17.52rpx #ffffff;
}

.pos_4 {
  position: absolute;
  right: 73.6rpx;
  top: 802.57rpx;
}

.section_3 {
  background-color: #f8eccc;
  border-radius: 87.62rpx;
  width: 185.75rpx;
  height: 26.29rpx;
}

.font {
  font-size: 35.05rpx;
  font-family: Segoe UI;
  color: #150035;
}

.text_2 {
  line-height: 32.35rpx;
}

.pos_5 {
  position: absolute;
  left: 50%;
  bottom: 705.56rpx;
  transform: translateX(-50%);
}

.text_3 {
  line-height: 49.07rpx;
  width: 278.62rpx;
}

.pos_6 {
  position: absolute;
  right: 222.76rpx;
  top: 1415.4rpx;
}
</style>