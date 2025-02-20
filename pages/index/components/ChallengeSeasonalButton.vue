<template>
  <ButtonView text="彼此时令"
    imageSrc="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/button/mutual_seasons.png"
    @tap="navigateToChallengeSeasonalPage" />
</template>

<script>
import ButtonView from "./ButtonView.vue";

export default {
  name: "ChallengeSeasonalButton",
  components: {
    ButtonView,
  },
  methods: {
    navigateToChallengeSeasonalPage() {
      uni.navigateTo({
        url: '/pages/index/components/ChallengeSeasonalPage'
      });
    },
  },
};
</script>
