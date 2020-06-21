<template>
	<div id="app">
		<test>
			<keen-slider
				arrow-color="black"
				loop
				navigation-arrows
				navigation-dots
				use-parent-scope-id
			>
				<keen-slide>1</keen-slide>
				<keen-slide>2</keen-slide>
				<keen-slide>3</keen-slide>
				<keen-slide>4</keen-slide>
			</keen-slider>
		</test>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import KeenSlider from "./components/KeenSlider.vue";
import KeenSlide from "./components/KeenSlide.vue";
import Test from "./components/TestComponent.vue";

@Component({
	components: {
		KeenSlider,
		KeenSlide,
		Test,
	},
})
export default class App extends Vue {}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
