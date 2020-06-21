import KeenSlider from "./components/KeenSlider.vue";
import KeenSlide from "./components/KeenSlide.vue";

export function install(Vue: any) {
	// @ts-ignore
	if (install.installed) return;
	// @ts-ignore
	install.installed = true;
	Vue.component("KeenSlider", KeenSlider);
	Vue.component("KeenSlide", KeenSlide);
}

const plugin = {
	install,
	KeenSlider,
	KeenSlide,
};

export { KeenSlide, KeenSlider };

export default plugin;
