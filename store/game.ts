import { defineStore } from "pinia";
import { ref } from "vue";

interface GameState {
  solarTerms: any[];
  itemInfo: {
    seasonExchangeItems: number;
    groupExchangeItems: number;
  };
  playTimes: number;
  botPlayInfo: {
    winTimes: number;
    loseTimes: number;
  };
}

export const useGameStore = defineStore("game", () => {
  const solarTerms = ref<any[]>([]);
  const itemInfo = ref({
    seasonExchangeItems: 0,
    groupExchangeItems: 0,
  });
  const playTimes = ref(0);
  const botPlayInfo = ref({
    winTimes: 0,
    loseTimes: 0,
  });

  const setSolarTerms = (terms: any[]) => {
    solarTerms.value = terms;
  };

  const setItemInfo = (info: GameState["itemInfo"]) => {
    itemInfo.value = info;
  };

  const setPlayTimes = (times: number) => {
    playTimes.value = times;
  };

  const setBotPlayInfo = (info: GameState["botPlayInfo"]) => {
    botPlayInfo.value = info;
  };

  return {
    solarTerms,
    itemInfo,
    playTimes,
    botPlayInfo,
    setSolarTerms,
    setItemInfo,
    setPlayTimes,
    setBotPlayInfo,
  };
});
