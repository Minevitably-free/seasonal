const safeAreaTop = {
  value: 0,
};

export const useLayoutStore = () => {
  const setSafeAreaTop = (value) => {
    safeAreaTop.value = value;
  };

  const getSafeAreaTop = () => safeAreaTop.value;

  return {
    safeAreaTop,
    setSafeAreaTop,
    getSafeAreaTop,
  };
};
