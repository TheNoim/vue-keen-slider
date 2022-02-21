# KeenSlider

## Props

| Prop name        | Description                                                                                                                                                                                                                            | Type                    | Values                      | Default      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------- | ------------ |
| controls         | Control slider with mouse or touch gestures<br/>`@default` true                                                                                                                                                                        | boolean                 | -                           | () => true   |
| dragSpeed        | Adjust the speed that is translated to the slider when dragging - minus values would invert the swipe direction<br/>`@default` 1                                                                                                       | number                  | -                           | () => 1      |
| initial          | Index of the initial activated slide<br/>`@default` 0                                                                                                                                                                                  | number                  | -                           | () => 0      |
| vertical         | Set the slider direction to vertical<br/>`@default` false                                                                                                                                                                              | boolean                 | -                           | () => false  |
| loop             | Infinite loop of slides<br/>`@default` false                                                                                                                                                                                           | boolean                 | -                           | () => false  |
| mode             | Set the mode of movement of the slider<br/>`@default` snap                                                                                                                                                                             | string                  | `snap`, `free-snap`, `free` | () => "snap" |
| duration         | Set the animation duration for the "snap"-mode<br/>`@default` 500                                                                                                                                                                      | number                  | -                           | () => 500    |
| resetSlide       | Reset to initial when the breakpoint changes<br/>`@default` false                                                                                                                                                                      | boolean                 | -                           | () => false  |
| slidesPerView    | Number of slides per view<br/>`@default` 1                                                                                                                                                                                             | number                  | -                           |              |
| spacing          | Spacing between slides in pixel<br/>`@default` 0                                                                                                                                                                                       | number                  | -                           |              |
| rubberband       | Simulate rubberband if moving or dragging above the slider edge<br/>`@default` true                                                                                                                                                    | boolean                 | -                           | () => true   |
| navigationArrows | Control the slider with arrows<br/>`@default` false                                                                                                                                                                                    | boolean                 | -                           | () => false  |
| navigationDots   | Control the slider with dots<br/>`@default` false                                                                                                                                                                                      | boolean                 | -                           | () => false  |
| arrowColor       | Change the color of the navigation arrows                                                                                                                                                                                              | string                  | -                           |              |
| useParentScopeId | Applies the parent css scope id to the slider<br/>`@default` false                                                                                                                                                                     | boolean                 | -                           | () => false  |
| centered         | Active slide will be centered - only makes sense, when slidesPerView is greater than `1`<br/>`@default` false                                                                                                                          | boolean                 | -                           | () => false  |
| autoplay         | Auto change the slide. Set the interval with this attribute as string or number in ms. Default interval: `3000`<br/>`@default` false                                                                                                   | boolean\|number\|string | -                           | () => false  |
| breakpoints      | Change the options or event hooks for a given breakpoint. The breakpoint is set by the media query syntax. Note: The last options of the last matching breakpoint will be merged with the options on the root level.<br/>`@default` {} | object                  | -                           | () => {}     |
| renderMode       | <br/>`@default` precision                                                                                                                                                                                                              | string                  | -                           | "precision"  |

## Methods

### moveToSlide

> Safe call to keen-slider moveToSlide() method

#### Params

| Param name | Type   | Description |
| ---------- | ------ | ----------- |
| slide      | number |             |
| duration   | number |             |

### moveToSlideRelative

> Safe call to keen-slider moveToSlideRelative() method

#### Params

| Param name | Type    | Description |
| ---------- | ------- | ----------- |
| slide      | number  |             |
| nearest    | boolean |             |
| duration   | number  |             |

### next

> Safe call to keen-slider next() method

### prev

> Safe call to keen-slider prev() method

### resize

> Safe call to keen-slider resize() method

## Slots

| Name    | Description         | Bindings |
| ------- | ------------------- | -------- |
| default | Contains the slides |          |

---
