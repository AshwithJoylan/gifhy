import React, { FC, memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppScreens, globalStyles } from '@utils';
import { Home } from '@screens';
import { useColors } from '@slick-ui/core';
import { StatusBar } from 'react-native';

const AppStack = createStackNavigator();

/**
 * AppNavigator
 */
const AppNavigator: FC = memo(() => {
  const colors = useColors();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#00000050" barStyle="light-content" />
      <AppStack.Navigator
        screenOptions={{
          headerTintColor: colors.darkText,
          headerMode: 'float',
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: globalStyles.headerTitleStyle,
          cardStyle: { backgroundColor: colors.background },
        }}>
        <AppStack.Screen
          options={{ title: AppScreens.HOME.title, headerShown: false }}
          name={AppScreens.HOME.name}
          component={Home}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;
