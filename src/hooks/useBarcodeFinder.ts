import { CustomBarcodeRead } from 'interfaces';
import { useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

/**
 * @internal
 * @param dataProcessor
 * @param onScannedData
 * @param customBarcodeRead
 */
export default (
  dataProcessor: (data: string) => string,
  onScannedData: (processed: string) => void,
  customBarcodeRead?: CustomBarcodeRead
) => {
  const [barcodeRead, setBarcodeRead] = useState(false);
  const [
    isFinderBoundingInitialized,
    setIsFinderBoundingInitialized,
  ] = useState(false);
  const finderWidth = useRef(0);
  const finderHeight = useRef(0);
  const finderX = useRef(0);
  const finderY = useRef(0);
  const _onBarcodeFinderLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      const {
        nativeEvent: {
          layout: { height, width, x, y },
        },
      } = event;
      finderWidth.current = width;
      finderHeight.current = height;
      finderX.current = x;
      finderY.current = y;
      setIsFinderBoundingInitialized(true);
    },
    []
  );

  const processingReadBarcode = (data: string) => {
    customBarcodeRead?.beforeScan?.() || setBarcodeRead(true);
    const processed = dataProcessor(data);

    if (processed) {
      onScannedData(processed);
    }

    customBarcodeRead?.afterScan?.() || setBarcodeRead(false);
  };

  return {
    barcodeRead: customBarcodeRead ? null : barcodeRead,
    finderX: finderX.current,
    finderY: finderY.current,
    finderWidth: finderWidth.current,
    finderHeight: finderHeight.current,
    isFinderBoundingInitialized,
    onBarcodeFinderLayoutChange: _onBarcodeFinderLayoutChange,
    processingReadBarcode,
  };
};
