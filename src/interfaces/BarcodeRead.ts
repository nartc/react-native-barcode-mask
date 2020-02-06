import { BarCodeType, Point, Size } from 'react-native-camera';

export interface CustomBarcodeRead {
  beforeScan: () => void;
  afterScan: () => void;
}

export interface CustomBarcodeReadCallback {
  (
    finderBoundingRect: { x: number; y: number; width: number; height: number },
    processingBarcodeFn: (data: string) => void
  ): (event: {
    data: string;
    bounds:
      | { width: number; height: number; origin: Array<Point<string>> }
      | { origin: Point<string>; size: Size<string> };
    type: keyof BarCodeType;
  }) => void;
}
