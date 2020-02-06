import { CustomBarcodeRead, CustomBarcodeReadCallback } from 'interfaces';
import useBarcodeFinder from './useBarcodeFinder';
import useInternalBarcodeRead from './useInternalBarcodeRead';

export default (
  isFocused: boolean,
  dataProcessor: (data: string) => string,
  onScannedData: (processed: string) => void,
  customBarcodeRead: CustomBarcodeRead,
  customBarcodeReadCallback: CustomBarcodeReadCallback
) => {
  const {
    barcodeRead,
    onBarcodeFinderLayoutChange,
    finderHeight,
    finderWidth,
    finderX,
    finderY,
    processingReadBarcode,
  } = useBarcodeFinder(dataProcessor, onScannedData, customBarcodeRead);

  return {
    barcodeRead,
    onBarcodeRead: customBarcodeReadCallback
      ? customBarcodeReadCallback(
          {
            x: finderX,
            y: finderY,
            width: finderWidth,
            height: finderHeight,
          },
          processingReadBarcode
        )
      : useInternalBarcodeRead(
          barcodeRead != null ? barcodeRead : false,
          isFocused,
          finderX,
          finderY,
          finderWidth,
          finderHeight,
          processingReadBarcode
        ),
    onBarcodeFinderLayoutChange,
  };
};
