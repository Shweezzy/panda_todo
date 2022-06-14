import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuescroll from "vuescroll";
import vClickOutside from "v-click-outside";

Vue.config.productionTip = false;

Vue.use(vuescroll, {
  ops: {
    bar: {
      background: "#000",
    },
  },
  name: "vueScroll", // customize component name, default -> vueScroll
});
Vue.use(vClickOutside);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
