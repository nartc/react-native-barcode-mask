import { LayoutChangeEvent } from 'react-native';
import { BoundingRect } from './BoundingRect';

export interface WithOuterLayoutProps {
  onOuterLayout?: (event: LayoutChangeEvent) => void;
  outerBoundingRect?: BoundingRect;
}
