import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [createVuePlugin(), dts()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/wrapper.js"),
			name: "VueKeenSlider",
			fileName: (format) => `vue-keen-slider.${format}.js`,
		},
		rollupOptions: {
			external: ["vue", "keen-slider"],
		},
		output: {
			// Provide global variables to use in the UMD build
			// for externalized deps
			globals: {
				vue: "Vue",
			},
		},
		sourcemap: true,
	},
});
