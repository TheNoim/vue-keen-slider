<template>
	<div
		v-if="!navigationArrows && !navigationDots"
		class="keen-slider"
		v-bind="extraAttributes"
		ref="sliderRef"
	>
		<slot></slot>
	</div>
	<div v-else class="navigation-wrapper" v-bind="extraAttributes">
		<div class="keen-slider" v-bind="extraAttributes" ref="sliderRef">
			<!-- @slot Contains the slides -->
			<slot></slot>
		</div>
		<svg
			v-if="navigationArrows && activated"
			@click="prev"
			v-bind="extraAttributes"
			:class="{
				arrow: true,
				'arrow--left': true,
				'arrow--disabled': current === 0 && !loop,
			}"
			:style="[arrowColor && { fill: arrowColor }]"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path
				v-bind="extraAttributes"
				d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
			></path>
		</svg>
		<svg
			v-if="navigationArrows && activated"
			@click="next"
			v-bind="extraAttributes"
			:class="{
				arrow: true,
				'arrow--right': true,
				'arrow--disabled': keenSlider
					? keenSlider.track.details &&
					  current === keenSlider.track.details.slides.length - 1 &&
					  !loop
					: false,
			}"
			:style="[arrowColor && { fill: arrowColor }]"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path
				v-bind="extraAttributes"
				d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"
			></path>
		</svg>
		<div
			v-if="navigationDots && activated"
			class="dots"
			v-bind="extraAttributes"
		>
			<button
				v-bind="extraAttributes"
				v-for="(_, idx) in dotHelper"
				@click="moveToSlideRelative(idx)"
				:class="{ dot: true, active: current === idx }"
				:key="idx"
			></button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import KeenSliderLib, {
	KeenSliderInstance,
	KeenSliderOptions,
	KeenSliderHooks,
} from "keen-slider";

interface KeenSliderData {
	keenSlider: KeenSliderInstance | null;
	current: number;
	interval: number | null;
	activated: boolean;
}

