import { View, StyleSheet, Platform, PixelRatio } from 'react-native';
import React, { memo, PureComponent, useState, useReducer, useCallback } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import { RNCamera } from 'react-native-camera';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var Value = Animated.Value,
    Clock = Animated.Clock,
    block = Animated.block,
    cond = Animated.cond,
    set = Animated.set,
    startClock = Animated.startClock,
    timing = Animated.timing,
    eq = Animated.eq;

var runTiming = function runTiming(clock, value, destination, duration) {
  var timingState = {
    finished: new Value(0),
    position: new Value(value),
    time: new Value(0),
    frameTime: new Value(0)
  };
  var timingConfig = {
    duration: duration,
    toValue: new Value(destination),
    easing: Easing.inOut(Easing.ease)
  };
  return block([startClock(clock), timing(clock, timingState, timingConfig), cond(timingState.finished, [set(timingState.finished, 0), set(timingState.time, 0), set(timingState.frameTime, 0), set(timingState.position, cond(eq(timingState.position, destination), destination, value)), set(timingConfig.toValue, cond(eq(timingState.position, destination), value, destination))]), timingState.position]);
}; // const dimensionRunTiming: RunTimingFn = (
//   clock: Animated.Clock,
//   value: number,
//   destination: number,
//   duration: number
// ) => {
//   const timingState: Animated.TimingState = {
//     finished: new Value(0),
//     position: new Value(value),
//     time: new Value(0),
//     frameTime: new Value(0),
//   };
//
//   const timingConfig: Animated.TimingConfig = {
//     duration,
//     toValue: new Value(destination),
//     easing: Easing.inOut(Easing.ease),
//   };
//
//   return block([
//     startClock(clock),
//     timing(clock, timingState, timingConfig),
//     cond(timingState.finished, stopClock(clock)),
//     timingState.position,
//   ]);
// };


var noop = function noop() {};

