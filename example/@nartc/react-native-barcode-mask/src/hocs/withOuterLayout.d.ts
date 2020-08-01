import React, { ComponentType } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { BoundingRect, WithOuterLayoutProps } from '../interfaces';
export interface WithOuterLayoutHocState {
    boundingRect: BoundingRect;
}
export declare const withOuterLayout: <T extends WithOuterLayoutProps = WithOuterLayoutProps>(WrappedComponent: React.ComponentType<T>) => {
    new (props: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>): {
        state: WithOuterLayoutHocState;
        onOuterLayout: (event: LayoutChangeEvent) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "boundingRect">(state: WithOuterLayoutHocState | ((prevState: Readonly<WithOuterLayoutHocState>, props: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>) => WithOuterLayoutHocState | Pick<WithOuterLayoutHocState, K> | null) | Pick<WithOuterLayoutHocState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, nextState: Readonly<WithOuterLayoutHocState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, prevState: Readonly<WithOuterLayoutHocState>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, prevState: Readonly<WithOuterLayoutHocState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, nextState: Readonly<WithOuterLayoutHocState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, nextState: Readonly<WithOuterLayoutHocState>, nextContext: any): void;
    };
    new (props: Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>, context?: any): {
        state: WithOuterLayoutHocState;
        onOuterLayout: (event: LayoutChangeEvent) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends "boundingRect">(state: WithOuterLayoutHocState | ((prevState: Readonly<WithOuterLayoutHocState>, props: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>) => WithOuterLayoutHocState | Pick<WithOuterLayoutHocState, K> | null) | Pick<WithOuterLayoutHocState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, nextState: Readonly<WithOuterLayoutHocState>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, prevState: Readonly<WithOuterLayoutHocState>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, prevState: Readonly<WithOuterLayoutHocState>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, nextState: Readonly<WithOuterLayoutHocState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<T, Exclude<keyof T, "onOuterLayout" | "outerBoundingRect">>>, nextState: Readonly<WithOuterLayoutHocState>, nextContext: any): void;
    };
    displayName: string;
    contextType?: React.Context<any> | undefined;
};
