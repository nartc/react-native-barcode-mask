/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// @ts-check
/** @type {import("./@nartc/react-native-barcode-mask/src/index")} */

import React, {useRef, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {
  BarcodeMaskWithOuterLayout,
  useCustomBarcodeRead,
} from './@nartc/react-native-barcode-mask/react-native-barcode-mask.esm';

const App = () => {
  const rnCamera = useRef(null);
  const [barcodeReadCount, setBarcodeReadCount] = useState(0);
  const [barcodeReadAware, setBarcodeReadAware] = useState(false);
  const [barcodeRead, setBarcodeRead] = useState(false);
  const {onBarcodeFinderLayoutChange, onBarcodeRead} = useCustomBarcodeRead(
    true,
    data => data,
    processed => {
      console.log(processed, {barcodeReadCount});
      setBarcodeReadCount(prev => prev + 1);
    },
    {
      beforeScan: () => {
        setBarcodeRead(true);
      },
      afterScan: () => {},
    },
    (a, b, c) => {
      return event => {
        c(event.data);
      };
    },
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Button
            title={'Toggle Barcode Read Aware'}
            onPress={() => {
              setBarcodeReadAware(prev => !prev);
              setBarcodeRead(false);
              setBarcodeReadCount(0);
            }}
          />
          <Text>{barcodeReadAware.toString()}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            title={'Reset Barcode Read'}
            onPress={() => setBarcodeRead(false)}
          />
          <Text>{barcodeRead.toString()}</Text>
        </View>
        <Text>Barcode Read Count: {barcodeReadCount}</Text>
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
          barCodeTypes={
            barcodeReadAware
              ? barcodeRead
                ? []
                : [RNCamera.Constants.BarCodeType.qr]
              : [RNCamera.Constants.BarCodeType.qr]
          }
          onBarCodeRead={onBarcodeRead}
          captureAudio={false}>
          <BarcodeMaskWithOuterLayout
            maskOpacity={0.5}
            height={'90%'}
            onLayoutChange={onBarcodeFinderLayoutChange}
          />
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
