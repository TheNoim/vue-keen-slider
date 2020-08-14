import vue from "rollup-plugin-vue"; // Handle .vue SFC files
import buble from "@rollup/plugin-buble"; // Transpile/polyfill with reasonable browser support
import typescript from "rollup-plugin-typescript";
import postcss from "rollup-plugin-postcss";
import atImport from "postcss-easy-import";

export default [
	// ESM build to be used with webpack/rollup.
	{
		input: "src/wrapper.js", // Path relative to package.json
		output: {
			format: "esm",
			file: "dist/vue-keen-library.esm.js",
		},
		plugins: [
			typescript({
				tsconfig: false,
				experimentalDecorators: true,
				target: "ES2019",
			}),
			vue({
				css: true, // Dynamically inject css as a <style> tag
				compileTemplate: true, // Explicitly convert template to render function
			}),
			postcss({
				plugins: [atImport()],
				modules: true,
			}),
		],
	},
	// SSR build.
	{
		input: "src/wrapper.js", // Path relative to package.json
		output: {
			format: "cjs",
			file: "dist/vue-keen-library.ssr.js",
		},
		plugins: [
			typescript({
				tsconfig: false,
				experimentalDecorators: true,
				target: "ES2019",
			}),
			vue({
				css: true, // Dynamically inject css as a <style> tag
				compileTemplate: true, // Explicitly convert template to render function
				template: { optimizeSSR: true },
			}),
			postcss({
				plugins: [atImport()],
				modules: true,
			}),
		],
	},
	// Browser build.
	{
		input: "src/wrapper.js", // Path relative to package.json
		output: {
			format: "iife",
			file: "dist/vue-keen-library.js",
		},
		plugins: [
			typescript({
				tsconfig: false,
				experimentalDecorators: true,
				target: "ES2016",
			}),
			vue({
				css: true, // Dynamically inject css as a <style> tag
				compileTemplate: true, // Explicitly convert template to render function
			}),
			postcss({
				plugins: [atImport()],
				modules: true,
			}),
			buble({
				transforms: { dangerousForOf: true },
			}), // Transpile to ES5
		],
	},
];
