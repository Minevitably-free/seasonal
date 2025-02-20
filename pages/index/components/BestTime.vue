<template>
  <view class="cf-flex-col cf-items-center group_4 pos_3 best_time">
    <image class="image_3"
      src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/others/shortest_completion_time.png">
    </image>
    <text class="font text text_1">通关最短用时</text>
    <text class="text text_2" :style="{ fontSize: timeFontSize }">{{ formattedBestTime }}</text>
    <text class="font text text_7">加油</text>
  </view>
</template>
<script>
import { useSeasonalRankStore } from '/store/seasonalRank';

export default {
  name: "BestTime",
  setup() {
    const seasonalRankStore = useSeasonalRankStore();
    return {
      seasonalRankStore
    };
  },
  computed: {
    formattedBestTime() {
      const totalSeconds = this.seasonalRankStore.bestRecord;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.floor(totalSeconds % 60);
      return `${String(minutes).padStart(2, '0')}分钟${String(seconds).padStart(2, '0')}秒`;
    },
    timeFontSize() {
      const text = this.formattedBestTime;
      if (text.length > 8) {
        return '65rpx';
      }
      return '75rpx';
    }
  },
  async mounted() {
    await this.seasonalRankStore.fetchRankData();
  }
};
</script>



<style scoped lang="css">
.group_4 {
  width: 462.62rpx;
}

.pos_3 {
  position: absolute;
  left: 50%;
  top: 168.34rpx;
  transform: translateX(-50%);
}

.image_3 {
  width: 380.26rpx;
  height: 380.26rpx;
}

.font {
  font-size: 61.33rpx;
  color: #0e932e;
}

.text {
  -webkit-text-stroke: 1.75rpx #ffffff;
}

.text_1 {
  margin-top: 29.72rpx;
}

.text_2 {
  width: 462.62rpx;
  margin-top: 16.86rpx;
  color: #0e932e;
  font-size: 70rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text_7 {
  margin-top: 22.64rpx;
}
</style>