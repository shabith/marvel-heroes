import React from 'react';
import {
  Image,
  Text,
  View,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {useNavigation} from '@react-navigation/native';

import {Colors, Spacing, Typography} from '../config/theme';
import {HeroBasicInfo} from '../types/hero';
import {useHeroes} from '../context/heroes-context';

const HERO_ITEM: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  backgroundColor: Colors.listItem,
  padding: Spacing.small,
};

const HERO_ITEM_IMAGE: ImageStyle = {
  width: 100,
  height: 100,
};

const HERO_ITEM_CONTENT: ViewStyle = {
  marginLeft: Spacing.default,
  flex: 1,
};

const HERO_ITEM_NAME: TextStyle = {
  fontSize: Typography.fontSize.large,
  lineHeight: Typography.lineHeight.large,
  letterSpacing: 1,
  fontFamily: Typography.fontFamily.bebasNeue,
  color: Colors.primaryText,
  marginBottom: Spacing.xSmall,
};

const HERO_ITEM_DESCRIPTION: TextStyle = {
  fontSize: Typography.fontSize.small,
  lineHeight: Typography.lineHeight.small,
  fontFamily: Typography.fontFamily.robotoLight,
  color: Colors.primaryText,
  width: '100%',
};

type HeroListItemProps = {
  item: HeroBasicInfo;
};

const HeroListItem = ({item}: HeroListItemProps) => {
  const navigation = useNavigation();
  const {setHero} = useHeroes();
  const onPressHandler = (id: number) => {
    setHero(id);
    navigation.navigate('Detail');
  };

  return (
    <TouchableScale activeScale={0.98} onPress={() => onPressHandler(item.id)}>
      <View style={HERO_ITEM}>
        <Image
          style={HERO_ITEM_IMAGE}
          source={{uri: item.thumbnail}}
          resizeMode={'cover'}
        />
        <View style={HERO_ITEM_CONTENT}>
          <Text style={HERO_ITEM_NAME} adjustsFontSizeToFit numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={HERO_ITEM_DESCRIPTION} numberOfLines={4}>
            {item.description ? item.description : 'no description available.'}
          </Text>
        </View>
      </View>
    </TouchableScale>
  );
};

export default React.memo(HeroListItem);
