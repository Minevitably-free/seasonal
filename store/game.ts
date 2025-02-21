import { get } from "http";
import { defineStore } from "pinia";
import { ref } from "vue";

interface ThemeSolarTerm {
  id: number;
  term: string;
  image: string;
  hasCollect: boolean;
}

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
  gameInfo: {
    themeImage: string;
    theme: string;
    themeSolarTerms: ThemeSolarTerm[];
    timeLimits: number;
  };
  botPlay: boolean;
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
  const gameInfo = ref<GameState["gameInfo"]>({
    themeImage: "",
    theme: "",
    themeSolarTerms: [],
    timeLimits: 0,
  });
  const botPlay = ref(false);

  const setSolarTerms = (terms: any[]) => {
    solarTerms.value = terms;
  };

  const setItemInfo = (info: GameState["itemInfo"]) => {
    itemInfo.value = info;
  };

  const setPlayTimes = (times: number) => {
    playTimes.value = times;
  };

  const getPlayTimes = () => {
    return playTimes.value;
  };

  const setBotPlayInfo = (info: GameState["botPlayInfo"]) => {
    botPlayInfo.value = info;
  };

  const setGameInfo = (info: GameState["gameInfo"]) => {
    gameInfo.value = info;
  };

  const getThemeSolarTerms = () => {
    return gameInfo.value.themeSolarTerms;
  };

  const setBotPlay = (value: boolean) => {
    botPlay.value = value;
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
    gameInfo,
    setGameInfo,
    getThemeSolarTerms,
    getPlayTimes,
    botPlay,
    setBotPlay,
  };
});
