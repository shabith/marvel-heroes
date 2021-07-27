import React from 'react';
import {
  Image,
  ImageStyle,
  ScrollView,
  TextStyle,
  ViewStyle,
  Text,
} from 'react-native';
import {MotiView, Text as MotiText, motify} from 'moti';
import TouchableScale from 'react-native-touchable-scale';
import {format} from 'date-fns';

import Header from '../components/header';
import Screen from '../components/screen';
import {Colors, Spacing, Typography} from '../config/theme';
import {useHeroes} from '../context/heroes-context';
import ComicList from '../components/comics-list';
import AppearanceGraph from '../components/appearance-graph';
import {openURL} from '../utils/open-url';

const MotiTouchableScale = motify(TouchableScale)();

const SECTION_TITLE: TextStyle = {
  fontSize: Typography.fontSize.xxLarge,
  fontFamily: Typography.fontFamily.bebasNeue,
};

const SECTION_SECONDARY_TITLE: TextStyle = {
  fontSize: Typography.fontSize.xLarge,
  fontFamily: Typography.fontFamily.bebasNeue,
  marginBottom: Spacing.small,
};

const SECTION_DATE: TextStyle = {
  fontSize: Typography.fontSize.small,
  fontFamily: Typography.fontFamily.robotoLight,
  color: Colors.gray400,
  marginBottom: Spacing.default,
};

const SECTION_WRAPPER: ViewStyle = {
  width: '100%',
  marginVertical: Spacing.default,
  flex: 1,
};

const SECTION_IMAGE: ImageStyle = {
  width: '100%',
  height: 250,
  marginBottom: Spacing.default,
  backgroundColor: Colors.gray100,
};

const SECTION_DETAILS: TextStyle = {
  fontSize: Typography.fontSize.default,
  fontFamily: Typography.fontFamily.robotoLight,
  lineHeight: Typography.lineHeight.medium,
  marginBottom: Spacing.medium,
};

const SECTION_COMICS_WRAPPER: ViewStyle = {
  marginBottom: Spacing.medium,
};

const FIND_OUT_MORE_BUTTON: ViewStyle = {
  borderRadius: 5,
  paddingVertical: Spacing.small,
  paddingHorizontal: Spacing.medium,
  backgroundColor: Colors.primary,
  marginBottom: Spacing.medium,
  alignSelf: 'flex-start',
};

const FIND_OUT_MORE_BUTTON_TEXT: TextStyle = {
  color: Colors.white,
  fontFamily: Typography.fontFamily.roboto,
  fontSize: Typography.fontSize.small,
};

const DetailScreen = () => {
  const {hero} = useHeroes();

  return hero ? (
    <Screen>
      <Header isDetailView={true} />
      <ScrollView
        style={SECTION_WRAPPER}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: hero.thumbnail}}
          resizeMode="cover"
          style={SECTION_IMAGE}
        />
        <MotiText
          from={{translateY: 30, opacity: 0}}
          animate={{translateY: 0, opacity: 1}}
          transition={{type: 'spring', delay: 0}}
          style={SECTION_TITLE}>
          {hero.name}
        </MotiText>
        <MotiText
          from={{translateY: 30, opacity: 0}}
          animate={{translateY: 0, opacity: 1}}
          transition={{type: 'spring', delay: 100}}
          style={SECTION_DATE}>
          Last updated At: {format(hero.date, 'dd/MM/yyyy HH:MM aa')}
        </MotiText>
        <MotiText
          from={{translateY: 30, opacity: 0}}
          animate={{translateY: 0, opacity: 1}}
          transition={{type: 'spring', delay: 200}}
          style={SECTION_DETAILS}>
          {hero.description ? hero.description : 'no description available.'}
        </MotiText>
        {hero.detailUrl ? (
          <MotiTouchableScale
            activeScale={0.98}
            onPress={() => openURL(hero.detailUrl)}
            from={{translateY: 30, opacity: 0}}
            animate={{translateY: 0, opacity: 1}}
            style={FIND_OUT_MORE_BUTTON}
            transition={{type: 'spring', delay: 300}}>
            <Text style={FIND_OUT_MORE_BUTTON_TEXT}>Find out more</Text>
          </MotiTouchableScale>
        ) : null}
        <MotiText
          from={{translateY: 30, opacity: 0}}
          animate={{translateY: 0, opacity: 1}}
          transition={{type: 'spring', delay: 400}}
          style={SECTION_SECONDARY_TITLE}>
          Latest Comics
        </MotiText>
        <MotiView
          from={{translateY: 30, opacity: 0}}
          animate={{translateY: 0, opacity: 1}}
          transition={{type: 'spring', delay: 500}}
          style={SECTION_COMICS_WRAPPER}>
          <ComicList id={hero.id} />
        </MotiView>
        <MotiText
          from={{translateY: 30, opacity: 0}}
          animate={{translateY: 0, opacity: 1}}
          transition={{type: 'spring', delay: 600}}
          style={SECTION_SECONDARY_TITLE}>
          Appearance In Last Decade
        </MotiText>
        <MotiView
          from={{translateY: 30, opacity: 0}}
          animate={{translateY: 0, opacity: 1}}
          transition={{type: 'spring', delay: 700}}
          style={SECTION_COMICS_WRAPPER}>
          <AppearanceGraph id={hero.id} />
        </MotiView>
      </ScrollView>
    </Screen>
  ) : null;
};

export default DetailScreen;
