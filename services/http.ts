import axios from "axios";
import mpAdapter from "axios-miniprogram-adapter";
import { useUserStore } from "/store/user";
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
  const userStore = useUserStore();
  try {
    const response = await service.post("/api/game/getBotPlayInfo", {
      userId: userStore.userId,
    });
    return response;
  } catch (error) {
    console.error("Error fetching bot play info:", error);
    return {
      status: "error",
      message: "获取今日人机对战信息失败",
      data: {
        winTimes: 0,
        loseTimes: 0,
      },
    };
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

export default service;
