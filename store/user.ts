import { defineStore } from "pinia";

interface UserState {
  userId: string;
  settings: {
    musicEnabled: boolean;
    soundEffectsEnabled: boolean;
  };
  userInfo: any;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userId: "1",
    settings: {
      musicEnabled: true,
      soundEffectsEnabled: true,
    },
    userInfo: null,
  }),

  actions: {
    setUserId(id: string) {
      this.userId = id;
    },
    setSettings(settings: UserState["settings"]) {
      this.settings = settings;
    },
    setUserInfo(info: any) {
      this.userInfo = info;
    },
    hasUserData() {
      return this.userInfo !== null;
    },
  },
});
