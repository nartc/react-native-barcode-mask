import { Reducer, useCallback, useReducer, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { BoundingRect, CustomBarcodeRead } from '../interfaces';

/**
 * @internal
 * @param dataProcessor
 * @param onScannedData
 * @param customBarcodeRead
 */
export default (
  dataProcessor: (data: string) => string,
  onScannedData: (processed: string) => void,
  customBarcodeRead?: CustomBarcodeRead | number
) => {
  const [barcodeRead, setBarcodeRead] = useState(false);
  const [state, dispatch] = useReducer<
    Reducer<
      BoundingRect,
      {
        type: 'SET';
        payload: BoundingRect;
      }
    >
  >(
    (prev, action) => {
      switch (action.type) {
        case 'SET': {
          return { ...prev, ...action.payload };
        }
        default: {
          return prev;
        }
      }
    },
    {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    }
  );
  const _onBarcodeFinderLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      const {
        nativeEvent: {
          layout: { height, width, x, y },
        },
      } = event;
      dispatch({ type: 'SET', payload: { height, width, x, y } });
    },
    [state.height, state.width, state.x, state.y]
  );

  let timeoutId: null | ReturnType<typeof setTimeout> = null
  let processingReadBarcode: (data: string) => void;

  if (
    !customBarcodeRead ||
    (customBarcodeRead && typeof customBarcodeRead === 'number')
  ) {
    timeoutId && clearTimeout(timeoutId);
    processingReadBarcode = data => {
      setBarcodeRead(true);
      onScannedData(dataProcessor(data));
      timeoutId = setTimeout(() => {
        setBarcodeRead(false);
      }, customBarcodeRead);
    };
  } else {
    processingReadBarcode = data => {
      (customBarcodeRead as CustomBarcodeRead)?.beforeScan?.();
      onScannedData(dataProcessor(data));
      (customBarcodeRead as CustomBarcodeRead)?.afterScan?.();
    };
  }

  return {
    barcodeRead:
      customBarcodeRead && typeof customBarcodeRead === 'object'
        ? null
        : barcodeRead,
    finderX: state.x,
    finderY: state.y,
    finderWidth: state.width,
    finderHeight: state.height,
    onBarcodeFinderLayoutChange: _onBarcodeFinderLayoutChange,
    processingReadBarcode,
  };
};
