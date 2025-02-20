import { defineStore } from "pinia";

interface UserState {
  userId: string;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userId: "1",
  }),

  actions: {
    setUserId(id: string) {
      this.userId = id;
    },
  },
});
