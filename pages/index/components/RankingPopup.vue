<template>
  <view class="group_1">
    <view class="section_2">
      <view class="section_3">
        <view class="section_4">
          <view class="section_1 header-gap">
            <text class="font text_2">排名</text>
            <text class="font text_3">主题</text>
            <text class="font text_4">时长</text>
          </view>
          <scroll-view class="data-container" scroll-y="true">
            <view v-for="(item, index) in items" :key="index" :class="[index % 2 === 0 ? 'section_15' : 'section_5']"
              class="scroll-item">
              <text class="font_3 text_6">{{ item.rank }}</text>
              <text class="font text_5">{{ item.theme }}</text>
              <text class="font_3 text_7">{{ item.duration }}</text>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
    <!-- <view class="text-wrapper pos">
            <text class="text">时令榜单</text>
            <image class="image_3 ml-4"
                src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/78f018a9aecb525ff91c61f7f8ca080c.png"
                @tap="close" />
        </view> -->
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSeasonalRankStore } from '/store/seasonalRank';

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
  }
});
</script>

<style scoped lang="css">
.group_1 {
  overflow: visible;
}

.section_1 {
  padding: 22.82rpx 25.53rpx 21.54rpx 40.76rpx;
  background-color: #b7d5a4;
  border-radius: 52.57rpx;
}

.section_2 {
  padding: 28.04rpx 0 22.78rpx;
  background-color: #decd75;
  border-radius: 87.62rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
}

.section_3 {
  margin-left: 24.53rpx;
  margin-right: 26.29rpx;
  padding: 10.51rpx 0 10.51rpx;
  background-color: #ffffff;
  border-radius: 52.57rpx;
  position: relative;
}

.section_4 {
  margin-left: 14.02rpx;
  margin-right: 14.02rpx;
  padding: 8.76rpx 17.52rpx 19.28rpx;
  background-color: #decd75;
  border-radius: 52.57rpx;
  height: 800rpx;
  /* Added to define the height */
}

.font {
  font-size: 52.57rpx;
  font-family: Segoe UI;
  line-height: 47.79rpx;
  color: #150035;
}

.text_2 {
  line-height: 48.52rpx;
}

.text_3 {
  margin-left: 81.34rpx;
  line-height: 48.05rpx;
}

.text_4 {
  margin-left: 71.41rpx;
}

.section_15 {
  padding: 22.97rpx 31.09rpx 21.59rpx 44.4rpx;
  background-color: #dae36a;
  border-radius: 52.57rpx;
  margin-bottom: 10rpx;
  /* Added gap */
}

.font_3 {
  font-size: 52.57rpx;
  font-family: Segoe UI;
  line-height: 38.06rpx;
  color: #150035;
}

.text_6 {
  line-height: 37.64rpx;
}

.text_5 {
  margin-left: 162.51rpx;
  line-height: 48.31rpx;
}

.text_7 {
  margin-left: 100.2rpx;
}

.section_5 {
  padding: 28.84rpx 31.09rpx 17.98rpx 41.36rpx;
  background-color: #b7d5a4;
  border-radius: 52.57rpx;
  margin-bottom: 10rpx;
  /* Added gap */
}

.text_9 {
  line-height: 37.43rpx;
}

.text_8 {
  margin-left: 155.1rpx;
  line-height: 46.05rpx;
}

.text_10 {
  margin-left: 100.15rpx;
}

.text-wrapper {
  padding-left: 78.94rpx;
  padding-bottom: 31.24rpx;
  background-color: #dae36a;
  border-radius: 35.05rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
  position: absolute;
  bottom: 100%;
  /* Changed from top: 0 to bottom: 100% */
  left: 50%;
  transform: translateX(-50%);
}

.pos {
  position: absolute;
  left: 50%;
  bottom: 100%;
  /* Changed from top: 0 to bottom: 100% */
  transform: translateX(-50%);
}

.text {
  margin-top: 39.64rpx;
  color: #150035;
  font-size: 87.62rpx;
  font-family: Segoe UI;
  line-height: 81.57rpx;
}

.image_3 {
  margin-top: -10.51rpx;
  width: 61.33rpx;
  height: 63.08rpx;
}

.data-container {
  max-height: calc(800rpx - 100rpx);
  /* Adjusted to fit within section_4 height */
  overflow-y: scroll;
}

.data-container::-webkit-scrollbar {
  display: none;
}

.scroll-item {
  width: 100%;
}

.header-gap {
  margin-bottom: 10rpx;
  /* Added gap */
}
</style>