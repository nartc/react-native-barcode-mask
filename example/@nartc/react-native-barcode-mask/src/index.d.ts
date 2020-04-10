/// <reference types="react" />
import { BarcodeMask } from './BarcodeMask';
import { withOuterLayout } from './hocs';
import { BoundingRect, CustomBarcodeRead, CustomBarcodeReadCallback, WithOuterLayoutProps } from './interfaces';
declare const useBarcodeRead: (isFocused: boolean, dataProcessor: (data: string) => string, onScannedData: (processed: string) => void, barcodeReadDelay?: number) => {
    barcodeRead: boolean | null;
    onBarcodeRead: (event: {
        data: string;
        bounds: {
            width: number;
            height: number;
            origin: import("react-native-camera").Point<string>[];
        } | {
            origin: import("react-native-camera").Point<string>;
            size: import("react-native-camera").Size<string>;
        };
        type: "aztec" | "code128" | "code39" | "code39mod43" | "code93" | "ean13" | "ean8" | "pdf417" | "qr" | "upc_e" | "interleaved2of5" | "itf14" | "datamatrix";
    }) => void;
    onBarcodeFinderLayoutChange: (event: import("react-native").LayoutChangeEvent) => void;
};
declare const useCustomBarcodeRead: (isFocused: boolean, dataProcessor: (data: string) => string, onScannedData: (processed: string) => void, customBarcodeRead: CustomBarcodeRead, customBarcodeReadCallback: CustomBarcodeReadCallback) => {
    barcodeRead: boolean | null;
    onBarcodeRead: (event: {
        data: string;
        bounds: {
            width: number;
            height: number;
            origin: import("react-native-camera").Point<string>[];
        } | {
            origin: import("react-native-camera").Point<string>;
            size: import("react-native-camera").Size<string>;
        };
        type: "aztec" | "code128" | "code39" | "code39mod43" | "code93" | "ean13" | "ean8" | "pdf417" | "qr" | "upc_e" | "interleaved2of5" | "itf14" | "datamatrix";
    }) => void;
    onBarcodeFinderLayoutChange: (event: import("react-native").LayoutChangeEvent) => void;
};
declare const BarcodeMaskWithOuterLayout: {
    new (props: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>): {
        state: import("./hocs").WithOuterLayoutHocState;
        onOuterLayout: (event: import("react-native").LayoutChangeEvent) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "boundingRect">(state: import("./hocs").WithOuterLayoutHocState | ((prevState: Readonly<import("./hocs").WithOuterLayoutHocState>, props: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>) => import("./hocs").WithOuterLayoutHocState | Pick<import("./hocs").WithOuterLayoutHocState, K> | null) | Pick<import("./hocs").WithOuterLayoutHocState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, nextState: Readonly<import("./hocs").WithOuterLayoutHocState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, prevState: Readonly<import("./hocs").WithOuterLayoutHocState>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, prevState: Readonly<import("./hocs").WithOuterLayoutHocState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, nextState: Readonly<import("./hocs").WithOuterLayoutHocState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, nextState: Readonly<import("./hocs").WithOuterLayoutHocState>, nextContext: any): void;
    };
    new (props: Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">, context?: any): {
        state: import("./hocs").WithOuterLayoutHocState;
        onOuterLayout: (event: import("react-native").LayoutChangeEvent) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "boundingRect">(state: import("./hocs").WithOuterLayoutHocState | ((prevState: Readonly<import("./hocs").WithOuterLayoutHocState>, props: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>) => import("./hocs").WithOuterLayoutHocState | Pick<import("./hocs").WithOuterLayoutHocState, K> | null) | Pick<import("./hocs").WithOuterLayoutHocState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, nextState: Readonly<import("./hocs").WithOuterLayoutHocState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, prevState: Readonly<import("./hocs").WithOuterLayoutHocState>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, prevState: Readonly<import("./hocs").WithOuterLayoutHocState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, nextState: Readonly<import("./hocs").WithOuterLayoutHocState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<import("./BarcodeMask").BarcodeMaskProps, "width" | "height" | "edgeWidth" | "edgeHeight" | "edgeColor" | "edgeRadius" | "edgeBorderWidth" | "backgroundColor" | "maskOpacity" | "showAnimatedLine" | "startValue" | "destinationValue" | "animatedLineThickness" | "animatedLineOrientation" | "animatedLineColor" | "animationDuration" | "runTimingFn" | "onLayoutChange">>, nextState: Readonly<import("./hocs").WithOuterLayoutHocState>, nextContext: any): void;
    };
    displayName: string;
    contextType?: import("react").Context<any> | undefined;
};
export { BarcodeMask, BarcodeMaskWithOuterLayout, useBarcodeRead, useCustomBarcodeRead, CustomBarcodeRead, CustomBarcodeReadCallback, BoundingRect, WithOuterLayoutProps, withOuterLayout, };
