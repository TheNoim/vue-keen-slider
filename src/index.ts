import KeenSlider from "./components/KeenSlider.vue";
import KeenSlide from "./components/KeenSlider.vue";

export function install(Vue: any) {
	// @ts-ignore
	if (install.installed) return;
	// @ts-ignore
	install.installed = true;
	Vue.component("KeenSlider", KeenSlider);
	Vue.component("KeenSlide", KeenSlide);
}

const plugin = {
	install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== "undefined") {
	GlobalVue = window.Vue;
} else {
	// @ts-ignore
	if (typeof global !== "undefined") {
		// @ts-ignore
		GlobalVue = global.Vue;
	}
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export default plugin;

export { KeenSlide, KeenSlider };
