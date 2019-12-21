/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// @ts-check
/** @type {import("./@nartc/react-native-barcode-mask/src/index")} */

import React, {useRef} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {
  BarcodeMaskWithOuterLayout,
  useCustomBarcodeRead,
} from './@nartc/react-native-barcode-mask/react-native-barcode-mask.esm';

const App = () => {
  const rnCamera = useRef(null);
  const {onBarcodeFinderLayoutChange, onBarcodeRead} = useCustomBarcodeRead(true, data => data, console.log, null, res => {
    return event => {
      console.log(res, event);
    }
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
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
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={onBarcodeRead}
          captureAudio={false}>
          <BarcodeMaskWithOuterLayout maskOpacity={0.5} height={'100%'} />
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
