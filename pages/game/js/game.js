import { useUserStore } from "@/store/user";
import { useGameStore } from "@/store/game";
import {
  createGameRecord,
  updateBotPlayResult,
  getPlayTimes,
} from "@/services/http";

export default {
  data() {
    return {
      list: [], //卡牌列表
      eliminateList: [], //下方卡槽列表
      hierarchy: 3, //层数
      number: 10, //每层数量
      valueList: [], //卡牌内容
      show: false, //结算界面
      result: false, //游戏结果
      isPaused: false, //游戏是否暂停
      soundEnabled: false, //音效是否启用
      soundPools: {
        click: [],
        erase: [],
        button: [],
      },
      victorySound: null, //胜利音效
      loseSound: null, //失败音效
      restartSound: null, //重新开始音效
      innerAudioContext: null, //背景音
      innerAudioContext2: null, //点击音
      innerAudioContext3: null, //消除音
      timeLeft: 600, // 10分钟 = 600秒
      timer: null,
      canRevive: false, // 是否可以复活
      showRevivePopup: false,
      showQuizPopup: false,
      currentQuestion: 1,
    };
  },
  computed: {
    getGameOverText() {
      if (this.result) return "游戏成功";
      if (this.timeLeft <= 0) return "时间到";
      if (this.eliminateList.length >= 7) return "时令槽已满";
      return "游戏失败";
    },
    gameBackgroundImageURL() {
      return `url(${this.$baseUrl}/seasonal-delights/assets/images/background/game_background.jpg)`;
    },
    logoImageURL() {
      return `${this.$baseUrl}/seasonal-delights/assets/images/logo/LOGO.png`;
    },
    gameBackgroundMusicURL() {
      return `${this.$baseUrl}/seasonal-delights/assets/music/background_music.wav`;
    },
    clickMusicURL() {
      return `${this.$baseUrl}/seasonal-delights/assets/music/sound_effect/click.wav`;
    },
    eliminateMusicURL() {
      return `${this.$baseUrl}/seasonal-delights/assets/music/sound_effect/erase.wav`;
    },
    pauseImageURL() {
      return `${this.$baseUrl}/seasonal-delights/assets/images/icon/others/pause.png`;
    },
    restartImageURL() {
      return `${this.$baseUrl}/seasonal-delights/assets/images/icon/others/restart.png`;
    },
  },
  onLoad() {
    this.init();
    // 初始化音效池
    this.initSoundPools();

    // 初始化单次播放音效
    this.innerAudioContext = uni.createInnerAudioContext();
    this.innerAudioContext.sessionCategory = "ambient";
    this.innerAudioContext.src = this.gameBackgroundMusicURL;
    this.innerAudioContext.loop = true;

    this.innerAudioContext2 = uni.createInnerAudioContext();
    this.innerAudioContext2.sessionCategory = "ambient";
    this.innerAudioContext2.src = this.clickMusicURL;

    this.innerAudioContext3 = uni.createInnerAudioContext();
    this.innerAudioContext3.sessionCategory = "ambient";
    this.innerAudioContext3.src = this.eliminateMusicURL;

    this.victorySound = uni.createInnerAudioContext();
    this.victorySound.src =
      "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/victory.wav";

    this.loseSound = uni.createInnerAudioContext();
    this.loseSound.src =
      "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/lose.wav";

    this.restartSound = uni.createInnerAudioContext();
    this.restartSound.src =
      "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/restart.wav";
  },
  onUnload() {
    // 销毁所有音效实例
    Object.values(this.soundPools).forEach((pool) => {
      pool.forEach((sound) => sound.destroy());
    });
    this.restartSound?.destroy();
    this.stopTimer();
  },
  onShow() {
    this.innerAudioContext.play();
    this.restartSound?.play();
  },
  onHide() {
    this.innerAudioContext.pause();
    this.restartSound?.pause();
  },
  methods: {
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2, "0")}`;
    },

    startTimer() {
      this.timer = setInterval(() => {
        if (!this.isPaused && this.timeLeft > 0) {
          this.timeLeft--;
          if (this.timeLeft <= 0) {
            this.gameOver();
          }
        }
      }, 1000);
    },

    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    init() {
      this.restartSound?.play();
      this.list = [];
      this.eliminateList = [];
      this.show = false;
      this.canRevive = false;
      this.timeLeft = 600;
      this.stopTimer();
      this.startTimer();
      this.valueList = [
        {
          id: 1,
          url: "assets/images/icon/seasonal_pool_elements/autumn_theme/beginning_of_autumn.png",
        },
        {
          id: 2,
          url: "assets/images/icon/seasonal_pool_elements/autumn_theme/cold_dew.png",
        },
        {
          id: 3,
          url: "assets/images/icon/seasonal_pool_elements/autumn_theme/end_of_heat.png",
        },
        {
          id: 4,
          url: "assets/images/icon/seasonal_pool_elements/autumn_theme/frost_fall.png",
        },
        {
          id: 5,
          url: "assets/images/icon/seasonal_pool_elements/autumn_theme/white_dew.png",
        },
        {
          id: 6,
          url: "assets/images/icon/seasonal_pool_elements/autumn_theme/autumn_equinox.png",
        },
      ];
      let valueList = [...new Array(this.hierarchy * this.number).keys()];
      valueList = valueList.map((item, index) => {
        return this.valueList[index % 6];
      });
      valueList.sort(function () {
        return Math.random() - 0.5;
      });
      let num = 0;
      for (var j = 0; j < this.hierarchy; j++) {
        let xx = j % 2 == 1 ? 36 : 49;
        let arr = [...new Array(xx).keys()];
        arr.sort(function () {
          return Math.random() - 0.5;
        });
        arr.length = this.number;
        for (var i = 0; i < xx; i++) {
          if (arr.includes(i)) {
            let items;
            if (j % 2 == 1) {
              items = {
                id: j + "" + i,
                value: valueList[num],
                x: (i % 6) * 102 + 50,
                y: Math.trunc(i / 6) * 102 + 50,
                z: this.hierarchy - j,
                position: [j, i % 6, Math.trunc(i / 6)],
              };
            } else {
              items = {
                id: j + "" + i,
                value: valueList[num],
                x: (i % 7) * 102,
                y: Math.trunc(i / 7) * 102,
                z: this.hierarchy - j,
                position: [j, i % 7, Math.trunc(i / 7)],
              };
            }
            this.list.push(items);
            num++;
          }
        }
      }
      this.refresh();
    },

    refresh() {
      this.list.forEach((item) => {
        // 检查当前元素是否被其他存在的元素遮挡
        item.active = this.isCover(item);
      });
    },

    isCover(item) {
      let { position } = item;
      let is = false;
      // 只检查当前还在元素池中的元素
      this.list.forEach((t) => {
        // 跳过自身
        if (t.id === item.id) return;

        // 只有更上层的元素才可能遮挡当前元素
        if (
          t.position[0] < position[0] &&
          t.position[0] % 2 != position[0] % 2
        ) {
          if (position[0] % 2 == 0) {
            //偶数层（第0层、第2层等）
            if (
              (position[1] - t.position[1] == 0 ||
                position[1] - t.position[1] == 1) &&
              (position[2] - t.position[2] == 0 ||
                position[2] - t.position[2] == 1)
            ) {
              is = true;
            }
          } else {
            //奇数层（第1层、第3层等）
            if (
              (t.position[1] - position[1] == 0 ||
                t.position[1] - position[1] == 1) &&
              (t.position[2] - position[2] == 0 ||
                t.position[2] - position[2] == 1)
            ) {
              is = true;
            }
          }
        }
      });
      return is;
    },

    toIndex() {
      this.restartSound?.stop();
      uni.redirectTo({
        url: "/pages/index/index",
      });
    },

    refreshSlot(item, index) {
      // 为每个元素设置新位置
      this.eliminateList.forEach((t, i) => {
        // 设置元素到对应的网格位置
        t.gridIndex = i;
        t.z = 100;
      });

      if (
        item &&
        this.eliminateList.filter((t) => t.value.id == item.value.id).length >=
          3
      ) {
        // 找到要消除的三张卡片
        let eliminateIndexes = [];
        for (let i = this.eliminateList.length - 1; i >= 0; i--) {
          if (this.eliminateList[i].value.id === item.value.id) {
            eliminateIndexes.push(i);
            if (eliminateIndexes.length === 3) break;
          }
        }

        // 添加动画类
        eliminateIndexes.forEach((idx) => {
          this.eliminateList[idx].animating = true;
        });

        // 等待消除动画完成后移除元素
        setTimeout(() => {
          this.eliminateList = this.eliminateList.filter((t) => !t.animating);
          this.refreshSlot();
          this.playFromPool("erase");
        }, 800);

        this.innerAudioContext3.stop();
        this.innerAudioContext3.play();
      }
    },

    _findIndex(arr, key, value) {
      for (var i = arr.length; i--; ) {
        if (arr[i][key].id == value.id) {
          return i;
        }
      }
      return -1;
    },

    togglePause() {
      this.playFromPool("button");
      this.isPaused = !this.isPaused;
    },

    onClick(item, index) {
      if (this.isPaused || item.active) return;
      this.playFromPool("click");

      // 计算目标位置
      const targetIndex =
        this._findIndex(this.eliminateList, "value", item.value) + 1;

      // 获取目标槽位的位置
      const slotElement = document.querySelectorAll(".seasonal-slot-grid")[
        targetIndex
      ];
      if (!slotElement) return;

      const slotRect = slotElement.getBoundingClientRect();
      const itemElement = document.querySelectorAll(".item")[index];
      const itemRect = itemElement.getBoundingClientRect();

      // 计算移动距离
      const deltaX = slotRect.left - itemRect.left;
      const deltaY = slotRect.top - itemRect.top;

      // 添加移动动画
      item.moving = true;
      item.transform = `translate(${deltaX}px, ${deltaY}px)`;

      // 克隆item对象，添加网格索引
      let slotItem = {
        ...item,
        gridIndex: targetIndex,
      };

      // 等待动画完成后更新数据
      setTimeout(() => {
        // 从原列表中移除
        this.list.splice(index, 1);

        // 添加到时令槽列表
        if (targetIndex === 0) {
          this.eliminateList.push(slotItem);
        } else {
          this.eliminateList.splice(targetIndex, 0, slotItem);
        }

        // 检查是否需要消除
        const sameItems = this.eliminateList.filter(
          (t) => t.value.id === item.value.id
        );
        if (sameItems.length >= 3) {
          // 延迟执行消除动画，等待元素完全进入槽中
          setTimeout(() => {
            this.refreshSlot(slotItem, targetIndex - 1);
          }, 300);
        } else {
          this.refreshSlot(slotItem, targetIndex - 1);
        }

        // 更新遮挡状态
        this.refresh();

        // 检查游戏结束条件
        this.gameOver(slotItem);
      }, 500);

      this.innerAudioContext2.stop();
      this.innerAudioContext2.play();
    },

    async handleGameCompletion() {
      const gameStore = useGameStore();
      const userStore = useUserStore();

      if (gameStore.botPlay) {
        // Handle bot play victory
        const response = await updateBotPlayResult(true);
        if (response.status === "success") {
          uni.redirectTo({
            url: "/pages/game/success?duration=" + (600 - this.timeLeft),
          });
        }
        return;
      }

      // Handle normal game victory
      let recordCreated = false;
      let retryCount = 0;
      const maxRetries = 3;

      while (!recordCreated && retryCount < maxRetries) {
        try {
          const response = await createGameRecord(
            userStore.userId,
            600 - this.timeLeft,
            gameStore.gameInfo.theme
          );

          if (response.status === "success") {
            const playTimesResponse = await getPlayTimes(userStore.userId);
            if (playTimesResponse.status === "success") {
              uni.redirectTo({
                url: `/pages/game/obtain?term=${
                  response.data.term
                }&image=${encodeURIComponent(response.data.image)}`,
              });
              recordCreated = true;
            }
          }
        } catch (error) {
          retryCount++;
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retry
        }
      }

      if (!recordCreated) {
        uni.showToast({
          title: "创建游戏记录失败",
          icon: "none",
          duration: 2000,
        });
        setTimeout(() => {
          uni.redirectTo({
            url: "/pages/index/index",
          });
        }, 2000);
      }
    },

    async handleGameFailure() {
      const gameStore = useGameStore();
      const userStore = useUserStore();

      if (gameStore.botPlay) {
        // Handle bot play failure
        const response = await updateBotPlayResult(false);
        if (response.status === "success") {
          uni.redirectTo({
            url: "/pages/game/fail",
          });
        }
      } else {
        // Handle normal game failure
        uni.redirectTo({
          url: "/pages/game/fail",
        });
      }
    },

    gameOver(item) {
      // 时令槽满了
      if (
        this.eliminateList.length >= 7 &&
        (!item ||
          this.eliminateList.filter((t) => t.value.id == item.value.id).length <
            3)
      ) {
        this.result = false;
        this.show = true;
        this.canRevive = true;
        this.loseSound?.play();
        this.showRevivePopup = true;
        return;
      }
      // 时间到了
      if (this.timeLeft <= 0) {
        this.result = false;
        this.show = true;
        this.canRevive = false;
        this.loseSound?.play();
        this.handleGameFailure();
        return;
      }
      // 游戏胜利
      if (this.list.length == 0) {
        this.result = true;
        this.show = true;
        this.canRevive = false;
        this.victorySound?.play();
        this.stopTimer();
        this.handleGameCompletion();
      }
    },

    handleAbandon() {
      this.showRevivePopup = false;
      this.handleGameFailure();
    },

    startQuiz() {
      this.showRevivePopup = false;
      this.showQuizPopup = true;
      this.currentQuestion = 1;
    },

    async handleQuizAnswer(correct) {
      if (!correct) {
        this.showQuizPopup = false;
        this.handleGameFailure();
        return;
      }

      if (this.currentQuestion === 3) {
        // All questions answered correctly
        this.showQuizPopup = false;
        this.revive();
        return;
      }

      // Move to next question
      this.currentQuestion++;
    },

    changeSeason() {
      if (this.isPaused || this.eliminateList.length === 0) return;
      this.playFromPool("button");

      // 随机选择一个元素槽中的元素
      const randomSlotIndex = Math.floor(
        Math.random() * this.eliminateList.length
      );
      const slotItem = this.eliminateList[randomSlotIndex];

      // 从剩余的卡牌中随机选择一个不同的元素
      const availableValues = this.valueList.filter(
        (v) => v.id !== slotItem.value.id
      );
      const randomValue =
        availableValues[Math.floor(Math.random() * availableValues.length)];

      // 替换元素
      this.eliminateList[randomSlotIndex].value = randomValue;

      // 检查是否可以消除
      this.refreshSlot(this.eliminateList[randomSlotIndex], randomSlotIndex);
    },

    assemblySeason() {
      if (this.isPaused || this.eliminateList.length === 0) return;
      this.playFromPool("button");

      // 找出元素槽中数量最多的元素类型
      const countMap = new Map();
      this.eliminateList.forEach((item) => {
        const count = countMap.get(item.value.id) || 0;
        countMap.set(item.value.id, count + 1);
      });

      let maxCount = 0;
      let targetId = null;
      countMap.forEach((count, id) => {
        if (count > maxCount) {
          maxCount = count;
          targetId = id;
        }
      });

      if (maxCount >= 2) {
        // 找到对应的元素并触发消除
        const targetItem = this.eliminateList.find(
          (item) => item.value.id === targetId
        );
        this.refreshSlot(targetItem);
      }
    },

    revive() {
      this.playFromPool("button");
      this.eliminateList = [];
      this.show = false;
      this.canRevive = false;
      this.refreshSlot();
    },

    playFromPool(type) {
      if (!this.soundEnabled || !this.soundPools[type]) return;

      try {
        // 查找一个没在播放的音效实例
        const sound = this.soundPools[type].find((s) => s.paused);
        if (sound) {
          sound.stop();
          sound.play();
        } else {
          // 如果所有实例都在播放，创建新的实例
          const newSound = uni.createInnerAudioContext();
          newSound.src = `https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/${type}.wav`;
          this.soundPools[type].push(newSound);
          newSound.play();
        }
      } catch (error) {
        console.log("音效播放失败:", error);
      }
    },

    initSoundPools() {
      try {
        // 点击音效池
        for (let i = 0; i < 5; i++) {
          const sound = uni.createInnerAudioContext();
          sound.src =
            "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/click.wav";
          this.soundPools.click.push(sound);
        }

        // 消除音效池
        for (let i = 0; i < 3; i++) {
          const sound = uni.createInnerAudioContext();
          sound.src =
            "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/erase.wav";
          this.soundPools.erase.push(sound);
        }

        // 按钮音效池
        for (let i = 0; i < 3; i++) {
          const sound = uni.createInnerAudioContext();
          sound.src =
            "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/button.wav";
          this.soundPools.button.push(sound);
        }

        // 在第一次用户交互时启用音效
        document.addEventListener(
          "click",
          () => {
            this.soundEnabled = true;
          },
          { once: true }
        );
      } catch (error) {
        console.log("音效初始化失败:", error);
      }
    },
  },
};
