import React, { FC, memo } from 'react';
import { LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { WithOuterLayoutProps } from './interfaces';

const {
  Value,
  Clock,
  block,
  cond,
  set,
  startClock,
  timing,
  eq,
  // clockRunning,
  // stopClock,
  // debug,
} = Animated;

type DimensionUnit = string | number;
type EdgePosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

/**
 *
 */
export type RunTimingFn = (
  clock: Animated.Clock,
  value: number,
  destination: number,
  duration: number
) => Animated.Node<number>;

export type OnLayoutChangeHandler = (event: LayoutChangeEvent) => void;

/**
 * @name BarcodeMaskProps
 * @description Props of BarcodeMask component
 */
export interface BarcodeMaskProps extends WithOuterLayoutProps {
  /**
   * @name width
   * @type DimensionUnit
   * @description Width of the Barcode Finder Area
   * @default 280
   */
  width?: DimensionUnit;
  /**
   * @name height
   * @type DimensionUnit
   * @description Height of the Barcode Finder Area
   * @default 230
   */
  height?: DimensionUnit;
  /**
   * @name edgeWidth
   * @type number
   * @description Width of corner edges
   * @default 20
   */
  edgeWidth?: number;
  /**
   * @name edgeHeight
   * @type number
   * @description Height of corner edges
   * @default 20
   */
  edgeHeight?: DimensionUnit;
  /**
   * @name edgeColor
   * @type string
   * @description Color of corner edges
   * @default #fff
   */
  edgeColor?: string;
  /**
   * @name edgeRadius
   * @type number
   * @description Border Radius of corner edges
   * @default 0
   */
  edgeRadius?: number;
  /**
   * @name edgeBorderWidth
   * @type DimensionUnit
   * @description Thickness of corner edges
   * @default 4
   */
  edgeBorderWidth?: DimensionUnit;
  /**
   * @name backgroundColor
   * @type string
   * @description Background color of Outer Finder Area
   * @default #eee
   */
  backgroundColor?: string;
  /**
   * @name maskOpacity
   * @type number
   * @description Opacity of Outer Finder Area
   * @default 1
   */
  maskOpacity?: number;
  /**
   * @name showAnimatedLine
   * @type boolean
   * @description Whether to show Animated Line
   * @default true
   */
  showAnimatedLine?: boolean;
  /**
   * @name startValue
   * @type number
   * @description Start value of Animated Line (only applicable if `showAnimatedLine` is set to `true`)
   * @default 0
   */
  startValue?: number;
  /**
   * @name destinationValue
   * @type number
   * @description Destination value of Animated Line (depends on`animatedLineOrientation`)
   * @default Computed by the length of the respective orientation minus the `animatedLineThickness`
   */
  destinationValue?: number;
  /**
   * @name animatedLineThickness
   * @type number
   * @description Thickness of Animated Line
   * @default 2
   */
  animatedLineThickness?: number;
  /**
   * @name animatedLineOrientation
   * @type 'vertical' | 'horizontal'
   * @description Orientation that the Animated Line will be drawn
   * @default 'horizontal'
   */
  animatedLineOrientation?: 'vertical' | 'horizontal';
  /**
   * @name animatedLineColor
   * @type string
   * @description Color of Animated Line
   * @default #fff
   */
  animatedLineColor?: string;
  /**
   * @name animationDuration
   * @type number
   * @description Duration of Animated Line animation (in ms)
   * @default 2000
   */
  animationDuration?: number;
  /**
   * @name runTimingFn
   * @type RunTimingFn
   * @description Function to trigger the animation
   * @default internal `runTiming` function
   */
  runTimingFn?: RunTimingFn;
  /**
   * @name onLayoutChange
   * @type OnLayoutChangeHandler
   * @description Handler to handle LayoutChange. Useful if you want to only detect barcode inside the Finder Area.
   *   This will be provided from a custom hook that this library also provides.
   * @default noop
   */
  onLayoutChange?: OnLayoutChangeHandler;
}

const runTiming: RunTimingFn = (
  clock: Animated.Clock,
  value: number,
  destination: number,
  duration: number
) => {
  const timingState: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(value),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const timingConfig: Animated.TimingConfig = {
    duration,
    toValue: new Value(destination),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    startClock(clock),
    timing(clock, timingState, timingConfig),
    cond(timingState.finished, [
      set(timingState.finished, 0),
      set(timingState.time, 0),
      set(timingState.frameTime, 0),
      set(
        timingState.position,
        cond(eq(timingState.position, destination), destination, value)
      ),
      set(
        timingConfig.toValue as Animated.Value<number>,
        cond(eq(timingState.position, destination), value, destination)
      ),
    ]),
    timingState.position,
  ]);
};

