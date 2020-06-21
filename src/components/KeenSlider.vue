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
		autoHeight: Boolean,
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
		autoHeight: {
			default: () => true,
			type: Boolean,
		},
		controls: {
			default: () => true,
			type: Boolean,
		},
		dragSpeed: {
			default: () => 1,
			type: Number,
		},
		initial: {
			default: () => 0,
			type: Number,
		},
		vertical: {
			default: () => false,
			type: Boolean,
		},
		loop: {
			default: () => false,
			type: Boolean,
		},
		mode: {
			default: () => "snap",
			type: String,
		},
		duration: {
			default: () => 500,
			type: Number,
		},
		resetSlide: {
			default: () => false,
			type: Boolean,
		},
		slidesPerView: {
			default: () => 1,
			type: Number,
		},
		spacing: {
			default: () => 0,
			type: Number,
		},
		rubberband: {
			default: () => true,
			type: Boolean,
		},
		navigationArrows: {
			default: () => false,
			type: Boolean,
		},
		navigationDots: {
			default: () => false,
			type: Boolean,
		},
		arrowColor: {
			type: String,
		},
		useParentScopeId: {
			type: Boolean,
			default: () => false,
		},
		centered: {
			type: Boolean,
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

	mounted() {
		if (typeof window !== "undefined") {
			this.keenSlider = new KeenSliderLib(this.$refs.sliderRef, {
				...this.sliderOptions,
				...this.generateEventHooks(),
			} as TOptions);
			this.$watch("$props", () => {
				if (this.keenSlider) {
					(this.keenSlider.refresh as (options?: TOptions) => void)({
						...this.sliderOptions,
						...this.generateEventHooks(),
					} as TOptions);
				}
			});
		}
		this.current = this.initial;
	}

	beforeDestroy() {
		if (this.keenSlider) {
			this.keenSlider.destroy();
		}
		this.$emit("destroy");
	}

	private get sliderOptions(): TOptions {
		return {
			autoHeight: this.autoHeight,
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
					this.$emit(Key, ...args);
				};
			}
		}
		return hookObject;
	}

	/**
	 * Safe call to keen-slider moveToSlide() method
	 * @param slide
	 * @param duration
	 */
	public moveToSlide(slide: number, duration?: number) {
		if (this.keenSlider) {
			this.keenSlider.moveToSlide(slide, duration);
		}
	}

	/**
	 * Safe call to keen-slider moveToSlideRelative() method
	 * @param slide
	 * @param nearest
	 * @param duration
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
	 */
	public next() {
		if (this.keenSlider) {
			this.keenSlider.next();
		}
	}

	/**
	 * Safe call to keen-slider prev() method
	 */
	public prev() {
		if (this.keenSlider) {
			this.keenSlider.prev();
		}
	}

	/**
	 * Safe call to keen-slider resize() method
	 */
	public resize() {
		if (this.keenSlider) {
			this.keenSlider.resize();
		}
	}
}
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
