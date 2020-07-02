# vue-keen-slider

A vue wrapper for the [keen slider library](https://github.com/rcbyr/keen-slider).

## Usage

```vue
<template>
    <keen-slider arrow-color="black" loop navigation-arrows navigation-dots>
    	<keen-slide>1</keen-slide>
    	<keen-slide>2</keen-slide>
    	<keen-slide>3</keen-slide>
    	<keen-slide>4</keen-slide>
    </keen-slider>
</template>
```

*Note*: You need to import the css file:

```javascript
import 'vue-keen-slider/dist/vue-keen-library.css'
```

All options of the keen slider library are accessible as vue prop. 

This library also includes 5 additional props for more easy use:

1. `navigation-arrows` (boolean): Enables navigation arrows like in the ["arrows and dots" example](https://keen-slider.io/examples/#navigation). 
2. `navigation-dots` (boolean): Enables navigation dots like in the ["arrows and dots" example](https://keen-slider.io/examples/#navigation). 
2. `arrow-color` (css color string): Changes the color of the navigation arrow. 
4. `useParentScopeId` (boolean): Use the css scope of the parent component. Useful for styling.
5. `autoplay` (boolean, string, number): Autoplay the slider. If you only pass true, the default value will be 3000ms. Autoplay is disabled by default. You need to pass the time in ms.
