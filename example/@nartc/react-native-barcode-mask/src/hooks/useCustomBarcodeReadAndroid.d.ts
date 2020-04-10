import { CustomBarcodeRead, CustomBarcodeReadCallback } from '../interfaces';
declare const _default: (isFocused: boolean, dataProcessor: (data: string) => string, onScannedData: (processed: string) => void, customBarcodeRead: CustomBarcodeRead, customBarcodeReadCallback: CustomBarcodeReadCallback) => {
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
export default _default;