var BarcodeMask = /*#__PURE__*/memo(function (_ref) {
  var width = _ref.width,
      height = _ref.height,
      startValue = _ref.startValue,
      destinationValue = _ref.destinationValue,
      backgroundColor = _ref.backgroundColor,
      edgeBorderWidth = _ref.edgeBorderWidth,
      edgeColor = _ref.edgeColor,
      edgeHeight = _ref.edgeHeight,
      edgeWidth = _ref.edgeWidth,
      edgeRadius = _ref.edgeRadius,
      maskOpacity = _ref.maskOpacity,
      animatedComponent = _ref.animatedComponent,
      animatedLineColor = _ref.animatedLineColor,
      animatedLineOrientation = _ref.animatedLineOrientation,
      animatedLineThickness = _ref.animatedLineThickness,
      animationDuration = _ref.animationDuration,
      showAnimatedLine = _ref.showAnimatedLine,
      runTimingFn = _ref.runTimingFn,
      onLayoutChange = _ref.onLayoutChange,
      outerBoundingRect = _ref.outerBoundingRect,
      onOuterLayout = _ref.onOuterLayout;
  var edgeBorderStyle = React.useRef({
    topRight: {
      borderRightWidth: edgeBorderWidth,
      borderTopWidth: edgeBorderWidth,
      borderTopRightRadius: edgeRadius,
      top: -edgeBorderWidth,
      right: -edgeBorderWidth
    },
    topLeft: {
      borderTopWidth: edgeBorderWidth,
      borderLeftWidth: edgeBorderWidth,
      borderTopLeftRadius: edgeRadius,
      top: -edgeBorderWidth,
      left: -edgeBorderWidth
    },
    bottomRight: {
      borderBottomWidth: edgeBorderWidth,
      borderRightWidth: edgeBorderWidth,
      borderBottomRightRadius: edgeRadius,
      bottom: -edgeBorderWidth,
      right: -edgeBorderWidth
    },
    bottomLeft: {
      borderBottomWidth: edgeBorderWidth,
      borderLeftWidth: edgeBorderWidth,
      borderBottomLeftRadius: edgeRadius,
      bottom: -edgeBorderWidth,
      left: -edgeBorderWidth
    }
  }); // const previousWidth = usePrevDimension(width, () => {
  //   return _animatedLineDimension(width, 'width') * 0.9;
  // });
  // const previousHeight = usePrevDimension(height, () => {
  //   return _animatedLineDimension(height, 'height') * 0.9;
  // });

  var _animatedLineDimension = function _animatedLineDimension(dimension, outerDimension) {
    var _outerBoundingRect$ou;

    var outer = (_outerBoundingRect$ou = outerBoundingRect === null || outerBoundingRect === void 0 ? void 0 : outerBoundingRect[outerDimension]) !== null && _outerBoundingRect$ou !== void 0 ? _outerBoundingRect$ou : 0;

    if (dimension) {
      if (typeof dimension === 'number') {
        return dimension * 0.9;
      }

      return dimension.endsWith('%') ? Number(dimension.split('%')[0]) / 100 * (outer || 1) * 0.9 : Number(dimension.split(/\d+/)[0]) * (outer || 1) * 0.9;
    }

    return outer * 0.9;
  };

  var _animatedValue = function _animatedValue(dimension, outerDimension) {
    var calculatedDimension = _animatedLineDimension(dimension, outerDimension);

    var fullDimension = calculatedDimension / 0.9;
    return fullDimension - animatedLineThickness;
  };

  var _animatedLineStyle = function _animatedLineStyle() {
    if (animatedLineOrientation === 'horizontal') {
      var _width2 = _animatedLineDimension(width, 'width');

      var _destination = _animatedValue(height, 'height');

      return _extends({}, styles.animatedLine, {
        height: animatedLineThickness,
        width: _width2,
        backgroundColor: animatedLineColor,
        top: runTimingFn(new Clock(), startValue || 0, destinationValue || _destination, animationDuration)
      });
    }

    var _height = _animatedLineDimension(height, 'height');

    var destination = _animatedValue(width, 'width');

    return _extends({}, styles.animatedLine, {
      width: animatedLineThickness,
      height: _height,
      backgroundColor: animatedLineColor,
      left: runTimingFn(new Clock(), startValue || 0, destinationValue || destination, animationDuration)
    });
  };

  var _renderEdge = function _renderEdge(edgePosition) {
    var defaultStyle = {
      width: edgeWidth,
      height: edgeHeight,
      borderColor: edgeColor,
      zIndex: 2
    };
    return React.createElement(View, {
      style: _extends({}, defaultStyle, {}, styles[edgePosition], {}, edgeBorderStyle.current[edgePosition])
    });
  };

  var _width = _animatedLineDimension(width, 'width') / 0.9;

  var _height = _animatedLineDimension(height, 'height') / 0.9;

  var _renderAnimated = function _renderAnimated() {
    if (showAnimatedLine) {
      if (animatedComponent) {
        return animatedComponent(_width, _height);
      }

      return React.createElement(Animated.View, {
        style: _animatedLineStyle()
      });
    }

    return null;
  };

  return React.createElement(View, {
    style: styles.container
  }, React.createElement(View, {
    style: _extends({}, styles.finder, {
      // width: dimensionRunTiming(new Clock(), 0, 500, 2000),
      // height: _height,
      width: _width,
      height: _height
    }),
    onLayout: onLayoutChange || noop
  }, _renderEdge('topLeft'), _renderEdge('topRight'), _renderEdge('bottomLeft'), _renderEdge('bottomRight'), _renderAnimated()), React.createElement(View, {
    style: styles.maskOuter,
    onLayout: onOuterLayout || noop
  }, React.createElement(View, {
    style: _extends({}, styles.maskRow, {}, {
      backgroundColor: backgroundColor,
      opacity: maskOpacity,
      flex: 1
    })
  }), React.createElement(View, {
    style: _extends({
      height: height
    }, styles.maskCenter)
  }, React.createElement(View, {
    style: {
      backgroundColor: backgroundColor,
      opacity: maskOpacity,
      flex: 1
    }
  }), React.createElement(View, {
    style: _extends({}, styles.maskInner, {
      width: width,
      height: height,
      borderRadius: edgeRadius
    })
  }), React.createElement(View, {
    style: {
      backgroundColor: backgroundColor,
      opacity: maskOpacity,
      flex: 1
    }
  })), React.createElement(View, {
    style: _extends({}, styles.maskRow, {}, {
      backgroundColor: backgroundColor,
      opacity: maskOpacity,
      flex: 1
    })
  })));
});
BarcodeMask.defaultProps = {
  width: 280,
  height: 230,
  edgeWidth: 20,
  edgeHeight: 20,
  edgeColor: '#fff',
  edgeBorderWidth: 4,
  edgeRadius: 0,
  backgroundColor: '#eee',
  maskOpacity: 1,
  animatedLineColor: '#fff',
  animatedLineOrientation: 'horizontal',
  animatedLineThickness: 2,
  animationDuration: 2000,
  runTimingFn: runTiming,
  showAnimatedLine: true
};
var styles = /*#__PURE__*/StyleSheet.create({
  container: /*#__PURE__*/_extends({
    alignItems: 'center',
    justifyContent: 'center'
  }, StyleSheet.absoluteFillObject),
  finder: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  maskOuter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  maskInner: {
    backgroundColor: 'transparent'
  },
  maskRow: {
    width: '100%'
  },
  maskCenter: {
    flexDirection: 'row',
    display: 'flex'
  },
  topLeft: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  bottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  animatedLine: {
    position: 'absolute',
    zIndex: 1
  }
});

