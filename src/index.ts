import { Platform } from 'react-native';
import { BarcodeMask } from './BarcodeMask';
import { withOuterLayout } from './hocs';
import {
  useBarcodeReadAndroid,
  useBarcodeReadIOS,
  useCustomBarcodeReadAndroid,
  useCustomBarcodeReadIOS,
} from './hooks';
import {
  BoundingRect,
  CustomBarcodeRead,
  CustomBarcodeReadCallback,
  WithOuterLayoutProps,
} from './interfaces';

const useBarcodeRead = Platform.select({
  android: useBarcodeReadAndroid,
  ios: useBarcodeReadIOS,
});

const useCustomBarcodeRead = Platform.select({
  android: useCustomBarcodeReadAndroid,
  ios: useCustomBarcodeReadIOS,
});

export {
  BarcodeMask,
  useBarcodeRead,
  useCustomBarcodeRead,
  CustomBarcodeRead,
  CustomBarcodeReadCallback,
  BoundingRect,
  WithOuterLayoutProps,
  withOuterLayout,
};
