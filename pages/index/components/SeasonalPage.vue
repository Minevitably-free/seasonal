<template>
  <view class="page" :style="pageStyle">
    <image class="image"
      src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/e11edf570e79834f348a31a56da4999a.png"
      @tap="navigateBack" />
    <scroll-view class="knowledge_container" scroll-y>
      <view v-for="(item, index) in solarTerms" :key="index">
        <SeasonalKnowledgeItem :image="item.image" :term="item.term" :content="item.content" :index="index"
          :totalItems="solarTerms.length" :readCount="readCount" :hasRead="item.hasRead"
          @tap="navigateToReadPage(item, index)" />
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SeasonalKnowledgeItem from './SeasonalKnowledgeItem.vue';
import { getAllSolarTerms } from '@/services/http';
import { useUserStore } from '@/store/user';
import { useGameStore } from '@/store/game';

export default defineComponent({
  components: {
    SeasonalKnowledgeItem,
  },
  data() {
    return {
      readCount: 0,
      safeAreaTop: 0
    };
  },
  computed: {
    pageStyle() {
      return {
        paddingTop: this.safeAreaTop + 'px'
      };
    },
    solarTerms() {
      return useGameStore().solarTerms;
    }
  },
  methods: {
    async fetchSolarTerms() {
      const userStore = useUserStore();
      await getAllSolarTerms(userStore.userId);
      this.readCount = this.solarTerms.filter(term => term.hasRead).length;
    },
    navigateBack() {
      uni.navigateBack();
    },
    navigateToReadPage(item: any, index: number) {
      uni.navigateTo({
        url: `/pages/index/components/SeasonalReadPage?term=${item.term}&content=${item.content}&index=${index + 1}&total=${this.solarTerms.length}&readCount=${this.readCount}`
      });
    }
  },
  mounted() {
    this.fetchSolarTerms();
  },
  onShow() {
    this.fetchSolarTerms();
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
}

.image {
  position: absolute;
  /* 改为absolute定位 */
  left: 52.57rpx;
  width: 43.81rpx;
  height: 35.05rpx;
  z-index: 1;
  /* 确保图标在scroll-view上层 */
}

.knowledge_container {
  position: absolute;
  top: 130rpx;
  /* 预留顶部空间 */
  left: 20rpx;
  right: 20rpx;
  bottom: 0;
  height: calc(100% - 150rpx);
  /* 减去顶部预留的空间 */
  overflow-y: auto;
}
</style>