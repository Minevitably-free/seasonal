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

  static async loadResource(url) {
    return new Promise((resolve, reject) => {
      const isImage = url.match(/\.(jpg|jpeg|png|gif)$/i);
      const isAudio = url.match(/\.(mp3|wav|ogg)$/i);

      if (isImage) {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        img.src = url;
      } else if (isAudio) {
        const audio = new Audio();
        audio.onloadeddata = () => resolve(url);
        audio.onerror = () => reject(new Error(`Failed to load audio: ${url}`));
        audio.src = url;
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

  static async loadAll(progressCallback) {
    const allResources = [
      ...Object.values(this.resources.images).flat(2),
      ...Object.values(this.resources.audio).flat(),
    ];

    const total = allResources.length;
    let loaded = 0;

    const promises = allResources.map((url) =>
      this.loadResource(url).then(() => {
        loaded++;
        progressCallback(Math.floor((loaded / total) * 100));
        return url;
      })
    );

    return Promise.all(promises);
  }
}
