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
						src="https://img.schuelerkarriere.de/insecure/s:1344::0/aHR0cHM6Ly9jZG4uc2NodWVsZXJrYXJyaWVyZS5kZS9zY2h1ZWxlcmthcnJpZXJlLzE0N2NhMTM1LWQxZTAtNDQ4YS04ZDk3LWZlNWNjYjRiOWI3YSUyNTJGSGVhZGVyX0JXSV9maXJld2FsbC5wbmc="
					/>
				</keen-slide>
				<keen-slide>
					<img
						src="https://img.schuelerkarriere.de/insecure/s:1344::0/aHR0cHM6Ly9jZG4uc2NodWVsZXJrYXJyaWVyZS5kZS9zY2h1ZWxlcmthcnJpZXJlLzcxMTY1Mjg4LTBjMzYtNDY5Zi1hNTBkLTc3MWU1MWZlY2Y2ZCUyNTJGSGVhZGVyX0JXSV9iYXNoLnBuZw=="
					/>
				</keen-slide>
				<keen-slide>
					<img
						src="https://img.schuelerkarriere.de/insecure/s:1344::0/aHR0cHM6Ly9jZG4uc2NodWVsZXJrYXJyaWVyZS5kZS9zY2h1ZWxlcmthcnJpZXJlL2RmM2MyNTI4LTlhMmYtNDU5Yi1hZTEwLTMyOGI5NzQxMDViMCUyNTJGSGVhZGVyX0JXSV9iYWNrdXBzLnBuZw=="
					/>
				</keen-slide>
				<keen-slide>
					<img
						src="https://img.schuelerkarriere.de/insecure/s:1344::0/aHR0cHM6Ly9jZG4uc2NodWVsZXJrYXJyaWVyZS5kZS9zY2h1ZWxlcmthcnJpZXJlLzE0N2NhMTM1LWQxZTAtNDQ4YS04ZDk3LWZlNWNjYjRiOWI3YSUyNTJGSGVhZGVyX0JXSV9maXJld2FsbC5wbmc="
					/>
				</keen-slide>
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
img {
	width: 100%;
	height: auto;
}
</style>