// const dimensionRunTiming: RunTimingFn = (
//   clock: Animated.Clock,
//   value: number,
//   destination: number,
//   duration: number
// ) => {
//   const timingState: Animated.TimingState = {
//     finished: new Value(0),
//     position: new Value(value),
//     time: new Value(0),
//     frameTime: new Value(0),
//   };
//
//   const timingConfig: Animated.TimingConfig = {
//     duration,
//     toValue: new Value(destination),
//     easing: Easing.inOut(Easing.ease),
//   };
//
//   return block([
//     cond(
//       clockRunning(clock),
//       [set(timingConfig.toValue as Animated.Value<number>, destination)],
//       [
//         set(timingState.finished, 0),
//         set(timingState.time, 0),
//         set(timingState.position, value),
//         set(timingState.frameTime, 0),
//         set(timingConfig.toValue as Animated.Value<number>, destination),
//         startClock(clock),
//       ]
//     ),
//     timing(clock, timingState, timingConfig),
//     cond(timingState.finished, debug('stop clock', stopClock(clock))),
//     timingState.position,
//   ]);
// };

const noop = () => {};

export const BarcodeMask: FC<BarcodeMaskProps> = memo(
  ({
    width,
    height,
    startValue,
    destinationValue,
    backgroundColor,
    edgeBorderWidth,
    edgeColor,
    edgeHeight,
    edgeWidth,
    edgeRadius,
    maskOpacity,
    animatedLineColor,
    animatedLineOrientation,
    animatedLineThickness,
    animationDuration,
    showAnimatedLine,
    runTimingFn,
    onLayoutChange,
    outerBoundingRect,
    onOuterLayout,
  }) => {
    const edgeBorderStyle = React.useRef<
      {
        [position in EdgePosition]: ViewStyle;
      }
    >({
      topRight: {
        borderRightWidth: edgeBorderWidth as number,
        borderTopWidth: edgeBorderWidth as number,
        borderTopRightRadius: edgeRadius,
        top: -(edgeBorderWidth as number),
        right: -(edgeBorderWidth as number),
      },
      topLeft: {
        borderTopWidth: edgeBorderWidth as number,
        borderLeftWidth: edgeBorderWidth as number,
        borderTopLeftRadius: edgeRadius,
        top: -(edgeBorderWidth as number),
        left: -(edgeBorderWidth as number),
      },
      bottomRight: {
        borderBottomWidth: edgeBorderWidth as number,
        borderRightWidth: edgeBorderWidth as number,
        borderBottomRightRadius: edgeRadius,
        bottom: -(edgeBorderWidth as number),
        right: -(edgeBorderWidth as number),
      },
      bottomLeft: {
        borderBottomWidth: edgeBorderWidth as number,
        borderLeftWidth: edgeBorderWidth as number,
        borderBottomLeftRadius: edgeRadius,
        bottom: -(edgeBorderWidth as number),
        left: -(edgeBorderWidth as number),
      },
    });

    const _animatedLineDimension = (
      dimension: DimensionUnit | undefined,
      outerDimension: 'width' | 'height'
    ) => {
      const outer = outerBoundingRect?.[outerDimension] ?? 0;
      if (dimension) {
        if (typeof dimension === 'number') {
          return dimension * 0.9;
        }
        return dimension.endsWith('%')
          ? (Number(dimension.split('%')[0]) / 100) * outer * 0.9
          : Number(dimension.split(/\d+/)[0]) * outer * 0.9;
      }
      return outer * 0.9;
    };

    const _width = React.useRef<number>(_animatedLineDimension(width, 'width'));
    const _height = React.useRef<number>(
      _animatedLineDimension(height, 'height')
    );

    // React.useEffect(() => {
    //   const computedWidth = _animatedLineDimension(width, 'width');
    //   if (computedWidth !== _width.current) {
    //     _width.current = computedWidth;
    //   }
    // }, [width]);
    //
    // React.useEffect(() => {
    //   const computedHeight = _animatedLineDimension(height, 'height');
    //   if (computedHeight !== _height.current) {
    //     _height.current = computedHeight;
    //   }
    // }, [height]);

    const _animatedValue = (
      dimension: DimensionUnit | undefined,
      outerDimension: 'width' | 'height'
    ) => {
      const calculatedDimension = _animatedLineDimension(
        dimension,
        outerDimension
      );
      const fullDimension = calculatedDimension / 0.9;

      return fullDimension - (animatedLineThickness as number);
    };

    const _animatedLineStyle = () => {
      if (animatedLineOrientation === 'horizontal') {
        const destination = _animatedValue(height, 'height');
        return {
          ...styles.animatedLine,
          height: animatedLineThickness,
          width: _width.current,
          backgroundColor: animatedLineColor,
          top: runTimingFn!(
            new Clock(),
            startValue || 0,
            destinationValue || destination,
            animationDuration as number
          ),
        };
      }
      const destination = _animatedValue(width, 'width');
      return {
        ...styles.animatedLine,
        width: animatedLineThickness,
        height: _height.current,
        backgroundColor: animatedLineColor,
        left: runTimingFn!(
          new Clock(),
          startValue || 0,
          destinationValue || destination,
          animationDuration as number
        ),
      };
    };

    const _renderEdge = (edgePosition: EdgePosition) => {
      const defaultStyle = {
        width: edgeWidth,
        height: edgeHeight,
        borderColor: edgeColor,
        zIndex: 2,
      };
      return (
        <View
          style={{
            ...defaultStyle,
            ...styles[edgePosition],
            ...edgeBorderStyle.current[edgePosition],
          }}
        />
      );
    };

    return (
      <View style={styles.container}>
        <View
          style={{
            ...styles.finder,
            width: _width.current / 0.9,
            height: _height.current / 0.9,
          }}
          onLayout={onLayoutChange || noop}
        >
          {_renderEdge('topLeft')}
          {_renderEdge('topRight')}
          {_renderEdge('bottomLeft')}
          {_renderEdge('bottomRight')}
          {showAnimatedLine && <Animated.View style={_animatedLineStyle()} />}
        </View>
        <View style={styles.maskOuter} onLayout={onOuterLayout || noop}>
          <View
            style={{
              ...styles.maskRow,
              ...{ backgroundColor, opacity: maskOpacity, flex: 1 },
            }}
          />
          <View style={{ height, ...styles.maskCenter }}>
            <View style={{ backgroundColor, opacity: maskOpacity, flex: 1 }} />
            <View
              style={{
                ...styles.maskInner,
                width,
                height,
                borderRadius: edgeRadius,
              }}
            />
            <View style={{ backgroundColor, opacity: maskOpacity, flex: 1 }} />
          </View>
          <View
            style={{
              ...styles.maskRow,
              ...{ backgroundColor, opacity: maskOpacity, flex: 1 },
            }}
          />
        </View>
      </View>
    );
  }
);

BarcodeMask.defaultProps = {
  width: 280,
  height: 230,
  edgeWidth: 20,
  edgeHeight: 20,
  edgeColor: '#fff',
  edgeBorderWidth: 4,
  edgeRadius: 0,
  backgroundColor: '#eee',
  maskOpacity: 1,
  animatedLineColor: '#fff',
  animatedLineOrientation: 'horizontal',
  animatedLineThickness: 2,
  animationDuration: 2000,
  runTimingFn: runTiming,
  showAnimatedLine: true,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  finder: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  maskOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    backgroundColor: 'transparent',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: {
    flexDirection: 'row',
    display: 'flex',
  },
  topLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  animatedLine: {
    position: 'absolute',
    zIndex: 1,
  },
});
