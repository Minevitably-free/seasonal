<template>
  <view class="back" :style="pageStyle">
    <!-- 第一排：控制按钮 -->
    <view class="control-buttons">
      <view class="control-btn" @tap="togglePause">
        <image src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/others/pause.png"
          mode="aspectFit" class="control-icon"></image>
      </view>
      <view class="control-btn" @tap="init">
        <image src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/others/restart.png"
          mode="aspectFit" class="control-icon"></image>
      </view>
    </view>

    <!-- 第二排：计时器 -->
    <view class="timer">{{ formatTime(timeLeft) }}</view>

    <!-- 第三排：游戏区域 -->
    <view class="content">
      <view class="item" v-for="(item, index) in list" :key="item.id" :style="{
        position: 'absolute',
        left: item.x + 'rpx',
        top: item.y + 'rpx',
        transform: item.transform || 'none',
        transition: item.moving ? 'all 0.5s ease-in-out' : 'none',
      }" @tap="onClick(item, index)">
        <image :src="'https://minio.plotmax.opencs.site/seasonal-delights/' + item.value.url" mode="" class="img">
        </image>
        <view class="zzc" v-if="item.active" @tap.stop=""></view>
      </view>
    </view>

    <!-- 第四排：时令槽 -->
    <view class="seasonal-slot">
      <view class="seasonal-slot-grid" v-for="index in 7" :key="index">
        <view class="item seasonal-item" v-if="
          eliminateList[index - 1] &&
          eliminateList[index - 1].gridIndex === index - 1
        " :class="{ 'seasonal-animation': eliminateList[index - 1].animating }">
          <image :src="'https://minio.plotmax.opencs.site/seasonal-delights/' + eliminateList[index - 1].value.url"
            mode="" class="img"></image>
        </view>
      </view>
    </view>

    <!-- 第五排：道具按钮 -->
    <view class="prop">
      <view class="li" @tap="changeSeason">
        <view class="btn-wrapper">
          <image src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/item/change_season.png"
            mode="aspectFit" class="prop-icon"></image>
        </view>
        <text>换节</text>
      </view>
      <view class="li" @tap="assemblySeason">
        <view class="btn-wrapper">
          <image src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/item/assembly_season.png"
            mode="aspectFit" class="prop-icon"></image>
        </view>
        <text>组节</text>
      </view>
    </view>

    <!-- 弹窗 -->
    <view class="pop" v-if="show">
      <view class="title">{{ getGameOverText }}</view>
      <view class="button" v-if="canRevive" @tap="revive">复活</view>
      <view class="button" v-if="canRevive" @tap="toIndex">放弃</view>
      <view class="button" v-if="!canRevive" @tap="init()">重新挑战</view>
      <view class="button" v-if="!canRevive" @tap="toIndex">回到首页</view>
    </view>

    <!-- 暂停遮罩 -->
    <view class="pause-mask" v-if="isPaused" @tap="togglePause">
      <view class="pause-text">已暂停</view>
      <view class="pause-tip">点击屏幕继续</view>
    </view>
  </view>
</template>

<script>
import game from "./js/game.js";
export default {
  ...game,
  data() {
    return {
      ...game.data(),
      safeAreaTop: 0
    };
  },
  computed: {
    ...game.computed,
    pageStyle() {
      return {
        paddingTop: this.safeAreaTop + 'px'
      };
    }
  },
  onLoad() {
    this.safeAreaTop = uni.$globalData.safeAreaTop;
    if (game.onLoad) {
      game.onLoad.call(this);
    }
  }
};
</script>

<style scoped>
@import url("./styles/game.css");
</style>