var withOuterLayout = function withOuterLayout(WrappedComponent) {
  var _a;

  var displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  return _a = /*#__PURE__*/function (_PureComponent) {
    _inheritsLoose(ComponentWithOuterLayout, _PureComponent);

    function ComponentWithOuterLayout() {
      var _this;

      _this = _PureComponent.apply(this, arguments) || this;
      _this.state = {
        boundingRect: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }
      };

      _this.onOuterLayout = function (event) {
        var layout = event.nativeEvent.layout;

        _this.setState({
          boundingRect: layout
        });
      };

      return _this;
    }

    var _proto = ComponentWithOuterLayout.prototype;

    _proto.render = function render() {
      return React.createElement(WrappedComponent, Object.assign({
        outerBoundingRect: this.state.boundingRect,
        onOuterLayout: this.onOuterLayout
      }, this.props));
    };

    return ComponentWithOuterLayout;
  }(PureComponent), _a.displayName = "withOuterLayout" + displayName, _a;
};

/**
 * @internal
 * @param dataProcessor
 * @param onScannedData
 * @param customBarcodeRead
 */

var useBarcodeFinder = (function (dataProcessor, onScannedData, customBarcodeRead) {
  var _useState = useState(false),
      barcodeRead = _useState[0],
      setBarcodeRead = _useState[1];

  var _useReducer = useReducer(function (prev, action) {
    switch (action.type) {
      case 'SET':
        {
          return _extends({}, prev, {}, action.payload);
        }

      default:
        {
          return prev;
        }
    }
  }, {
    width: 0,
    height: 0,
    x: 0,
    y: 0
  }),
      state = _useReducer[0],
      dispatch = _useReducer[1];

  var _onBarcodeFinderLayoutChange = useCallback(function (event) {
    var _event$nativeEvent$la = event.nativeEvent.layout,
        height = _event$nativeEvent$la.height,
        width = _event$nativeEvent$la.width,
        x = _event$nativeEvent$la.x,
        y = _event$nativeEvent$la.y;
    dispatch({
      type: 'SET',
      payload: {
        height: height,
        width: width,
        x: x,
        y: y
      }
    });
  }, [state.height, state.width, state.x, state.y]);

  var timeoutId = 0;
  var processingReadBarcode;

  if (!customBarcodeRead || customBarcodeRead && typeof customBarcodeRead === 'number') {
    timeoutId && clearTimeout(timeoutId);

    processingReadBarcode = function processingReadBarcode(data) {
      setBarcodeRead(true);
      onScannedData(dataProcessor(data));
      timeoutId = setTimeout(function () {
        setBarcodeRead(false);
      }, customBarcodeRead);
    };
  } else {
    processingReadBarcode = function processingReadBarcode(data) {
      var _customBarcodeRead$be, _customBarcodeRead$af;

      customBarcodeRead === null || customBarcodeRead === void 0 ? void 0 : (_customBarcodeRead$be = customBarcodeRead.beforeScan) === null || _customBarcodeRead$be === void 0 ? void 0 : _customBarcodeRead$be.call(customBarcodeRead);
      onScannedData(dataProcessor(data));
      customBarcodeRead === null || customBarcodeRead === void 0 ? void 0 : (_customBarcodeRead$af = customBarcodeRead.afterScan) === null || _customBarcodeRead$af === void 0 ? void 0 : _customBarcodeRead$af.call(customBarcodeRead);
    };
  }

  return {
    barcodeRead: customBarcodeRead && typeof customBarcodeRead === 'object' ? null : barcodeRead,
    finderX: state.x,
    finderY: state.y,
    finderWidth: state.width,
    finderHeight: state.height,
    onBarcodeFinderLayoutChange: _onBarcodeFinderLayoutChange,
    processingReadBarcode: processingReadBarcode
  };
});

