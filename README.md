# @nartc/react-native-barcode-mask

![travis](https://badgen.net/travis/nartc/react-native-barcode-mask)
![bundlephobia](https://badgen.net/bundlephobia/minzip/@nartc/react-native-barcode-mask)
![downloads](https://badgen.net/npm/dt/@nartc/react-native-barcode-mask)
![npm](https://badgen.net/npm/v/@nartc/react-native-barcode-mask)
![license](https://badgen.net/github/license/nartc/react-native-barcode-mask)
[![Known Vulnerabilities](https://snyk.io/test/github/nartc/react-native-barcode-mask/badge.svg?targetFile=package.json)](https://snyk.io/test/github/nartc/react-native-barcode-mask?targetFile=package.json)

![QR](https://i.imgur.com/CRImCD7.gif)
![PDF417](https://i.imgur.com/Q6Q65ox.gif)

### Acknowledgement

I want to acknowledge the current [react-native-barcode-mask](https://github.com/shahnawaz/react-native-barcode-mask) library. Most of `@nartc/react-native-barcode-mask` is "cloned" from the original but rewritten with [React Hooks](https://reactjs.org/docs/hooks-intro.html) and [Reanimated](https://github.com/software-mansion/react-native-reanimated)

### Installation

```
npm install @nartc/react-native-barcode-mask
```

```
yarn add @nartc/react-native-barcode-mask
```

### Usage

1. Import `BarcodeMask` from `@nartc/react-native-barcode-mask`
2. Use `<BarcodeMask />` as a `child` of `<RNCamera>` from `react-native-camera`

```typescript jsx
<RNCamera {...props}>
  <BarcodeMask {...barcodeMaskProps} />
</RNCamera>
```

### Features

1. Provide customizable masks to be used as `RNCamera`'s `SubViews`
2. Provide custom `Hook` for `Detect Barcode within Finder Area` feature.

### BarcodeMaskProps

| name                    | type                       | description                                                                                       | default                                                      |
| ----------------------- | -------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| width                   | DimensionUnit              | Width of the Barcode Finder Area                                                                  | 280                                                          |
| height                  | DimensionUnit              | Height of the Barcode Finder Area                                                                 | 230                                                          |
| edgeWidth               | DimensionUnit              | Width of corner edges                                                                             | 20                                                           |
| edgeHeight              | DimensionUnit              | Height of corner edges                                                                            | 20                                                           |
| edgeColor               | string                     | Color of corner edges                                                                             | #fff                                                         |
| edgeRadius              | number                     | Border Radius of corner edges                                                                     | 0                                                            |
| edgeBorderWidth         | DimensionUnit              | Thickness of corner edges                                                                         | 4                                                            |
| backgroundColor         | string                     | Background color of Outer Finder Area                                                             | #eee                                                         |
| maskOpacity             | number                     | Opacity of Outer Finder Area                                                                      | 1                                                            |
| showAnimatedLine        | boolean                    | Whether to show Animated Line                                                                     | true                                                         |
| startValue              | number                     | Start value of Animated Line (only applicable if `showAnimatedLine` is set to `true`)             | 0                                                            |
| destinationValue        | number                     | Destination value of Animated Line (depends on`animatedLineOrientation`)                          | `Length of respective orientation` - `animatedLineThickness` |
| animatedLineThickness   | DimensionUnit              | Thickness of Animated Line                                                                        | 2                                                            |
| animatedLineOrientation | 'vertical' or 'horizontal' | Orientation that the Animated Line will be drawn                                                  | 'horizontal'                                                 |
| animatedLineColor       | string                     | Color of Animated Line                                                                            | #fff                                                         |
| animationDuration       | number                     | Duration of Animated Line animation (in ms)                                                       | 20000                                                        |
| runTimingFn             | RunTimingFn                | Function to trigger the animation                                                                 | internal `runTiming` function                                |
| onLayoutChange          | OnLayoutChangeHandler      | Handler to handle LayoutChange. Useful if you want to only detect barcode inside the Finder Area. | `noop`                                                       |

### RunTimingFn

This is a function with the following form:

```typescript
export type RunTimingFn = (
  clock: Animated.Clock,
  value: number,
  destination: number,
  duration: number
) => Animated.Node<number>;
```

This function basically will start the `Animated.Clock` and loop the value from `value` <-> `destination` in a loop. By default, an internal `runTiming` fn will be used (which would work for most cases). You can find the internal function defined [here](https://github.com/nartc/react-native-barcode-mask/blob/master/src/BarcodeMask.tsx#L156)

### OnLayoutChangeHandler

This library also provides functionality to only scan the barcode that is in within bounds of the Finder Area (Inner Mask).
To use this feature, you need to import and use `useBarcodeRead` custom hook:

```typescript jsx
const {
  barcodeRead,
  onBarcodeRead,
  onBarcodeFinderLayoutChange,
} = useBarcodeRead(
  isFocused,
  barcodeData => {},
  processedBarcodeData => {}
);
```

`useBarcodeRead` takes in the following arguments:

1. `isFocused`: If you're using `react-navigation` then you should be familiar (or should get familiarized) with the concept of `focus`. When you navigate to a screen on the same `Stack` (or different `Tab`), the previous (current) screen is not **unmounted**, but only **unfocused**. `RNCamera` requires you to reinitialize when a screen is `re-focus`. `react-navigation` provides multiple ways to get access to `isFocused` property. If you don't use `react-navigation`, you can just pass in `true`
2. `(barcodeData: string) => string`: This is a callback to process barcode **raw** data. This gets exposed so you can apply your own logic to process the raw data.
3. `(processedData: string) => void`: This is a callback that takes in the `processedData`. This is where you **want** to do with the processed barcode data: call API, or navigating to a different screen etc...
4. `barcodeReadDelay: number`: `useBarcodeRead` now takes in an optional `delay` which will handle the frequency of scanning barcode internally, instead of using `barcodeRead` to manipulate `barcodeTypes`. Default to `500ms`

`useBarcodeRead` returns the following:

1. `barcodeRead: boolean`: This is a boolean flag whether the barcode has been read for the first time. This is to prevent `RNCamera` captures a barcode too many times too quick. You can use this `barcodeRead` flag to modify the `barcodeTypes` props on `RNCamera` to an empty array to prevent capturing barcode. Like so:

```typescript jsx
<RNCamera
  barcodeTypes={barcodeRead ? [] : [RNCamera.Constants.BarCodeType.qr]}
/>
```
**NOTE: I noticed that this trick "kind of stopped" working since couple of the latest issue ago. Haven't looked into the commit log of `react-native-camera` but `barcodeRead` is returned for the sake of `barcodeRead`, frequency of scanning barcode is handled internally now.**

2. `onBarcodeRead`: This is a handler that the hook returns so you can pass to `onBarCodeRead` prop on `RNCamera`
3. `onBarcodeFinderLayoutChange`: This is a handler that the hook returns so you can pass to `onLayoutChange` prop on `BarcodeMask`

`useBarcodeRead` is exported based on `Platform`: `ios` or `android` because of how the bounds of the scanned barcode are returned differently on each `Platform`.
On iOS, this feature works very well and stable.

However, on Android, this feature isn't as stable because of the randomness of the bounds returned. The bounds returned are differently based on the `barcodeType` as well. For my specific case, I use `QR` and `PDF417` so I was able to identify the bounds for these two types, even so it's not very reliable for `PDF417`. Contributions/Suggestions are definitely welcomed to improve support for Android.

### useCustomBarcodeRead

A new Hook is introduced: `useCustomBarcodeRead`

The purpose of this hook is to provide customization to how the Mask will handle barcode read within the Mask's bounds. On iOS, you probably don't need to worry about this because the mask works pretty stable. However on Android, because of the randomness of the bounds and device's coordinate system, this hook will allow the consumers to customize the BarcodeMask internal functionality instead of introducing a fix for a variety of Android devices which would take, probably forever, to complete.

Just like the normal `useBarcodeRead()`, `useCustomBarcodeRead` takes in: `isFocused`, `dataProcessor` function and `processedData` callback function. In addition, it also takes in two new parameters:

1. `customBarcodeRead`: This is an object with two properties: `beforeScan` and `afterScan`. The idea is to provide customization to how `BarcodeMask` affects the `RNCamera`. With `useBarcodeRead`, the returned flag `barcodeRead` is used to turn on/off scanning ability by setting the `barcodeTypes` to an `[]` when `barcodeRead` is `true`. Internally, it's just a `useState` and `setBarcodeRead(true/false)` is called at a certain point. With this new hook, you can setup a state at your component's level and pass two callbacks `beforeScan` and `afterScan`, `BarcodeMask` will call those at the same point it calls the internal `useState`. `beforeScan` and `afterScan`, if provided, will override the internal `useState`.

```typescript jsx
const [customBarcodeRead, setCustomBarcodeRead] = useState(false);
const {} = useCustomBarcodeRead(isFocused, dataProcessor, processedData => {/*do stuff*/}, {beforeScan: () => { setCustomBarcodeRead(true); }, afterScan: () => { setCustomBarcodeRead(false) }});
```

**NOTE:** When `beforeScan` and `afterScan` are provided, internal `barcodeRead` state will be returned as `null`.

2. `customBarcodeReadCallback`: This is a callback with the following signature. It's a function that returns the `RNCamera's BarcodeRead` callback.

```typescript
export interface CustomBarcodeReadCallback {
  (
    finderBoundingRect: { x: number; y: number; width: number; height: number },
    isFinderBoundingInitialized: boolean,
    processingBarcodeFn: (data: string) => void
  ): (event: {
    data: string;
    bounds:
      | { width: number; height: number; origin: Array<Point<string>> }
      | { origin: Point<string>; size: Size<string> };
    type: keyof BarCodeType;
  }) => void;
}
```

Basically, `BarcodeMask` will now delegate the helpful data: `finderBoundingRect`, `isFinderBoundingInitialized` and the `processedData` function that you pass in `useCustomBarcodeRead` in the beginning for the consumers to handle the dimensions related issue.

1. `finderBoundingRect`: the dimensions of the `BarcodeMask` calculated from top-left `edgeCorner`.
2. `isFinderBoundingInitialized`: a flag to notify when the `BarcodeMask` is finished initialized.
3. `processBarcodeFn`: this is the combined function with the logic of: `dataProcessor`, `processedData` and `customBarcodeRead` (if provided). This function takes in `event.data` (raw barcode data) and run through `dataProcessor` and ultimately ends up calling `processedData()` function.

### BarcodeMaskWithOuterLayout

A new HOC is added and is exported as `withOuterLayout(BarcodeMask)` and named `BarcodeMaskWithOuterLayout`. If you want to explore `withOuterLayout`, feel free to.

The purpose of this component is to be able to use percentage value for `width` and `height`. For example, I want to setup a mask with a set `width` but I want the `height` of the mask to take up the `height` of the `RNCamera` component, then `BarcodeMaskWithOuterLayout` will help me achieve that.

```typescript jsx
<BarcodeMaskWithOuterLayout width={200} height={'100%'} />
```

### Contributions

As mentioned, contributions are always welcomed.
