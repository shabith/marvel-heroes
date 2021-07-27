import React from 'react';

import Header from '../components/header';
import HerosList from '../components/heroes-list';
import Screen from '../components/screen';

const HomeScreen = () => {
  return (
    <Screen>
      <Header />
      <HerosList />
    </Screen>
  );
};

export default HomeScreen;
