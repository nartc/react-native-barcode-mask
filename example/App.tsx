/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useRef } from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {BarcodeMask, useBarcodeRead} from '../src';

const App = () => {
  const {onBarcodeRead, barcodeRead} = useBarcodeRead(
    true,
    barcode => {
      console.log(barcode);
      return barcode;
    },
    processed => {
      console.log(processed);
    },
  );

  const rnCamera = useRef<RNCamera>(null);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <RNCamera
          ref={rnCamera}
          androidCameraPermissionOptions={{
            title: 'permissionCamera',
            message: 'permissionCameraMessage',
            buttonPositive: 'ok',
            buttonNegative: 'cancel',
          }}
          style={styles.scanner}
          type={RNCamera.Constants.Type.back}
          barCodeTypes={barcodeRead ? [] : [RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={onBarcodeRead}
          captureAudio={false}>
          <BarcodeMask />
        </RNCamera>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
});

export default App;
