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
			v-if="navigationArrows"
			@click="prev"
			v-bind="extraAttributes"
			:class="{
				arrow: true,
				'arrow--left': true,
				'arrow--disabled': current === 0,
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
			v-if="navigationArrows"
			@click="next"
			v-bind="extraAttributes"
			:class="{
				arrow: true,
				'arrow--right': true,
				'arrow--disabled': keenSlider
					? current === keenSlider.details().size - 1
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
		<div v-if="navigationDots" class="dots" v-bind="extraAttributes">
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
import { Component } from "vue-property-decorator";
import Vue from "vue";
import KeenSliderLib, { TOptions, TEvents } from "keen-slider";

const KeenSliderProps = Vue.extend({
	props: {
		breakpoints: Object,
		controls: Boolean,
		dragSpeed: Number,
		initial: Number,
		vertical: Boolean,
		loop: Boolean,
		mode: String,
		duration: Number,
		resetSlide: Boolean,
		slidesPerView: Number,
		spacing: Number,
		rubberband: Boolean,
		navigationArrows: Boolean,
		navigationDots: Boolean,
		arrowColor: String,
		useParentScopeId: Boolean,
		centered: Boolean,
		autoplay: [Boolean, Number, String],
	},
});

type KeenEvents = Partial<
	{
		[key in keyof TEvents]: (instance: KeenSlider) => void;
	}
>;

@Component({
	name: "Slider",
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
			default: () => 1,
			type: Number,
		},
		/**
		 * Spacing between slides in pixel
		 * @default 0
		 */
		spacing: {
			default: () => 0,
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
	},
})
export default class KeenSlider extends KeenSliderProps {
	$refs!: {
		sliderRef: HTMLElement;
	};

	private keenSlider: KeenSliderLib | null = null;
	private current: number = 0;
	private interval: number | null = null;

	mounted() {
		if (typeof window !== "undefined") {
			this.$nextTick(() => {
				this.initialize();
			});
		}
		this.current = this.initial;
	}

	private initialize() {
		this.keenSlider = new KeenSliderLib(
			this.$refs.sliderRef,
			this.getCombinedOptions()
		);
		this.initAutoplay();
		this.$watch("$props", () => {
			this.refresh();
		});
	}

	/**
	 * Refresh keen slider configuration
	 * @public
	 */
	public refresh() {
		if (this.keenSlider) {
			this.keenSlider.refresh(this.getCombinedOptions());
			this.initAutoplay();
		}
	}

	beforeDestroy() {
		if (this.keenSlider) {
			this.keenSlider.destroy();
		}
		if (this.interval) {
			clearInterval(this.interval);
		}
		this.$emit("destroy");
	}

	private initAutoplay() {
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
	}

	private getCombinedOptions(): TOptions {
		return {
			...this.sliderOptions,
			...this.generateEventHooks(),
		};
	}

	private get sliderOptions(): TOptions {
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
			slidesPerView: this.slidesPerView,
			spacing: this.spacing,
			rubberband: this.rubberband,
			centered: this.centered,
		};
	}

	private get dotHelper() {
		return this.keenSlider
			? [...Array(this.keenSlider.details().size).keys()]
			: [];
	}

	private get extraAttributes() {
		if (this.useParentScopeId && this.parentScopeId) {
			return {
				[this.parentScopeId]: true,
			};
		} else {
			return {};
		}
	}

	private get parentScopeId() {
		return (this.$parent.$options as any)._scopeId;
	}

	private generateEventHooks() {
		const events: (keyof TEvents)[] = [
			"afterChange",
			"beforeChange",
			"mounted",
			"created",
			"slideChanged",
			"dragEnd",
			"dragStart",
			"move",
		];
		const hookObject: KeenEvents = {};
		for (const Key of events) {
			if (Key === "slideChanged") {
				hookObject[Key] = (...args) => {
					if (this.keenSlider) {
						this.current = this.keenSlider.details().relativeSlide;
					}
					this.$emit(Key, ...args);
				};
			} else {
				hookObject[Key] = (...args) => {
					if (Key === "dragStart" && this.interval) {
						clearInterval(this.interval);
					}
					if (Key === "dragEnd") {
						this.initAutoplay();
					}
					this.$emit(Key, ...args);
				};
			}
		}
		return hookObject;
	}

	/**
	 * Safe call to keen-slider moveToSlide() method
	 * @param {number} slide
	 * @param {number} duration
	 * @see https://keen-slider.io/api/#methods
	 * @public
	 */
	public moveToSlide(slide: number, duration?: number) {
		if (this.keenSlider) {
			this.keenSlider.moveToSlide(slide, duration);
		}
	}

	/**
	 * Safe call to keen-slider moveToSlideRelative() method
	 * @param {number} slide
	 * @param {boolean} nearest
	 * @param {number} duration
	 * @see https://keen-slider.io/api/#methods
	 * @public
	 */
	public moveToSlideRelative(
		slide: number,
		nearest?: boolean,
		duration?: number
	) {
		if (this.keenSlider) {
			this.keenSlider.moveToSlideRelative(slide, nearest, duration);
		}
	}

	/**
	 * Safe call to keen-slider next() method
	 * @see https://keen-slider.io/api/#methods
	 * @public
	 */
	public next() {
		if (this.keenSlider) {
			this.keenSlider.next();
		}
	}

	/**
	 * Safe call to keen-slider prev() method
	 * @see https://keen-slider.io/api/#methods
	 * @public
	 */
	public prev() {
		if (this.keenSlider) {
			this.keenSlider.prev();
		}
	}

	/**
	 * Safe call to keen-slider resize() method
	 * @see https://keen-slider.io/api/#methods
	 * @public
	 */
	public resize() {
		if (this.keenSlider) {
			this.keenSlider.resize();
		}
	}
}
</script>
<style>
@import "../../node_modules/keen-slider/keen-slider.min.css";
</style>
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
