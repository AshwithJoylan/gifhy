import React from 'react';
import { AppNavigator } from '@navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Root } from '@components';
import { globalStyles, theme } from '@utils';
import { ThemeProvider } from '@slick-ui/core';
/**
 * App
 */
const App = () => {
  return (
    <GestureHandlerRootView style={globalStyles.container}>
      <SafeAreaProvider>
        <ThemeProvider {...{ theme }}>
          <Root>
            <AppNavigator />
          </Root>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
