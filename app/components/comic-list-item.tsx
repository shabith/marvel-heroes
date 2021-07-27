import React from 'react';
import {
  View,
  Text,
  Image,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

import {Colors, Spacing, Typography} from '../config/theme';
import {Comic} from '../types/comic';
import {openURL} from '../utils/open-url';

type ComicListItemProps = {
  item: Comic;
};

const COMIC_ITEM: ViewStyle = {
  width: 130,
};

const COMIC_ITEM_IMAGE: ImageStyle = {
  width: 130,
  height: 200,
  backgroundColor: Colors.gray100,
};

const COMIC_ITEM_TITLE: TextStyle = {
  fontSize: Typography.fontSize.small,
  lineHeight: Typography.lineHeight.small,
  fontFamily: Typography.fontFamily.robotoLight,
  color: Colors.primaryText,
  marginTop: Spacing.small,
  marginBottom: Spacing.xSmall,
  textAlign: 'center',
};

const COMIC_ITEM_YEAR: TextStyle = {
  fontSize: Typography.fontSize.small,
  lineHeight: Typography.lineHeight.small,
  fontFamily: Typography.fontFamily.robotoLight,
  color: Colors.gray500,
  textAlign: 'center',
};

const ComicListItem = ({item}: ComicListItemProps) => {
  return (
    <TouchableScale activeScale={0.98} onPress={() => openURL(item.detailUrl)}>
      <View style={COMIC_ITEM}>
        <Image
          style={COMIC_ITEM_IMAGE}
          source={{uri: item.thumbnail}}
          resizeMode={'contain'}
        />
        <Text style={COMIC_ITEM_TITLE}>{item.title}</Text>
        <Text style={COMIC_ITEM_YEAR}>USD {item.price}</Text>
      </View>
    </TouchableScale>
  );
};
export default ComicListItem;
