import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {NavigationContainer} from '@react-navigation/native';
import {StackCardInterpolationProps} from '@react-navigation/stack';

import HomeScreen from '../screens/home-screen';
import DetailScreen from '../screens/detail-screen';

export type RootStackParamList = {
  Home: undefined;
  List: undefined;
  Detail: {title: string; id: string};
};

const Stack = createSharedElementStackNavigator<RootStackParamList>();

const forFade = ({current}: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const PrimaryNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: forFade,
          gestureEnabled: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default PrimaryNavigation;
