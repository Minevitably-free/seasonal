<template>
  <view class="cf-flex-col cf-justify-start group_1 pos_3">
    <view class="cf-flex-col cf-relative section_2">
      <text class="font text_2">分享1个好友：获得游戏挑战1次</text>
      <view class="cf-flex-col mt-37">
        <view class="cf-flex-col cf-justify-start cf-items-start text-wrapper_2">
          <text class="font_2 text_3">{{ sharedCount }}/1</text>
        </view>
        <view class="cf-flex-col group">
          <text class="cf-self-center font_3 text_4">分享3个好友：获得游戏挑战3次</text>
          <text class="cf-self-start font_3 text_5">+换节道具1个</text>
          <view class="cf-flex-row cf-self-stretch section_3">
            <view class="section_4"></view>
            <text class="font_2 text_6 ml-35">{{ sharedCount }}/3</text>
          </view>
        </view>
      </view>
      <view class="cf-flex-col mt-37">
        <view class="cf-flex-col cf-items-center">
          <text class="font_3 text_7">分享5个好友及以上：获得游戏挑</text>
          <text class="font_3 text_8">战3次+换节道具1个、组节道具1个</text>
        </view>
        <view class="cf-flex-col cf-mt-22">
          <view class="cf-flex-row section_3">
            <view class="section_5"></view>
            <text class="font_2 text_6 text_9 cf-ml-78">{{ sharedCount }}/5</text>
          </view>
          <view class="cf-flex-row cf-justify-center cf-items-center cf-relative section_7 mt-27">
            <button class="share-button" open-type="share">
              <image class="image_8 pos_12"
                src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/ebbb72f5c7065c894a67896091964dfe.png" />
              <text class="text_10">邀 请 好 友</text>
            </button>
          </view>
        </view>
      </view>
    </view>
    <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper pos_5">
      <text class="text">加入时令</text>
    </view>
    <image class="image_3 pos_4"
      src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/78f018a9aecb525ff91c61f7f8ca080c.png"
      @tap="close" />
  </view>
</template>

<script lang="ts">
import { getShareInfo, inviteFriend } from '@/services/http';

export default {
  data() {
    return {
      sharedCount: 0
    };
  },

  async mounted() {
    const response = await getShareInfo();
    if (response.status === 'success') {
      this.sharedCount = response.data.sharedCount;
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },

  onShareAppMessage(res) {
    return {
      title: '消时令 - 古人的二十四节气',
      path: '/pages/index/index',
      desc: '和我一起玩消时令',
      imageUrl: 'https://minio.plotmax.opencs.site/seasonal-delights/assets/images/logo/LOGO.png',
      success: async () => {
        const result = await inviteFriend();
        if (result.success) {
          this.sharedCount = result.sharedCount;
          uni.showToast({
            title: '分享成功'
          });
        } else {
          uni.showToast({
            title: '分享记录失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        uni.showToast({
          title: '分享失败',
          icon: 'none'
        });
      }
    };
  }
};
</script>

<style scoped lang="css">
.mt-37 {
  margin-top: 64.84rpx;
}

.ml-35 {
  margin-left: 61.33rpx;
}

.mt-27 {
  margin-top: 47.31rpx;
}

.group_1 {
  padding-top: 134.93rpx;
  width: 646.61rpx;
}

.section_2 {
  padding: 128.25rpx 18.1rpx 40.3rpx 29.79rpx;
  background-color: #b7d5a4;
  border-radius: 87.62rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
  width: 646.61rpx;
}

.font {
  font-size: 35.05rpx;
  font-family: Segoe UI;
  line-height: 32.56rpx;
  color: #ffffff;
}

.text_2 {
  margin-left: 43.67rpx;
  color: #150035;
  font-size: 36.8rpx;
  line-height: 34.26rpx;
}

.text-wrapper_2 {
  margin-right: 9.94rpx;
  background-color: #f8eccc;
  border-radius: 52.57rpx;
  width: 588.79rpx;
  height: 56.07rpx;
  border: solid 17.52rpx #ffffff;
}

.font_2 {
  font-size: 35.05rpx;
  font-family: Segoe UI;
  line-height: 30.61rpx;
  color: #150035;
}

.text_3 {
  margin-left: 245.45rpx;
  font-size: 36.8rpx;
}

.group {
  padding-top: 28.37rpx;
}

.font_3 {
  font-size: 35.05rpx;
  font-family: Segoe UI;
  line-height: 50.82rpx;
  color: #150035;
}

.text_4 {
  font-size: 36.8rpx;
}

.text_5 {
  margin-left: 46.23rpx;
  font-size: 36.8rpx;
}

.section_3 {
  margin-right: 9.94rpx;
  background-color: #b7d5a4;
  border-radius: 52.57rpx;
  border: solid 17.52rpx #ffffff;
}

.section_4 {
  background-color: #f8eccc;
  border-radius: 87.62rpx;
  width: 185.75rpx;
  height: 26.29rpx;
}

.text_6 {
  font-size: 36.8rpx;
}

.text_7 {
  font-size: 36.8rpx;
}

.text_8 {
  font-size: 36.8rpx;
}

.section_5 {
  background-color: #f8eccc;
  border-radius: 87.62rpx;
  width: 110.4rpx;
  height: 26.29rpx;
}

.text_9 {
  margin-right: 257.49rpx;
}

.section_7 {
  margin-right: 9.94rpx;
  padding: 22.97rpx 54.99rpx 3.31rpx;
  background-color: #f8dcc6;
  border-radius: 35.05rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
}

.image_8 {
  opacity: 0.6;
  width: 85.86rpx;
  height: 85.86rpx;
}

.pos_12 {
  position: absolute;
  left: 54.99rpx;
  top: 50%;
  transform: translateY(-50%);
}

.text_10 {
  color: #150035;
  font-size: 52.57rpx;
  font-family: Segoe UI;
  line-height: 73.6rpx;
  width: 127.92rpx;
}

.text-wrapper {
  padding: 39.81rpx 0 31.24rpx;
  background-color: #aaaf21db;
  border-radius: 35.05rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
  width: 480.14rpx;
}

.pos_5 {
  position: absolute;
  left: 50%;
  top: 10.51rpx;
  transform: translateX(-50%);
}

.text {
  color: #150035;
  font-size: 87.62rpx;
  font-family: Segoe UI;
  line-height: 81.4rpx;
}

.image_3 {
  width: 61.33rpx;
  height: 63.08rpx;
}

.pos_4 {
  position: absolute;
  right: 68.34rpx;
  top: 0;
}

.share-button {
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.share-button::after {
  border: none;
}
</style>