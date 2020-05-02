import React, { FC } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated from 'react-native-reanimated';
import { WithOuterLayoutProps } from './interfaces';
declare type DimensionUnit = string | number;
/**
 *
 */
export declare type RunTimingFn = (clock: Animated.Clock, value: number, destination: number, duration: number) => Animated.Node<number>;
export declare type OnLayoutChangeHandler = (event: LayoutChangeEvent) => void;
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
     * @name animatedComponent
     * @type Function
     * @param width
     * @param height
     */
    animatedComponent?: (width: number, height: number) => React.ReactElement;
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
export declare const BarcodeMask: FC<BarcodeMaskProps>;
export {};
