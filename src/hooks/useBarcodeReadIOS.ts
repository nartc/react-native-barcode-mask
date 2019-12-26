import useBarcodeFinder from './useBarcodeFinder';
import useInternalBarcodeRead from './useInternalBarcodeRead';

export default (
  isFocused: boolean,
  dataProcessor: (data: string) => string,
  onScannedData: (processed: string) => void
) => {
  const {
    barcodeRead,
    onBarcodeFinderLayoutChange,
    isFinderBoundingInitialized,
    finderY,
    finderX,
    finderWidth,
    finderHeight,
    processingReadBarcode,
  } = useBarcodeFinder(dataProcessor, onScannedData);

  const onBarcodeRead = useInternalBarcodeRead(
    isFocused,
    isFinderBoundingInitialized,
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
