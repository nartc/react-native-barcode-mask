module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: './',
        alias: {
          '@nartc/react-native-barcode-mask':
            'node_modules/@nartc/react-native-barcode-mask',
        },
        cwd: 'packagejson',
      },
    ],
  ],
};
