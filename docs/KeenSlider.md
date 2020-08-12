# Slider

## Props

| Prop name        | Description                                                                                                     | Type                    | Values                      | Default      |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------- | ------------ |
| controls         | Control slider with mouse or touch gestures                                                                     | boolean                 | -                           | () => true   |
| dragSpeed        | Adjust the speed that is translated to the slider when dragging - minus values would invert the swipe direction | number                  | -                           | () => 1      |
| initial          | Index of the initial activated slide                                                                            | number                  | -                           | () => 0      |
| vertical         | Set the slider direction to vertical                                                                            | boolean                 | -                           | () => false  |
| loop             | Infinite loop of slides                                                                                         | boolean                 | -                           | () => false  |
| mode             | Set the mode of movement of the slider                                                                          | string                  | `snap`, `free-snap`, `free` | () => "snap" |
| duration         | Set the animation duration for the "snap"-mode                                                                  | number                  | -                           | () => 500    |
| resetSlide       | Reset to initial when the breakpoint changes                                                                    | boolean                 | -                           | () => false  |
| slidesPerView    | Number of slides per view                                                                                       | number                  | -                           | () => 1      |
| spacing          | Spacing between slides in pixel                                                                                 | number                  | -                           | () => 0      |
| rubberband       | Simulate rubberband if moving or dragging above the slider edge                                                 | boolean                 | -                           | () => true   |
| navigationArrows | Control the slider with arrows                                                                                  | boolean                 | -                           | () => false  |
| navigationDots   | Control the slider with dots                                                                                    | boolean                 | -                           | () => false  |
| arrowColor       | Change the color of the navigation arrows                                                                       | string                  | -                           |              |
| useParentScopeId | Applies the parent css scope id to the slider                                                                   | boolean                 | -                           | () => false  |
| centered         | Active slide will be centered - only makes sense, when slidesPerView is greater than `1`                        | boolean                 | -                           | () => false  |
| autoplay         | Auto change the slide. Set the interval with this attribute as string or number in ms. Default interval: `3000` | boolean\|number\|string | -                           | () => false  |

## Methods

### refresh

> Refresh keen slider configuration

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

## Events

| Event name | Type | Description |
| ---------- | ---- | ----------- |
| destroy    |      |

## Slots

| Name    | Description         | Bindings |
| ------- | ------------------- | -------- |
| default | Contains the slides |          |

---

```vue live
<Slider>Default Example Usage</Slider>
```
