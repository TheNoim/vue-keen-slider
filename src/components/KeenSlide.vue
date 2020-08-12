<template functional>
	<div
		:ref="data.ref"
		:class="[data.class, data.staticClass]"
		:style="[data.style, data.staticStyle]"
		v-bind="data.attrs"
		v-on="listeners"
		class="keen-slider__slide"
	>
		<!-- @slot Slide content -->
		<slot />
	</div>
</template>

<script>
/**
 * Wrapper component for every slide
 * @displayName Slide
 */
export default {
	name: "Slide",
};
</script>
