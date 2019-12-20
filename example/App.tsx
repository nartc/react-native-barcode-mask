/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import { BarcodeMask } from '@nartc/react-native-barcode-mask';

const App = () => {
  const rnCamera = useRef<RNCamera>(null);

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
          captureAudio={false}>
          <BarcodeMask width={200} height={200}/>
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
