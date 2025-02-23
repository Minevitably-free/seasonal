<template>
  <view class="popup">
    <view class="container">
      <view class="inner">
        <view class="content">
          <view class="header base-text">
            <text>排名</text>
            <text class="theme">主题</text>
            <text class="duration">时长</text>
          </view>
          <scroll-view class="list" scroll-y="true">
            <view v-for="(item, index) in items" :key="index"
              :class="['row base-text', index % 2 === 0 ? 'row-yellow' : 'row-green']">
              <text>{{ item.rank }}</text>
              <text>{{ item.theme }}</text>
              <text>{{ item.duration }}</text>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
    <view class="title">
      <image class="close"
        src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/78f018a9aecb525ff91c61f7f8ca080c.png"
        @tap="close" />
      <text class="title-text">时令榜单</text>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSeasonalRankStore } from '@/store/seasonalRank';

const seasonTranslations: { [key: string]: string } = {
  spring: '春',
  summer: '夏',
  autumn: '秋',
  winter: '冬'
};

export default defineComponent({
  setup() {
    const rankStore = useSeasonalRankStore();
    return { rankStore };
  },
  computed: {
    items() {
      return this.rankStore.rankData.gameRecords.map(record => ({
        rank: record.rank,
        theme: seasonTranslations[record.theme] || record.theme,
        duration: `${Math.floor(record.duration / 60)}分${record.duration % 60}秒`
      }));
    }
  },
  async mounted() {
    await this.rankStore.fetchRankData();
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
});
</script>

<style scoped lang="css">
/* Base text style */
.base-text {
  font-size: 52.57rpx;
  font-family: Segoe UI;
  line-height: 47.79rpx;
  color: #150035;
}

.popup {
  overflow: visible;
}

.container {
  padding: 28.04rpx 0 22.78rpx;
  background-color: #decd75;
  border-radius: 87.62rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
}

.inner {
  margin: 0 24.53rpx;
  padding: 10.51rpx 0;
  background-color: #ffffff;
  border-radius: 52.57rpx;
}

.content {
  margin: 0 14.02rpx;
  padding: 8.76rpx 17.52rpx 19.28rpx;
  background-color: #decd75;
  border-radius: 52.57rpx;
}

.header {
  padding: 22.82rpx 25.53rpx 21.54rpx 40.76rpx;
  background-color: #b7d5a4;
  border-radius: 52.57rpx;
  margin-bottom: 10rpx;
}

.header .theme {
  margin-left: 81.34rpx;
}

.header .duration {
  margin-left: 71.41rpx;
}

.list {
  max-height: calc(800rpx - 100rpx);
  overflow-y: scroll;
}

.list::-webkit-scrollbar {
  display: none;
}

.row {
  margin-bottom: 10rpx;
  border-radius: 52.57rpx;
  padding: 22.97rpx 31.09rpx 21.59rpx 44.4rpx;
}

.row-yellow {
  background-color: #dae36a;
}

.row-green {
  background-color: #b7d5a4;
}

.row text:nth-child(2) {
  margin-left: 162.51rpx;
}

.row text:nth-child(3) {
  margin-left: 100.2rpx;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  bottom: 95%;
  transform: translateX(-50%);
  background-color: #dae36a;
  border-radius: 35.05rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
}

.title-text {
  margin: 30rpx;
  color: #150035;
  font-size: 70.62rpx;
  font-family: Segoe UI;
  line-height: 81.57rpx;
}

.close {
  position: absolute;
  right: -20rpx;
  top: -20rpx;
  width: 61.33rpx;
  height: 63.08rpx;
}
</style>