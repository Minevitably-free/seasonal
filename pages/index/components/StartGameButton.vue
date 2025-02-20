<template>
  <ButtonView imageSrc="https://minio.plotmax.opencs.site/seasonal-delights/assets/images/button/start_game.png"
    :size="'200rpx'" @tap="startGame" />
</template>

<script>
import ButtonView from "./ButtonView.vue";

export default {
  name: "StartGameButton",
  components: {
    ButtonView,
  },
  methods: {
    startGame() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped></style>
