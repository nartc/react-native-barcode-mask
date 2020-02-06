import { CustomBarcodeRead } from 'interfaces';
import { useCallback, useState } from 'react';
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
  customBarcodeRead?: CustomBarcodeRead | number
) => {
  const [barcodeRead, setBarcodeRead] = useState(false);
  const [finderWidth, setFinderWidth] = useState(0);
  const [finderHeight, setFinderHeight] = useState(0);
  const [finderX, setFinderX] = useState(0);
  const [finderY, setFinderY] = useState(0);
  const _onBarcodeFinderLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      const {
        nativeEvent: {
          layout: { height, width, x, y },
        },
      } = event;
      setFinderWidth(width);
      setFinderHeight(height);
      setFinderX(x);
      setFinderY(y);
    },
    [finderX, finderY, finderHeight, finderWidth]
  );

  let timeoutId = 0;
  let processingReadBarcode: (data: string) => void;

  if (
    !customBarcodeRead ||
    (customBarcodeRead && typeof customBarcodeRead === 'number')
  ) {
    timeoutId && clearTimeout(timeoutId);
    processingReadBarcode = data => {
      setBarcodeRead(true);
      onScannedData(dataProcessor(data));
      timeoutId = setTimeout(() => {
        setBarcodeRead(false);
      }, customBarcodeRead);
    };
  } else {
    processingReadBarcode = data => {
      (customBarcodeRead as CustomBarcodeRead)?.beforeScan?.();
      onScannedData(dataProcessor(data));
      (customBarcodeRead as CustomBarcodeRead)?.afterScan?.();
    };
  }

  return {
    barcodeRead:
      customBarcodeRead && typeof customBarcodeRead === 'object'
        ? null
        : barcodeRead,
    finderX,
    finderY,
    finderWidth,
    finderHeight,
    onBarcodeFinderLayoutChange: _onBarcodeFinderLayoutChange,
    processingReadBarcode,
  };
};