export default Vue.extend({
	name: "KeenSlider",
	props: {
		/**
		 * Control slider with mouse or touch gestures
		 * @default true
		 */
		controls: {
			default: () => true,
			type: Boolean,
		},
		/**
		 * Adjust the speed that is translated to the slider when dragging - minus values would invert the swipe direction
		 * @default 1
		 */
		dragSpeed: {
			default: () => 1,
			type: Number,
		},
		/**
		 * Index of the initial activated slide
		 * @default 0
		 */
		initial: {
			default: () => 0,
			type: Number,
		},
		/**
		 * Set the slider direction to vertical
		 * @default false
		 */
		vertical: {
			default: () => false,
			type: Boolean,
		},
		/**
		 * Infinite loop of slides
		 * @default false
		 */
		loop: {
			default: () => false,
			type: Boolean,
		},
		/**
		 * Set the mode of movement of the slider
		 * @default snap
		 * @values snap, free-snap, free
		 */
		mode: {
			default: () => "snap",
			type: String,
		},
		/**
		 * Set the animation duration for the "snap"-mode
		 * @default 500
		 */
		duration: {
			default: () => 500,
			type: Number,
		},
		/**
		 * Reset to initial when the breakpoint changes
		 * @default false
		 */
		resetSlide: {
			default: () => false,
			type: Boolean,
		},
		/**
		 * Number of slides per view
		 * @default 1
		 */
		slidesPerView: {
			type: Number,
		},
		/**
		 * Spacing between slides in pixel
		 * @default 0
		 */
		spacing: {
			type: Number,
		},
		/**
		 * Simulate rubberband if moving or dragging above the slider edge
		 * @default true
		 */
		rubberband: {
			default: () => true,
			type: Boolean,
		},
		/**
		 * Control the slider with arrows
		 * @default false
		 */
		navigationArrows: {
			default: () => false,
			type: Boolean,
		},
		/**
		 * Control the slider with dots
		 * @default false
		 */
		navigationDots: {
			default: () => false,
			type: Boolean,
		},
		/**
		 * Change the color of the navigation arrows
		 */
		arrowColor: {
			type: String,
		},
		/**
		 * Applies the parent css scope id to the slider
		 * @default false
		 */
		useParentScopeId: {
			type: Boolean,
			default: () => false,
		},
		/**
		 * Active slide will be centered - only makes sense, when slidesPerView is greater than `1`
		 * @default false
		 */
		centered: {
			type: Boolean,
			default: () => false,
		},
		/**
		 * Auto change the slide. Set the interval with this attribute as string or number in ms. Default interval: `3000`
		 * @default false
		 */
		autoplay: {
			type: [Boolean, Number, String],
			default: () => false,
		},
		/**
		 * Change the options or event hooks for a given breakpoint. The breakpoint is set by the media query syntax. Note: The last options of the last matching breakpoint will be merged with the options on the root level.
		 * @default {}
		 */
		breakpoints: {
			type: Object,
			default: () => {},
		},
		/**
		 * @default precision
		 */
		renderMode: {
			type: String,
			default: "precision",
		},
	},
	data: (): KeenSliderData => ({
		keenSlider: null,
		current: 0,
		interval: null,
		activated: false,
	}),
	mounted() {
		this.current = this.initial;
		this.initialize();
	},
	beforeDestroy() {
		if (this.keenSlider) {
			this.keenSlider.destroy();
		}
		if (this.interval) {
			clearInterval(this.interval);
		}
	},
	methods: {
		initialize() {
			this.keenSlider = new KeenSliderLib(
				this.$refs.sliderRef as HTMLElement,
				this.sliderOptions
			);
			this.attachEvents();
			this.initAutoplay();
			this.activated = true;
			this.$watch("$props", () => {
				this.refresh();
			});
			this.$nextTick(() => {
				this.resize();
			});
		},
		refresh() {
			if (this.keenSlider) {
				this.keenSlider.update(this.sliderOptions);
				this.initAutoplay();
			}
		},
		initAutoplay() {
			if (this.interval) {
				clearInterval(this.interval);
			}
			if (this.autoplay) {
				let time = 3000;
				if (typeof this.autoplay === "number") {
					time = this.autoplay;
				} else if (typeof this.autoplay === "string") {
					let parsedTime = parseInt(this.autoplay);
					if (parsedTime > 0) {
						time = parsedTime;
					}
				}
				this.interval = setInterval(() => {
					this.next();
				}, time);
			}
		},
		attachEvents() {
			const events: KeenSliderHooks[] = [
				"created",
				"slideChanged",
				"dragStarted",
				"dragEnded",
				"destroyed",
				"updated",
			];
			for (const event of events) {
				if (!this.keenSlider) continue;
				this.keenSlider.on(
					event,
					(keen: KeenSliderInstance, ...args) => {
						if (event === "dragStarted" && this.interval) {
							clearInterval(this.interval);
						} else if (event === "dragEnded") {
							this.initAutoplay();
						} else if (event == "slideChanged") {
							this.current = keen.track.details.rel;
						}
						this.$emit(event, keen, ...args);
					}
				);
			}
		},
		/**
		 * Safe call to keen-slider moveToSlide() method
		 * @param {number} slide
		 * @param {number} duration
		 * @see https://keen-slider.io/api/#methods
		 * @public
		 */
		moveToSlide(slide: number, duration?: number) {
			if (this.keenSlider) {
				this.keenSlider.moveToIdx(slide, true, { duration });
			}
		},
		/**
		 * Safe call to keen-slider moveToSlideRelative() method
		 * @param {number} slide
		 * @param {boolean} nearest
		 * @param {number} duration
		 * @see https://keen-slider.io/api/#methods
		 * @public
		 */
		moveToSlideRelative(
			slide: number,
			nearest?: boolean,
			duration?: number
		) {
			if (this.keenSlider) {
				this.keenSlider.moveToIdx(slide, false, { duration });
			}
		},
		/**
		 * Safe call to keen-slider next() method
		 * @see https://keen-slider.io/api/#methods
		 * @public
		 */
		next() {
			if (this.keenSlider) {
				this.keenSlider.next();
				// Reset interval
				this.initAutoplay();
			}
		},
		/**
		 * Safe call to keen-slider prev() method
		 * @see https://keen-slider.io/api/#methods
		 * @public
		 */
		prev() {
			if (this.keenSlider) {
				this.keenSlider.prev();
				// Reset interval
				this.initAutoplay();
			}
		},
		/**
		 * Safe call to keen-slider resize() method
		 * @see https://keen-slider.io/api/#methods
		 * @public
		 */
		resize() {
			if (this.keenSlider) {
				this.keenSlider.update(this.sliderOptions);
			}
		},
	},
	computed: {
		sliderOptions(): KeenSliderOptions | Record<string, unknown> {
			return {
				breakpoints: this.breakpoints,
				controls: this.controls,
				dragSpeed: this.dragSpeed,
				initial: this.initial,
				vertical: this.vertical,
				loop: this.loop,
				mode: this.mode as "snap" | "free-snap" | "free",
				duration: this.duration,
				resetSlide: this.resetSlide,
				...(this.slidesPerView && this.spacing
					? {
							slides: {
								...(this.slidesPerView
									? { perView: this.slidesPerView }
									: {}),
								...(this.spacing
									? { spacing: this.spacing }
									: {}),
							},
					  }
					: {}),
				rubberband: this.rubberband,
				centered: this.centered,
				renderMode: this.renderMode,
			};
		},
		dotHelper() {
			return this.keenSlider && this.keenSlider.track.details
				? this.keenSlider.track.details.slides.map((v) => v.abs)
				: [];
		},
		extraAttributes() {
			if (this.useParentScopeId && this.parentScopeId) {
				let parentScope = this.parentScopeId as string;
				return {
					[parentScope]: true,
				};
			} else {
				return {};
			}
		},
		parentScopeId(): string {
			return (this.$parent.$options as any)._scopeId;
		},
	},
});
</script>
<style scoped>
.navigation-wrapper {
	position: relative;
}
.dots {
	display: flex;
	padding: 10px 0;
	justify-content: center;
}

.dot {
	border: none;
	width: 10px;
	height: 10px;
	background: #c5c5c5;
	border-radius: 50%;
	margin: 0 5px;
	padding: 5px;
	cursor: pointer;
}

.dot:focus {
	outline: none;
}

.dot.active {
	background: #000;
}

.arrow {
	width: 30px;
	height: 30px;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	-webkit-transform: translateY(-50%);
	fill: #fff;
	cursor: pointer;
}

.arrow--left {
	left: 5px;
}

.arrow--right {
	left: auto;
	right: 5px;
}

.arrow--disabled {
	fill: rgba(255, 255, 255, 0.5);
}
</style>
