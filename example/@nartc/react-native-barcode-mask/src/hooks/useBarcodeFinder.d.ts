import { LayoutChangeEvent } from 'react-native';
import { CustomBarcodeRead } from '../interfaces';
declare const _default: (dataProcessor: (data: string) => string, onScannedData: (processed: string) => void, customBarcodeRead?: number | CustomBarcodeRead | undefined) => {
    barcodeRead: boolean | null;
    finderX: number;
    finderY: number;
    finderWidth: number;
    finderHeight: number;
    onBarcodeFinderLayoutChange: (event: LayoutChangeEvent) => void;
    processingReadBarcode: (data: string) => void;
};
/**
 * @internal
 * @param dataProcessor
 * @param onScannedData
 * @param customBarcodeRead
 */
export default _default;
