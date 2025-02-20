import { createSSRApp } from "vue";
import { createPinia } from "pinia"; // 简化导入
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  return {
    app,
    pinia,
  };
}
