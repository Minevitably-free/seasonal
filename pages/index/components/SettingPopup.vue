<template>
  <view class="cf-flex-col cf-justify-start cf-relative group_1">
    <view class="cf-flex-col cf-relative section_2">
      <view class="cf-flex-row">
        <view class="cf-flex-col group">
          <view class="cf-flex-col cf-justify-start cf-items-center image-wrapper">
            <image class="image_6"
              src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/ce77ccbd29e8d87c8e1bce83ee055672.png" />
          </view>
          <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper_2 cf-mt-6">
            <text class="font_2 text_6">修改头像</text>
          </view>
        </view>
        <view class="cf-flex-row cf-flex-1 cf-self-start group_2 ml-23">
          <view class="cf-flex-col cf-items-start cf-flex-1">
            <text class="font text_2">默认昵称：{{ nickname }}</text>
            <text class="font text_3">性别：{{ gender }}</text>
            <text class="font text_4">年龄：{{ age }}</text>
            <text class="font text_5">地区：{{ region }}</text>
          </view>
          <image class="cf-self-start image_7 cf-ml-2"
            src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/ec13bc4d3236935a55371665f08f7da6.png" />
        </view>
      </view>
      <view class="cf-flex-col group_3">
        <view class="cf-flex-row cf-justify-between">
          <view class="cf-flex-row cf-items-start cf-self-start" @tap="toggleSetting('soundEffects')">
            <image v-if="soundEffectsEnabled" class="image_8"
              src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/c2e9becca51d4bbf883dd00c104ae90b.png" />
            <text class="font_2 text_7 ml-21">音效</text>
          </view>
          <image class="image_9 image_10"
            src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/5d32c7e87dd7b6e7618677ff551212c5.png" />
        </view>
        <view class="cf-flex-row cf-justify-between group_4">
          <view class="cf-flex-row cf-items-end cf-self-start" @tap="toggleSetting('music')">
            <image class="image_11"
              src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/9734ebce1c33a7dfaa40cd5c6ef95d77.png" />
            <text class="font_2 ml-21">音乐</text>
          </view>
          <image class="cf-self-center image_9 image_12"
            src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/4813094d4946e86d43593c0f8456a55e.png" />
        </view>
        <view class="cf-flex-row cf-items-center group_5">
          <image class="image_13"
            src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/af1e177cae933d05e61f66c4bdc82a86.png" />
          <text class="font_2 cf-ml-12">公告</text>
        </view>
      </view>
      <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper_3">
        <text class="font_2">{{ post }}</text>
      </view>
    </view>
    <view class="cf-flex-col cf-justify-start cf-items-center text-wrapper pos_6"><text class="text">设置</text></view>
    <image class="image_5 pos_5"
      src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/78f018a9aecb525ff91c61f7f8ca080c.png" />
  </view>
</template>

<script>
import { getUserInfo, getPost } from "@/services/http";
import { getUserSettings, updateUserSettings } from '@/services/http';
import { useUserStore } from '@/store/user';

