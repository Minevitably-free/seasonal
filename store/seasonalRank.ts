import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getGameRecords } from "/services/http";

export const useSeasonalRankStore = defineStore("seasonalRank", () => {
  const rankData = ref({
    gameRecords: [] as any[],
  });

  const bestRecord = computed(() => {
    if (rankData.value.gameRecords && rankData.value.gameRecords.length > 0) {
      return rankData.value.gameRecords[0].duration || 0;
    }
    return 0;
  });

  const fetchRankData = async () => {
    try {
      const response = await getGameRecords();
      if (response.status === "success") {
        rankData.value = response.data;
      }
    } catch (error) {
      console.error("Failed to fetch game records:", error);
    }
  };

  return {
    rankData,
    bestRecord,
    fetchRankData,
  };
});
