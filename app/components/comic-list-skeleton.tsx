import React, {Component} from 'react';
import {View, ViewStyle} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import {Spacing} from '../config/theme';

const SKELETON_OUTER_WRAPPER: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
};

const SKELETON_CONTENT_WRAPPER: ViewStyle = {
  paddingRight: Spacing.default,
};

const SKELETON_WRAPPER: ViewStyle = {
  flexDirection: 'row',
};

export class ComicListSkeleton extends Component {
  render() {
    return (
      <View style={SKELETON_OUTER_WRAPPER}>
        {new Array(5).fill(undefined).map((_, index) => (
          <View style={SKELETON_WRAPPER} key={index}>
            <SkeletonContent
              containerStyle={SKELETON_CONTENT_WRAPPER}
              animationDirection="horizontalLeft"
              layout={[
                {
                  flexDirection: 'row',
                  height: 200,
                  width: 130,
                  marginBottom: Spacing.small,
                },
                {
                  width: 130,
                  height: 15,
                  marginBottom: Spacing.small,
                },
                {
                  width: 130,
                  height: 15,
                  marginBottom: Spacing.small,
                },
                {
                  width: 130,
                  height: 10,
                  marginBottom: Spacing.small,
                },
              ]}
              isLoading={true}
            />
          </View>
        ))}
      </View>
    );
  }
}

export default ComicListSkeleton;
