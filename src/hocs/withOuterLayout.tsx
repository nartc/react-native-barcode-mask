import React, { ComponentType, PureComponent } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { BoundingRect, Optionalize, WithOuterLayoutProps } from '../interfaces';

interface WithOuterLayoutHocState {
  boundingRect: BoundingRect;
}

export const withOuterLayout = <
  T extends WithOuterLayoutProps = WithOuterLayoutProps
>(
  WrappedComponent: ComponentType<T>
) => {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  return class ComponentWithOuterLayout extends PureComponent<
    Optionalize<T, WithOuterLayoutProps>,
    WithOuterLayoutHocState
  > {
    public static displayName = `withOuterLayout${displayName}`;

    state: WithOuterLayoutHocState = {
      boundingRect: { x: 0, y: 0, width: 0, height: 0 },
    };

    onOuterLayout = (event: LayoutChangeEvent): void => {
      const {
        nativeEvent: { layout },
      } = event;
      this.setState({ boundingRect: layout });
    };

    render() {
      return (
        <WrappedComponent
          outerBoundingRect={this.state.boundingRect}
          onOuterLayout={this.onOuterLayout}
          {...(this.props as T)}
        />
      );
    }
  };
};
