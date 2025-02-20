<template>
  <ButtonView text="加入时令"
    imageSrc="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/button/join_seasons.png"
    @tap="$emit('tap')">
  </ButtonView>
</template>

<script>
import ButtonView from "./ButtonView.vue";

export default {
  name: "inviteButton",
  components: {
    ButtonView,
  },
};
</script>
