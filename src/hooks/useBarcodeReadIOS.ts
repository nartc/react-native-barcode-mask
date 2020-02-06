import useBarcodeFinder from './useBarcodeFinder';
import useInternalBarcodeRead from './useInternalBarcodeRead';

export default (
  isFocused: boolean,
  dataProcessor: (data: string) => string,
  onScannedData: (processed: string) => void,
  barcodeReadDelay: number = 500
) => {
  const {
    barcodeRead,
    onBarcodeFinderLayoutChange,
    finderY,
    finderX,
    finderWidth,
    finderHeight,
    processingReadBarcode,
  } = useBarcodeFinder(dataProcessor, onScannedData, barcodeReadDelay);

  const onBarcodeRead = useInternalBarcodeRead(
    barcodeRead != null ? barcodeRead : false,
    isFocused,
    finderX,
    finderY,
    finderWidth,
    finderHeight,
    processingReadBarcode
  );

  return {
    barcodeRead,
    onBarcodeRead,
    onBarcodeFinderLayoutChange,
  };
};
