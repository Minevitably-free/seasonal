<template>
  <ButtonView text="时宜时令"
    imageSrc="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/button/appropriate_seasons.png"
    @tap="navigateToSeasonalPage" />
</template>

<script>
import ButtonView from "./ButtonView.vue";

export default {
  name: "SeasonalButton",
  components: {
    ButtonView,
  },
  methods: {
    navigateToSeasonalPage() {
      uni.navigateTo({
        url: '/pages/index/components/SeasonalPage'
      });
    },
  },
};
</script>