var useInternalBarcodeReadIOS = function useInternalBarcodeReadIOS(barcodeRead, isFocused, finderX, finderY, finderWidth, finderHeight, processingReadBarcode) {
  return useCallback(function (event) {
    if (!isFocused || barcodeRead) {
      return;
    }

    var _event$bounds = event.bounds,
        _event$bounds$origin = _event$bounds.origin,
        x = _event$bounds$origin.x,
        y = _event$bounds$origin.y,
        _event$bounds$size = _event$bounds.size,
        width = _event$bounds$size.width,
        height = _event$bounds$size.height;

    if (Number(x) >= finderX && Number(x) + Number(width) <= finderX + finderWidth && Number(y) >= finderY && Number(y) + Number(height) <= finderY + finderHeight) {
      return processingReadBarcode(event.data);
    }
  }, [barcodeRead, isFocused, finderX, finderY, finderWidth, finderHeight, processingReadBarcode]);
};

var useInternalBarcodeReadAndroid = function useInternalBarcodeReadAndroid(barcodeRead, isFocused, finderX, finderY, finderWidth, finderHeight, processingReadBarcode) {
  return useCallback(function (event) {
    if (!isFocused || barcodeRead) {
      return;
    }

    var _bounds = event.bounds;

    var _pointBounds = _bounds.origin.map(function (point) {
      return {
        x: Number(point.x) / PixelRatio.get(),
        y: Number(point.y) / PixelRatio.get()
      };
    });

    var _insideBox = function _insideBox(point) {
      var x = point.x,
          y = point.y;
      return x >= finderX && x <= finderX + finderWidth && y >= finderY && y <= finderY + finderHeight;
    };
    /**
     *  0 --------------- 2
     *  |  PDF417         |
     *  | /////////////// |
     *  1 --------------- 3
     */


    if (event.type === RNCamera.Constants.BarCodeType.pdf417) {
      var topLeft = _pointBounds[0],
          bottomLeft = _pointBounds[1],
          topRight = _pointBounds[2],
          bottomRight = _pointBounds[3];

      if (_insideBox(topLeft) && _insideBox(bottomLeft) && _insideBox(topRight) && _insideBox(bottomRight)) {
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
      var _bottomRight = _pointBounds[0],
          _bottomLeft = _pointBounds[1],
          _topLeft = _pointBounds[2],
          _topRight = _pointBounds[3];

      if (_insideBox(_bottomRight) && _insideBox(_bottomLeft) && _insideBox(_topLeft) && _insideBox(_topRight)) {
        processingReadBarcode(event.data);
        return;
      }
    }
  }, [barcodeRead, isFocused, finderX, finderY, finderWidth, finderHeight, processingReadBarcode]);
};

var useInternalBarcodeRead = /*#__PURE__*/Platform.select({
  android: useInternalBarcodeReadAndroid,
  ios: useInternalBarcodeReadIOS
});

var useBarcodeReadAndroid = (function (isFocused, dataProcessor, onScannedData, barcodeReadDelay) {
  if (barcodeReadDelay === void 0) {
    barcodeReadDelay = 500;
  }

  var _useBarcodeFinder = useBarcodeFinder(dataProcessor, onScannedData, barcodeReadDelay),
      barcodeRead = _useBarcodeFinder.barcodeRead,
      onBarcodeFinderLayoutChange = _useBarcodeFinder.onBarcodeFinderLayoutChange,
      finderY = _useBarcodeFinder.finderY,
      finderX = _useBarcodeFinder.finderX,
      finderWidth = _useBarcodeFinder.finderWidth,
      finderHeight = _useBarcodeFinder.finderHeight,
      processingReadBarcode = _useBarcodeFinder.processingReadBarcode;

  var onBarcodeRead = useInternalBarcodeRead(barcodeRead != null ? barcodeRead : false, isFocused, finderX, finderY, finderWidth, finderHeight, processingReadBarcode);
  return {
    barcodeRead: barcodeRead,
    onBarcodeRead: onBarcodeRead,
    onBarcodeFinderLayoutChange: onBarcodeFinderLayoutChange
  };
});

var useBarcodeReadIOS = (function (isFocused, dataProcessor, onScannedData, barcodeReadDelay) {
  if (barcodeReadDelay === void 0) {
    barcodeReadDelay = 500;
  }

  var _useBarcodeFinder = useBarcodeFinder(dataProcessor, onScannedData, barcodeReadDelay),
      barcodeRead = _useBarcodeFinder.barcodeRead,
      onBarcodeFinderLayoutChange = _useBarcodeFinder.onBarcodeFinderLayoutChange,
      finderY = _useBarcodeFinder.finderY,
      finderX = _useBarcodeFinder.finderX,
      finderWidth = _useBarcodeFinder.finderWidth,
      finderHeight = _useBarcodeFinder.finderHeight,
      processingReadBarcode = _useBarcodeFinder.processingReadBarcode;

  var onBarcodeRead = useInternalBarcodeRead(barcodeRead != null ? barcodeRead : false, isFocused, finderX, finderY, finderWidth, finderHeight, processingReadBarcode);
  return {
    barcodeRead: barcodeRead,
    onBarcodeRead: onBarcodeRead,
    onBarcodeFinderLayoutChange: onBarcodeFinderLayoutChange
  };
});

var useCustomBarcodeReadAndroid = (function (isFocused, dataProcessor, onScannedData, customBarcodeRead, customBarcodeReadCallback) {
  var _useBarcodeFinder = useBarcodeFinder(dataProcessor, onScannedData, customBarcodeRead),
      barcodeRead = _useBarcodeFinder.barcodeRead,
      onBarcodeFinderLayoutChange = _useBarcodeFinder.onBarcodeFinderLayoutChange,
      finderY = _useBarcodeFinder.finderY,
      finderX = _useBarcodeFinder.finderX,
      finderWidth = _useBarcodeFinder.finderWidth,
      finderHeight = _useBarcodeFinder.finderHeight,
      processingReadBarcode = _useBarcodeFinder.processingReadBarcode;

  return {
    barcodeRead: barcodeRead,
    onBarcodeRead: customBarcodeReadCallback ? customBarcodeReadCallback({
      x: finderX,
      y: finderY,
      width: finderWidth,
      height: finderHeight
    }, processingReadBarcode) : useInternalBarcodeRead(barcodeRead != null ? barcodeRead : false, isFocused, finderX, finderY, finderWidth, finderHeight, processingReadBarcode),
    onBarcodeFinderLayoutChange: onBarcodeFinderLayoutChange
  };
});

var useCustomBarcodeReadIOS = (function (isFocused, dataProcessor, onScannedData, customBarcodeRead, customBarcodeReadCallback) {
  var _useBarcodeFinder = useBarcodeFinder(dataProcessor, onScannedData, customBarcodeRead),
      barcodeRead = _useBarcodeFinder.barcodeRead,
      onBarcodeFinderLayoutChange = _useBarcodeFinder.onBarcodeFinderLayoutChange,
      finderHeight = _useBarcodeFinder.finderHeight,
      finderWidth = _useBarcodeFinder.finderWidth,
      finderX = _useBarcodeFinder.finderX,
      finderY = _useBarcodeFinder.finderY,
      processingReadBarcode = _useBarcodeFinder.processingReadBarcode;

  return {
    barcodeRead: barcodeRead,
    onBarcodeRead: customBarcodeReadCallback ? customBarcodeReadCallback({
      x: finderX,
      y: finderY,
      width: finderWidth,
      height: finderHeight
    }, processingReadBarcode) : useInternalBarcodeRead(barcodeRead != null ? barcodeRead : false, isFocused, finderX, finderY, finderWidth, finderHeight, processingReadBarcode),
    onBarcodeFinderLayoutChange: onBarcodeFinderLayoutChange
  };
});

var useBarcodeRead = /*#__PURE__*/Platform.select({
  android: useBarcodeReadAndroid,
  ios: useBarcodeReadIOS
});
var useCustomBarcodeRead = /*#__PURE__*/Platform.select({
  android: useCustomBarcodeReadAndroid,
  ios: useCustomBarcodeReadIOS
});
var BarcodeMaskWithOuterLayout = /*#__PURE__*/withOuterLayout(BarcodeMask);

export { BarcodeMask, BarcodeMaskWithOuterLayout, useBarcodeRead, useCustomBarcodeRead, withOuterLayout };
//# sourceMappingURL=react-native-barcode-mask.esm.js.map
