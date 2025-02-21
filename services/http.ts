import axios from "axios";
import mpAdapter from "axios-miniprogram-adapter";
import { useUserStore } from "/store/user";
import { useGameStore } from "@/store/game";
axios.defaults.adapter = mpAdapter;
const service = axios.create({
  baseURL: "http://dev-sds.plotmax.opencs.site/",
  timeout: 3000,
  crossDomain: true,
  // 确保 adapter 配置正确
  adapter: axios.defaults.adapter,
});

service.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime;
    console.log(`Request to ${response.config.url} took ${duration} ms`);

    if (response.status === 200) {
      if (response.data.status === "success") {
        return response.data;
      } else {
        uni.showToast({
          title: response.data.message || "Error",
          icon: "none",
        });
        return Promise.reject(new Error(response.data.message || "Error"));
      }
    } else {
      uni.showToast({
        title: "网络错误",
        icon: "none",
      });
      return Promise.reject(new Error("网络错误"));
    }
  },
  (error) => {
    uni.showToast({
      title: "网络错误",
      icon: "none",
    });
    return Promise.reject(error);
  }
);

// Error handling wrapper
const handleApiError = (error: any, defaultValue: any) => {
  console.error("API Error:", error);
  uni.showToast({
    title: error?.message || "请求失败",
    icon: "none",
  });
  return defaultValue;
};

export const getUserInfo = () => {
  const userStore = useUserStore();
  return service.post("/api/users/getInfo", { userId: userStore.userId });
};

export const getUserSettings = () => {
  const userStore = useUserStore();
  return service.post("/api/users/getSettings", { userId: userStore.userId });
};

export const getPost = () => {
  return service.post("/api/post/getPost");
};

export const updateUserSettings = (
  musicEnabled: boolean,
  soundEffectsEnabled: boolean
) => {
  const userStore = useUserStore();
  return service.post("/api/users/updateSettings", {
    userId: userStore.userId,
    musicEnabled,
    soundEffectsEnabled,
  });
};

// Share related APIs
export const getShareInfo = async () => {
  const userStore = useUserStore();
  try {
    const response = await service.post("/api/share/getInfo", {
      userId: userStore.userId,
    });
    return response;
  } catch (error) {
    console.error("Error fetching share info:", error);
    return {
      status: "error",
      data: {
        sharedCount: 0,
      },
    };
  }
};

export const inviteFriend = async () => {
  const userStore = useUserStore();
  try {
    const response = await service.post("/api/share/inviteFriend", {
      userId: userStore.userId,
    });
    if (response.status === "success") {
      return {
        success: true,
        sharedCount: response.data.sharedCount,
      };
    }
    return {
      success: false,
      sharedCount: 0,
    };
  } catch (error) {
    console.error("Error inviting friend:", error);
    return {
      success: false,
      sharedCount: 0,
    };
  }
};
// Bot play related APIs
export const getBotPlayInfo = async () => {
  const gameStore = useGameStore();
  try {
    const response = await service.post("/api/game/getBotPlayInfo", {
      userId: useUserStore().userId,
    });
    if (response.status === "success") {
      gameStore.setBotPlayInfo(response.data);
    }
    return response;
  } catch (error) {
    return handleApiError(error, {
      status: "error",
      data: { winTimes: 0, loseTimes: 0 },
    });
  }
};

export const updateBotPlayResult = async (win: boolean) => {
  const userStore = useUserStore();
  try {
    const response = await service.post("/api/game/updateBotPlayResult", {
      userId: userStore.userId,
      win,
    });
    return response;
  } catch (error) {
    console.error("Error updating bot play result:", error);
    return {
      status: "error",
      message: "更新今日人机对战结果失败",
      data: {
        winTimes: 0,
        loseTimes: 0,
      },
    };
  }
};

export const getGameRecords = async () => {
  const userStore = useUserStore();
  try {
    const response = await service.post("/api/game/records", {
      userId: userStore.userId,
    });
    return response;
  } catch (error) {
    console.error("Error fetching game records:", error);
    return {
      status: "error",
      message: "获取游戏记录失败",
      data: {
        gameRecords: [],
      },
    };
  }
};

// Solar Terms APIs
export const getAllSolarTerms = async (userId: string) => {
  const gameStore = useGameStore();
  try {
    const response = await service.post("/api/solarTerms/getAllSolarTerms", {
      userId,
    });
    if (response.status === "success") {
      gameStore.setSolarTerms(response.data.allSolarTerms);
    }
    return response;
  } catch (error) {
    return handleApiError(error, {
      status: "error",
      data: { allSolarTerms: [] },
    });
  }
};

export const getSolarTermDetail = async (id: number) => {
  try {
    const response = await service.post("/api/solarTerms/getDetail", { id });
    return response;
  } catch (error) {
    return handleApiError(error, {
      status: "error",
      data: {
        image: "",
        term: "",
        id: null,
        content: "",
      },
    });
  }
};

export const getCollectedSolarTerms = async (userId: string) => {
  try {
    const response = await service.post("/api/users/getCollectedSolarTerms", {
      userId,
    });
    if (response.status === "success") {
      return response;
    }
    return {
      status: "error",
      data: {
        allSolarTerms: [],
      },
    };
  } catch (error) {
    return handleApiError(error, {
      status: "error",
      data: {
        allSolarTerms: [],
      },
    });
  }
};

// Game Operation APIs
export const startGame = (
  userId: string,
  botPlay: boolean,
  theme: string = ""
) => {
  return service.post("/api/game/play", { userId, botPlay, theme });
};

export const createGameRecord = (
  userId: string,
  duration: number,
  theme: string
) => {
  return service.post("/api/game/createRecord", { userId, duration, theme });
};

export const getPlayTimes = async (userId: string) => {
  const gameStore = useGameStore();
  try {
    const response = await service.post("/api/game/getPlayTimes", { userId });
    if (response.status === "success") {
      gameStore.setPlayTimes(response.data.todayPlayTimes);
    }
    return response;
  } catch (error) {
    return handleApiError(error, {
      status: "error",
      data: { todayPlayTimes: gameStore.playTimes },
    });
  }
};

export const getRebornQuestion = () => {
  return service.post("/api/game/reborn");
};

// Items Management APIs
export const getItemInfo = async (userId: string) => {
  const gameStore = useGameStore();
  try {
    const response = await service.post("/api/game/getItemInfo", { userId });
    if (response.status === "success") {
      gameStore.setItemInfo(response.data);
    }
    return response;
  } catch (error) {
    return handleApiError(error, {
      status: "error",
      data: { seasonExchangeItems: 0, groupExchangeItems: 0 },
    });
  }
};

export const useItem = async (
  userId: string,
  itemType: "seasonExchange" | "groupExchange"
) => {
  const gameStore = useGameStore();
  try {
    const response = await service.post("/api/game/useItem", {
      userId,
      itemType,
    });
    if (response.status === "success") {
      gameStore.setItemInfo(response.data);
    }
    return response;
  } catch (error) {
    return handleApiError(error, {
      status: "error",
      data: {
        seasonExchangeItems: gameStore.itemInfo.seasonExchangeItems,
        groupExchangeItems: gameStore.itemInfo.groupExchangeItems,
      },
    });
  }
};

export const acquireItem = (
  userId: string,
  itemType: "seasonExchange" | "groupExchange"
) => {
  return service.post("/api/game/acquireItem", { userId, itemType });
};

export default service;
