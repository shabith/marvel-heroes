import React, {useEffect, useRef} from 'react';
import {View, FlatList, ViewStyle, TextStyle} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import {Text} from 'moti';

import {useHeroes} from '../context/heroes-context';
import {HeroBasicInfo} from '../types/hero';

import HeroListItem from './hero-list-item';
import HeroListSkeleton from './hero-list-skeleton';

import {Colors, Spacing, Typography} from '../config/theme';

const HERO_LIST_WRAPPER: ViewStyle = {
  marginVertical: Spacing.default,
  flex: 1,
};

const SEPARATOR: ViewStyle = {
  height: Spacing.default,
  width: '100%',
};

const EMPTY_LIST: ViewStyle = {
  backgroundColor: Colors.emptyList,
  width: '100%',
  padding: Spacing.default,
};

const EMPTY_LIST_TEXT: TextStyle = {
  fontSize: Typography.fontSize.large,
  lineHeight: Typography.lineHeight.large,
  letterSpacing: 1.5,
  fontFamily: Typography.fontFamily.bebasNeue,
  color: Colors.primaryText,
  flex: 1,
  textAlign: 'center',
};

const LIST_FOOTER: ViewStyle = {
  width: '100%',
  marginTop: Spacing.default,
};

const separator = () => <View style={SEPARATOR} />;

const ListFooter = () => (
  <View style={LIST_FOOTER}>
    <DotIndicator size={5} color={Colors.gray200} />
  </View>
);

const EmptyList = () => (
  <View style={EMPTY_LIST}>
    <Text style={EMPTY_LIST_TEXT}>Sorry! no heroes found.</Text>
  </View>
);

const HerosList = () => {
  const list = useRef<FlatList | null>(null);
  const {loading, heroes, loadMore, isFiltering} = useHeroes();

  const onEndReached = () => {
    !loading && !isFiltering && loadMore();
  };

  useEffect(() => {
    if (isFiltering) {
      if (list.current) {
        list.current.scrollToIndex({index: 0});
      }
    }
  }, [isFiltering]);

  return (
    <View style={HERO_LIST_WRAPPER}>
      {loading && heroes.length === 0 ? (
        <HeroListSkeleton />
      ) : (
        <FlatList<HeroBasicInfo>
          ref={ref => (list.current = ref)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={separator}
          ListEmptyComponent={<EmptyList />}
          ListFooterComponent={!isFiltering ? <ListFooter /> : null}
          data={heroes}
          keyExtractor={item => `${item.id}`}
          onEndReachedThreshold={0}
          onEndReached={() => onEndReached()}
          renderItem={({item}) => <HeroListItem item={item} />}
        />
      )}
    </View>
  );
};

export default HerosList;
