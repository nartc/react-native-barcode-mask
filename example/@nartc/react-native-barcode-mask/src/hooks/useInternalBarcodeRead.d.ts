import { Point, Size } from 'react-native-camera';
declare const _default: (barcodeRead: boolean, isFocused: boolean, finderX: number, finderY: number, finderWidth: number, finderHeight: number, processingReadBarcode: (data: string) => void) => (event: {
    data: string;
    bounds: {
        width: number;
        height: number;
        origin: Point<string>[];
    } | {
        origin: Point<string>;
        size: Size<string>;
    };
    type: "aztec" | "code128" | "code39" | "code39mod43" | "code93" | "ean13" | "ean8" | "pdf417" | "qr" | "upc_e" | "interleaved2of5" | "itf14" | "datamatrix";
}) => void;
export default _default;