export default {
  data() {
    const userStore = useUserStore();
    return {
      nickname: "",
      avatarUrl: "",
      gender: "",
      age: 0,
      region: "",
      musicEnabled: userStore.settings.musicEnabled,
      soundEffectsEnabled: userStore.settings.soundEffectsEnabled,
      post: ""
    };
  },
  async created() {
    const userStore = useUserStore();
    // 只有在没有用户数据时才请求后端
    if (!userStore.hasUserData()) {
      try {
        const response = await getUserSettings();
        if (response.status === 'success') {
          userStore.setSettings(response.data);
          this.musicEnabled = response.data.musicEnabled;
          this.soundEffectsEnabled = response.data.soundEffectsEnabled;
        }
      } catch (error) {
        console.error('获取设置失败:', error);
      }
    }
  },
  methods: {
    async fetchData() {
      try {
        const userId = "1";
        const userInfoResponse = await getUserInfo(userId);
        const postResponse = await getPost();

        if (userInfoResponse.status === "success") {
          const { nickname, avatarUrl, gender, age, region } = userInfoResponse.data;
          this.nickname = nickname;
          this.avatarUrl = avatarUrl;
          this.gender = gender === 1 ? "男" : "女";
          this.age = age;
          this.region = region;
        }

        if (postResponse.status === "success") {
          this.post = postResponse.data.post;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async toggleSetting(type) {
      const userStore = useUserStore();
      if (type === 'music') {
        this.musicEnabled = !this.musicEnabled;
      } else {
        this.soundEffectsEnabled = !this.soundEffectsEnabled;
      }

      try {
        const response = await updateUserSettings(
          this.musicEnabled,
          this.soundEffectsEnabled
        );
        if (response.status === 'success') {
          userStore.setSettings({
            musicEnabled: this.musicEnabled,
            soundEffectsEnabled: this.soundEffectsEnabled
          });
        }
      } catch (error) {
        console.error('更新设置失败:', error);
        // 更新失败时恢复原值
        if (type === 'music') {
          this.musicEnabled = !this.musicEnabled;
        } else {
          this.soundEffectsEnabled = !this.soundEffectsEnabled;
        }
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped lang="css">
.ml-23 {
  margin-left: 40.3rpx;
}

.ml-21 {
  margin-left: 36.8rpx;
}

.group_1 {
  padding-top: 134.93rpx;
  background-color: transparent !important;
  opacity: 1;
}

.section_2 {
  padding: 52.57rpx 43.81rpx 29.79rpx;
  background-color: #b7d5a4;
  border-radius: 87.62rpx;
  border: solid 1.75rpx #f2f2f2;
  box-shadow: 0rpx 17.24rpx 17.24rpx NaNpx inset inset;
}

.group {
  width: 194.51rpx;
}

.image-wrapper {
  margin-left: 3.5rpx;
  margin-right: 12.27rpx;
  padding: 12.27rpx 0;
  background-color: #ffffffc7;
  border-radius: 17.52rpx;
}

.image_6 {
  width: 147.2rpx;
  height: 154.21rpx;
}

.text-wrapper_2 {
  padding: 31.37rpx 0 15.07rpx;
  background-color: #f8dcc6;
  border-radius: 35.05rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
  width: 194.51rpx;
}

.font_2 {
  font-size: 35.05rpx;
  font-family: Segoe UI;
  line-height: 32.56rpx;
  color: #150035;
}

.text_6 {
  line-height: 32.42rpx;
}

.group_2 {
  margin-top: 4.14rpx;
}

.font {
  font-size: 35.05rpx;
  font-family: Segoe UI;
  line-height: 50.82rpx;
  color: #150035;
}

.text_2 {
  font-size: 36.8rpx;
}

.text_3 {
  font-size: 36.8rpx;
}

.text_4 {
  font-size: 36.8rpx;
}

.text_5 {
  font-size: 36.8rpx;
}

.image_7 {
  margin-top: 129.04rpx;
  width: 56.07rpx;
  height: 56.07rpx;
}

.group_3 {
  margin-top: 35.05rpx;
  padding: 0 22.78rpx;
}

.image_8 {
  width: 43.81rpx;
  height: 33.29rpx;
}

.text_7 {
  margin-top: 11.85rpx;
  line-height: 32.63rpx;
}

.image_9 {
  border-radius: 17.52rpx;
  width: 54.32rpx;
  height: 54.32rpx;
}

.image_10 {
  margin-right: 42.06rpx;
  margin-top: 5.26rpx;
}

.group_4 {
  padding: 0 1.75rpx;
}

.image_11 {
  margin-bottom: 2.35rpx;
  width: 42.06rpx;
  height: 45.56rpx;
}

.image_12 {
  margin-right: 40.3rpx;
}

.group_5 {
  margin-top: 5.26rpx;
  padding: 0 5.26rpx;
}

.image_13 {
  width: 54.32rpx;
  height: 49.07rpx;
}

.text-wrapper_3 {
  margin: 15.77rpx 17.52rpx 0 19.28rpx;
  padding: 104.86rpx 0 95.64rpx;
  background-color: #f5f5f5;
  border-radius: 52.57rpx;
  box-shadow: 0rpx 26.29rpx 26.29rpx #00000029 inset;
}

.text-wrapper {
  padding: 41.74rpx 0 31.42rpx;
  background-color: #aaaf21db;
  border-radius: 35.05rpx;
  box-shadow: 0rpx 17.52rpx 17.52rpx #00000029 inset;
  width: 329.44rpx;
}

.pos_6 {
  position: absolute;
  left: 50%;
  top: 10.51rpx;
  transform: translateX(-50%);
}

.text {
  color: #150035;
  font-size: 87.62rpx;
  font-family: Segoe UI;
  line-height: 79.29rpx;
}

.image_5 {
  width: 61.33rpx;
  height: 63.08rpx;
}

.pos_5 {
  position: absolute;
  right: 136.68rpx;
  top: 0;
}
</style>