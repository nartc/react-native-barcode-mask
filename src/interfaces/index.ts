export * from './BarcodeRead';
export * from './WithOuterLayout';
export * from './BoundingRect';

export type Optionalize<T extends K, K> = Omit<T, keyof K>;
