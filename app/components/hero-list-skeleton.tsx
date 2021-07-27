import React from 'react';
import {View, ViewStyle} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import {Colors, Spacing} from '../config/theme';

const SKELETON_CONTENT_WRAPPER: ViewStyle = {
  flex: 1,
  width: '100%',
};

const SKELETON_WRAPPER: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  backgroundColor: Colors.listItem,
  padding: Spacing.small,
  marginBottom: 22,
};

const HeroListSkeleton = () => {
  return (
    <View>
      {new Array(5).fill(undefined).map((_, index) => (
        <View style={SKELETON_WRAPPER} key={index}>
          <SkeletonContent
            containerStyle={SKELETON_CONTENT_WRAPPER}
            animationDirection="horizontalLeft"
            layout={[
              {
                flexDirection: 'row',
                height: 100,
                width: '100%',
                children: [
                  {
                    width: 100,
                    height: 100,
                  },
                  {
                    flexDirection: 'column',
                    flex: 1,
                    marginLeft: Spacing.default,
                    children: [
                      {
                        width: '60%',
                        height: 25,
                        marginBottom: Spacing.small,
                      },
                      {
                        width: '100%',
                        height: 12,
                        marginBottom: Spacing.small,
                      },
                      {
                        width: '100%',
                        height: 12,
                        marginBottom: Spacing.small,
                      },
                      {
                        width: '100%',
                        height: 12,
                        marginBottom: Spacing.small,
                      },
                    ],
                  },
                ],
              },
            ]}
            isLoading={true}
          />
        </View>
      ))}
    </View>
  );
};

export default HeroListSkeleton;
