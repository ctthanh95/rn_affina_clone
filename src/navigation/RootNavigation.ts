import React from 'react';
import {NavigationContainerRef, StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function push(name, params) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function replace(name: string, params?: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function reset(index, name) {
  navigationRef.current?.reset({
    index,
    routes: [{name}],
  });
}

export function pop(count) {
  navigationRef.current?.dispatch(StackActions.pop(count));
}
