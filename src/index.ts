import { Platform } from 'react-native';
import { BarcodeMask } from './BarcodeMask';
import { useBarcodeReadAndroid, useBarcodeReadIOS } from './hooks';

const useBarcodeRead = Platform.select({
  android: useBarcodeReadAndroid,
  ios: useBarcodeReadIOS,
});

export { BarcodeMask, useBarcodeRead };
