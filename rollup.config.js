import vue from "rollup-plugin-vue"; // Handle .vue SFC files
import buble from "@rollup/plugin-buble"; // Transpile/polyfill with reasonable browser support
import typescript from "rollup-plugin-typescript";
import postcss from "rollup-plugin-postcss";
import atImport from "postcss-easy-import";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
	// ESM build to be used with webpack/rollup.
	{
		input: "src/wrapper.js", // Path relative to package.json
		output: {
			format: "esm",
			file: "dist/vue-keen-library.esm.js",
			name: "VueKeenSlider",
			sourcemap: true,
		},
		external: ["vue-property-decorator", "vue", "keen-slider"],
		plugins: [
			commonjs(),
			typescript({
				tsconfig: false,
				experimentalDecorators: true,
				target: "ES2019",
			}),
			vue({
				css: false, // Dynamically inject css as a <style> tag
				compileTemplate: true, // Explicitly convert template to render function
			}),
			postcss({
				plugins: [atImport()],
				modules: true,
			}),
			terser(),
		],
	},
	// SSR build.
	{
		input: "src/wrapper.js", // Path relative to package.json
		output: {
			format: "cjs",
			file: "dist/vue-keen-library.ssr.js",
			name: "VueKeenSlider",
			sourcemap: true,
		},
		external: ["vue-property-decorator", "vue", "keen-slider"],
		plugins: [
			commonjs(),
			typescript({
				tsconfig: false,
				experimentalDecorators: true,
				target: "ES2019",
			}),
			vue({
				css: false, // Dynamically inject css as a <style> tag
				compileTemplate: true, // Explicitly convert template to render function
				template: { optimizeSSR: true },
			}),
			postcss({
				plugins: [atImport()],
				modules: true,
			}),
			terser(),
		],
	},
	// Browser build.
	{
		input: "src/wrapper.js", // Path relative to package.json
		output: {
			format: "cjs",
			file: "dist/vue-keen-library.js",
			name: "VueKeenSlider",
			sourcemap: true,
		},
		plugins: [
			resolve({
				browser: true,
			}),
			commonjs(),
			typescript({
				tsconfig: false,
				experimentalDecorators: true,
				target: "ES2016",
			}),
			vue({
				css: false, // Dynamically inject css as a <style> tag
				compileTemplate: true, // Explicitly convert template to render function
			}),
			postcss({
				plugins: [atImport()],
				modules: true,
				extract: true,
				minimize: true,
			}),
			buble({
				transforms: { dangerousForOf: true },
			}), // Transpile to ES5
			terser(),
		],
	},
];
