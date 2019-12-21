import { LayoutChangeEvent } from 'react-native';
import { BoundingRect } from './BoundingRect';

export interface WithOuterLayoutProps {
  /**
   * @internal
   * @param event
   */
  onOuterLayout?: (event: LayoutChangeEvent) => void;
  /**
   * @internal
   * @param event
   */
  outerBoundingRect?: BoundingRect;
}
