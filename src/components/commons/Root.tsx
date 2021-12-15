import React, { FC, memo } from 'react';
import { View } from 'react-native';
import ToastComponent, { ToastInterface } from './Toast';
import { globalStyles } from '@utils';

let Toast: ToastInterface | null;

/**
 * Root
 */
const Root: FC<{ children: any }> = ({ children }) => {
  return (
    <View style={globalStyles.container}>
      {children}
      <ToastComponent
        ref={ref => {
          Toast = ref;
        }}
      />
    </View>
  );
};

export { Toast };

export default memo(Root);
