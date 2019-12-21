import { useCallback } from 'react';
import { PixelRatio } from 'react-native';
import { BarCodeType, Point, RNCamera, Size } from 'react-native-camera';
import { CustomBarcodeRead, CustomBarcodeReadCallback } from '../interfaces';
import useBarcodeFinder from './useBarcodeFinder';

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
    isFinderBoundingInitialized,
    finderY,
    finderX,
    finderWidth,
    finderHeight,
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

      const _bounds = event.bounds as {
        width: number;
        height: number;
        origin: Point<string>[];
      };
      const _pointBounds = _bounds.origin.map(point => ({
        x: Number(point.x) / PixelRatio.get(),
        y: Number(point.y) / PixelRatio.get(),
      }));

      const _insideBox = (point: { x: number; y: number }) => {
        const { x, y } = point;
        return (
          x >= finderX &&
          x <= finderX + finderWidth &&
          y >= finderY &&
          y <= finderY + finderHeight
        );
      };

      /**
       *  0 --------------- 2
       *  |  PDF417         |
       *  | /////////////// |
       *  1 --------------- 3
       */
      if (event.type === RNCamera.Constants.BarCodeType.pdf417) {
        const [topLeft, bottomLeft, topRight, bottomRight] = _pointBounds;
        if (
          _insideBox(topLeft) &&
          _insideBox(bottomLeft) &&
          _insideBox(topRight) &&
          _insideBox(bottomRight)
        ) {
          processingReadBarcode(event.data);
          return;
        }
      }

      /**
       *  2 ------ 3
       *  |
       *  | QR Code
       *  |
       *  1 ------ 0
       */
      if (event.type === RNCamera.Constants.BarCodeType.qr) {
        const [bottomRight, bottomLeft, topLeft, topRight] = _pointBounds;
        if (
          _insideBox(bottomRight) &&
          _insideBox(bottomLeft) &&
          _insideBox(topLeft) &&
          _insideBox(topRight)
        ) {
          processingReadBarcode(event.data);
          return;
        }
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
