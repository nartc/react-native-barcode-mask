import useBarcodeFinder from './useBarcodeFinder';
import { CustomBarcodeRead, CustomBarcodeReadCallback } from 'interfaces';
import { useCallback } from 'react';
import { BarCodeType, Point, Size } from 'react-native-camera';

export default (
  isFocused: boolean,
  dataProcessor: (data: string) => string,
  onScannedData: (processed: string) => void,
  customBarcodeRead: CustomBarcodeRead,
  customBarcodeReadCallback: CustomBarcodeReadCallback
) => {
  const {
    onBarcodeFinderLayoutChange,
    finderHeight,
    finderWidth,
    finderX,
    finderY,
    isFinderBoundingInitialized,
    processingReadBarcode,
  } = useBarcodeFinder(dataProcessor, onScannedData, customBarcodeRead);

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
    onBarcodeRead: customBarcodeReadCallback
      ? customBarcodeReadCallback(
          {
            x: finderX,
            y: finderY,
            width: finderWidth,
            height: finderHeight,
          },
          isFinderBoundingInitialized,
          processingReadBarcode
        )
      : _onBarcodeRead,
    onBarcodeFinderLayoutChange,
  };
};
