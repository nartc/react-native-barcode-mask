import { useCallback } from 'react';
import { BarCodeType, Point, Size } from 'react-native-camera';
import useBarcodeFinder from './useBarcodeFinder';

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

  const _onBarcodeRead = useCallback(
    (event: {
      data: string;
      bounds:
        | { width: number; height: number; origin: Array<Point<string>> }
        | { origin: Point<string>; size: Size<string> };
      type: keyof BarCodeType;
    }) => {
      if (!isFinderBoundingInitialized) {
        return;
      }

      const {
        origin: { x, y },
        size: { width, height },
      } = event.bounds as { origin: Point<string>; size: Size<string> };
      if (
        Number(x) >= finderX &&
        Number(x) + Number(width) <= finderX + finderWidth &&
        Number(y) >= finderY &&
        Number(y) + Number(height) <= finderY + finderHeight
      ) {
        processingReadBarcode(event.data);
        return;
      }
    },
    [
      isFocused,
      isFinderBoundingInitialized,
      finderX,
      finderY,
      finderWidth,
      finderHeight,
    ]
  );

  return {
    barcodeRead,
    onBarcodeRead: _onBarcodeRead,
    onBarcodeFinderLayoutChange,
  };
};
