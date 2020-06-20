import Vue from "vue";
import App from "./App.vue";
import "keen-slider/keen-slider.min.css";

Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount("#app");
