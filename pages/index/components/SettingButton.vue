<template>
  <image class="image pos"
    src="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/settings_page/settings.png"
    @tap="showPopup" />
  <uni-popup ref="popup" type="center">
    <SettingPopup />
  </uni-popup>
</template>

<script>
import SettingPopup from "./SettingPopup.vue";

export default {
  name: "SettingButton",
  components: {
    SettingPopup,
  },
  methods: {
    showPopup() {
      console.log("showPopup");
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.image {
  width: 87.62rpx;
  height: 84.11rpx;
}

.pos {
  position: relative;
  left: 28rpx;
}
</style>