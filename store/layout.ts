import { ref } from "vue";

const safeAreaTop = ref(0);

export const useLayoutStore = () => {
  const setSafeAreaTop = (value: number) => {
    safeAreaTop.value = value;
  };

  const getSafeAreaTop = () => safeAreaTop.value;

  return {
    safeAreaTop,
    setSafeAreaTop,
    getSafeAreaTop,
  };
};
