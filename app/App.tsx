/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-reanimated';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import PrimaryNavigation from './navigation/primary-navigation';
import {HeroesProvider} from './context/heroes-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <HeroesProvider>
        <PrimaryNavigation />
        <Toast ref={ref => Toast.setRef(ref)} />
      </HeroesProvider>
    </SafeAreaProvider>
  );
};

export default App;
