<template>
  <view class="cf-flex-col cf-justify-start cf-relative group_1">
    <view class="content-wrapper">
      <view class="cf-flex-col cf-relative section_2">
        <text class="cf-self-center text_2">已收集{{ collectedCount }}/24</text>
        <scroll-view class="scroll-container" scroll-y>
          <view class="grid-container">
            <view v-for="item in solarTerms" :key="item.id" class="grid-item">
              <view class="image-wrapper" :class="{ 'uncollected': !item.hasCollect }" @tap="handleTermClick(item)">
                <image class="item-image" :src="item.image" />
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper pos_3">
        <image class="image_3 pos_2" @tap="close"
          src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/a01e03256b7f5206e73759f9b12e139c.png" />
        <text class="text">我的时令</text>
      </view>
    </view>
    <SeasonalDetailPopup v-if="showDetail" :termData="selectedTerm" @close="showDetail = false" />
  </view>
</template>

<script>
import { useUserStore } from '@/store/user';
import { getCollectedSolarTerms, getSolarTermDetail } from '@/services/http';
import SeasonalDetailPopup from './SeasonalDetailPopup.vue';

export default {
  components: {
    SeasonalDetailPopup
  },

  data() {
    return {
      solarTerms: [],
      showDetail: false,
      selectedTerm: null,
    };
  },

  computed: {
    collectedCount() {
      return this.solarTerms.filter(term => term.hasCollect).length;
    }
  },

  async created() {
    await this.loadSolarTerms();
  },

  methods: {
    async loadSolarTerms() {
      const userStore = useUserStore();
      const response = await getCollectedSolarTerms(userStore.userId);
      if (response.status === 'success') {
        this.solarTerms = response.data.allSolarTerms;
      }
    },

    async handleTermClick(term) {
      try {
        const response = await getSolarTermDetail(term.id);
        if (response.status === 'success') {
          this.selectedTerm = response.data;
          this.showDetail = true;
        }
      } catch (error) {
        uni.showToast({
          title: '获取节气详情失败',
          icon: 'none'
        });
      }
    },

    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped lang="css">
.group_1 {
  padding-top: 133.18rpx;
  width: 627.34rpx;
  position: relative;
}

.section_2 {
  padding: 84.11rpx 20rpx 20rpx;
  background-color: #b7d5a4;
  border-radius: 87.62rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
}

.text_2 {
  color: #150035;
  font-size: 52.59rpx;
  line-height: 52.59rpx;
}

.scroll-container {
  height: 800rpx;
  margin-top: 20rpx;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10rpx;
  gap: 20rpx;
  box-sizing: border-box;
}

.grid-item {
  width: calc((100% - 40rpx) / 3);
  /* 3列布局，减去间距 */
}

.image-wrapper {
  padding: 14.02rpx 0;
  background-color: #f8eccc;
  border-radius: 52.59rpx;
  width: 100%;
  aspect-ratio: 198/140;
  /* 保持原有比例 */
  border: solid 17.52rpx #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
}

.item-image {
  width: 70rpx;
  height: 70rpx;
  object-fit: contain;
}

.text-wrapper {
  padding: 42.06rpx 0 28.04rpx;
  background-color: #aaaf21db;
  border-radius: 35.05rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
  width: 480.14rpx;
}

.pos_3 {
  position: absolute;
  left: 64.84rpx;
  top: -80.51rpx;
}

.text {
  color: #150035;
  font-size: 87.62rpx;
  line-height: 87.62rpx;
}

.image_3 {
  width: 61.33rpx;
  height: 63.08rpx;
}

.pos_2 {
  position: absolute;
  right: -30rpx;
  top: -10rpx;
}

.uncollected {
  opacity: 0.5;
  background-color: #e0e0e0;
}

.content-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>