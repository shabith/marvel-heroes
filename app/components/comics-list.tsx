import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Text, TextStyle, View, ViewStyle} from 'react-native';
import Toast from 'react-native-toast-message';

import {Colors, Spacing, Typography} from '../config/theme';
import {Marvel} from '../services/marvel';
import {Comic} from '../types/comic';

import ComicListItem from './comic-list-item';
import ComicListSkeleton from './comic-list-skeleton';

type ComicListProps = {
  id: number;
};

const SEPARATOR: ViewStyle = {
  height: '100%',
  width: Spacing.default,
};

const COMICS_LIST: ViewStyle = {
  alignItems: 'center',
};

const EMPTY_LIST_TEXT: TextStyle = {
  fontSize: Typography.fontSize.medium,
  lineHeight: Typography.lineHeight.large,
  letterSpacing: 1.5,
  fontFamily: Typography.fontFamily.bebasNeue,
  color: Colors.primaryText,
  flex: 1,
  textAlign: 'center',
};

const EMPTY_LIST: ViewStyle = {
  backgroundColor: Colors.emptyList,
  width: '100%',
  padding: Spacing.default,
};

const EmptyList = () => (
  <View style={EMPTY_LIST}>
    <Text style={EMPTY_LIST_TEXT}>Sorry! no comics found.</Text>
  </View>
);

const ComicList = ({id}: ComicListProps) => {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [comics, setComics] = useState<Comic[]>([]);
  const firstTime = useRef(true);
  const isMounted = useRef(true);

  const separator = () => <View style={SEPARATOR} />;

  const limit = 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const {data} = await Marvel.getComics(id, offset, limit);
        if (data?.results && isMounted.current) {
          setOffset(data.offset);
          const newComics: Comic[] = data.results.map(
            (rawComic: any) =>
              ({
                id: rawComic.id,
                title: rawComic.title,
                price: rawComic.prices.find(
                  (price: {type: string}) => price.type === 'printPrice',
                ).price,
                thumbnail: `${rawComic.thumbnail.path.replace(
                  'http://',
                  'https://',
                )}.${rawComic.thumbnail.extension}`,
                detailUrl: rawComic.urls.find(
                  (url: {type: string; url: string}) => url.type === 'detail',
                ).url,
              } as Comic),
          );
          setComics(currentComics => [...currentComics, ...newComics]);
        }
      } catch (error) {
        if (__DEV__) {
          console.error(error);
        }
        Toast.show({
          position: 'bottom',
          type: 'error',
          text1: 'Trouble with connecting to the server',
          text2:
            'We are having trouble connecting to the Marvel server. Please try again later.',
        });
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };
    if (firstTime.current) {
      loadData();
      firstTime.current = false;
    }

    return () => {
      isMounted.current = false;
    };
  }, [id, offset]);
  return (
    <View style={COMICS_LIST}>
      {loading && comics.length === 0 ? (
        <ComicListSkeleton />
      ) : (
        <FlatList<Comic>
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={separator}
          ListEmptyComponent={<EmptyList />}
          horizontal
          data={comics}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <ComicListItem item={item} />}
        />
      )}
    </View>
  );
};

export default ComicList;
