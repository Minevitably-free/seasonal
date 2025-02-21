const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: src,
      success: (res) => {
        resolve({
          width: res.width,
          height: res.height,
          src: src,
        });
      },
      fail: (err) => {
        reject(new Error(`Failed to load image: ${src}`));
      },
    });
  });
};

export const loadResources = async (resources) => {
  try {
    const loadPromises = resources.map((resource) => loadImage(resource.src));
    const results = await Promise.all(loadPromises);
    return results;
  } catch (error) {
    console.error("Resource loading failed:", error);
    throw error;
  }
};

export default class ResourceLoader {
  static resources = {
    images: {
      backgrounds: [
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/background/index_background.jpg",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/background/game_background.jpg",
      ],
      logos: [
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/logo/LOGO.png",
      ],
      icons: {
        others: [
          "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/others/pause.png",
          "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/others/restart.png",
          "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/others/shortest_completion_time.png",
        ],
        items: [
          "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/item/change_season.png",
          "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/item/assembly_season.png",
        ],
        settings: [
          "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/icon/settings_page/settings.png",
        ],
      },
      buttons: [
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/button/join_seasons.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/button/appropriate_seasons.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/button/seasonal_rankings.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/button/my_seasons.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/button/start_game.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/button/mutual_seasons.png",
      ],
      temp: [
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/ce77ccbd29e8d87c8e1bce83ee055672.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/a01e03256b7f5206e73759f9b12e139c.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/e11edf570e79834f348a31a56da4999a.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/78f018a9aecb525ff91c61f7f8ca080c.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/ebbb72f5c7065c894a67896091964dfe.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/9b2362b66cad80bafb98e1664a4a0886.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/da121d4293287b18fee7ef802cf64e33.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/ec13bc4d3236935a55371665f08f7da6.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/c2e9becca51d4bbf883dd00c104ae90b.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/5d32c7e87dd7b6e7618677ff551212c5.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/9734ebce1c33a7dfaa40cd5c6ef95d77.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/4813094d4946e86d43593c0f8456a55e.png",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/af1e177cae933d05e61f66c4bdc82a86.png",
      ],
    },
    audio: {
      effects: [
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/victory.wav",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/lose.wav",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/restart.wav",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/click.wav",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/erase.wav",
        "https://minio.plotmax.opencs.site/seasonal-delights/assets/music/sound_effect/button.wav",
      ],
    },
  };

  static loadPageResources = [
    "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/background/index_background.jpg",
    "https://minio.plotmax.opencs.site/seasonal-delights/assets/images/temp/ce77ccbd29e8d87c8e1bce83ee055672.png",
  ];

  static async loadResource(url) {
    return new Promise((resolve, reject) => {
      if (typeof url !== "string") {
        return reject(new Error("Invalid URL: must be a string"));
      }

      const isImage = /\.(jpg|jpeg|png|gif)$/i.test(url);
      const isAudio = /\.(mp3|wav|ogg)$/i.test(url);

      if (isImage) {
        loadImage(url)
          .then(() => resolve(url))
          .catch((err) => reject(err));
      } else if (isAudio) {
        const audioContext = uni.createInnerAudioContext();
        audioContext.src = url;
        audioContext.onCanplay(() => {
          audioContext.destroy();
          resolve(url);
        });
        audioContext.onError((err) => {
          audioContext.destroy();
          reject(new Error(`Failed to load audio: ${url}`));
        });
      } else {
        fetch(url)
          .then((response) =>
            response.ok
              ? resolve(url)
              : reject(new Error(`Failed to load resource: ${url}`))
          )
          .catch(reject);
      }
    });
  }

  static async loadWithMinDuration(promises, minDuration, progressCallback) {
    const startTime = Date.now();
    let loaded = 0;
    const total = promises.length;

    const results = await Promise.all(
      promises.map((promise) =>
        promise.then((result) => {
          loaded++;
          progressCallback(Math.floor((loaded / total) * 100));
          return result;
        })
      )
    );

    const elapsed = Date.now() - startTime;
    if (elapsed < minDuration) {
      await new Promise((resolve) =>
        setTimeout(resolve, minDuration - elapsed)
      );
    }

    return results;
  }

  static async loadAll(progressCallback) {
    const flattenResources = (obj) => {
      return Object.values(obj).reduce((acc, val) => {
        if (typeof val === "string") return [...acc, val];
        if (Array.isArray(val)) return [...acc, ...val];
        if (typeof val === "object" && val !== null)
          return [...acc, ...flattenResources(val)];
        return acc;
      }, []);
    };

    // First load essential resources
    const loadPagePromises = this.loadPageResources.map((url) =>
      this.loadResource(url)
    );
    await this.loadWithMinDuration(loadPagePromises, 1000, (progress) => {
      progressCallback(Math.floor(progress * 0.3)); // First 30% for load page resources
    });

    // Then load remaining resources
    const allResources = flattenResources(this.resources);
    const remainingResources = allResources.filter(
      (url) => !this.loadPageResources.includes(url)
    );
    const remainingPromises = remainingResources.map((url) =>
      this.loadResource(url)
    );

    await this.loadWithMinDuration(remainingPromises, 2000, (progress) => {
      progressCallback(Math.floor(30 + progress * 0.7)); // Remaining 70% for other resources
    });

    return allResources;
  }
}
