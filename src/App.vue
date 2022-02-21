<template>
	<div id="app">
		<test>
			<keen-slider
				arrow-color="black"
				loop
				navigation-arrows
				navigation-dots
				use-parent-scope-id
				:auto-height="false"
				:slides-per-view="3"
				:spacing="50"
				autoplay="1500"
			>
				<keen-slide>
					<img
						src="https://picsum.photos/1280/266"
					/>
				</keen-slide>
				<keen-slide>
					<img
						src="https://picsum.photos/1280/266"
					/>
				</keen-slide>
				<keen-slide>
          <img
              src="https://picsum.photos/1280/266"
          />
				</keen-slide>
				<keen-slide>
          <img
              src="https://picsum.photos/1280/266"
          />
				</keen-slide>
			</keen-slider>
		</test>
	</div>
</template>

<script lang="ts">
import KeenSlider from "./components/KeenSlider.vue";
import KeenSlide from "./components/KeenSlide.vue";
import Test from "./components/TestComponent.vue";
import Vue from "vue";

export default Vue.extend({
	components: {
		KeenSlider,
		KeenSlide,
		Test,
	},
});
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
img {
	width: 100%;
	height: auto;
}
</style>
