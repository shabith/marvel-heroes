import React, {useState, useEffect} from 'react';
import {View, ViewStyle, TextInput, TextStyle} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {
  View as MotiView,
  AnimatePresence,
  motify,
  useAnimationState,
} from 'moti';
import {useNavigation} from '@react-navigation/native';

import Logo from '../components/logo';
import {Colors, Spacing, Typography} from '../config/theme';
import {useHeroes} from '../context/heroes-context';

import SearchIcon from './search-icon';
import ClearIcon from './clear-icon';
import BackIcon from './back-icon';

const MotiTouchableScale = motify(TouchableScale)();

const HEADER: ViewStyle = {
  flexDirection: 'row',
  height: 80,
};

const LOGO_WRAPPER: ViewStyle = {
  paddingLeft: 0,
  width: '40%',
  maxWidth: 200,
};

const LOGO_WRAPPER_CENTERED: ViewStyle = {
  width: '100%',
  flexGrow: 1,
  // just to unset maxWidth
  maxWidth: 2000,
};

const SEARCH_WRAPPER: ViewStyle = {
  flexGrow: 1,
  alignItems: 'flex-end',
  alignSelf: 'center',
  paddingLeft: Spacing.default,
};

const SEARCH_WRAPPER_CENTERED: ViewStyle = {
  flexGrow: 0,
  width: 0,
};

const SEARCH_BOX: ViewStyle = {
  flexDirection: 'row',
  paddingVertical: Spacing.small,
  paddingHorizontal: Spacing.default,
  borderRadius: 25,
  backgroundColor: Colors.gray200,
  width: '100%',
};

const SEARCH_INPUT: TextStyle = {
  fontFamily: Typography.fontFamily.roboto,
  color: Colors.black,
  fontSize: Typography.fontSize.medium,
  lineHeight: Typography.lineHeight.medium,
  height: Typography.lineHeight.medium,
  padding: 0,
};

const SEARCH_BUTTON: ViewStyle = {
  width: 45,
  height: 45,
  justifyContent: 'center',
  alignItems: 'center',
};

const CLEAR_BUTTON: ViewStyle = {
  width: 45,
  height: 45,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 0,
};

const HEADER_GO_BACK: ViewStyle = {
  top: '50%',
  transform: [{translateY: -23}],
  position: 'absolute',
  zIndex: 1,
};

type HeaderProps = {
  isDetailView?: boolean;
};

const Header = ({isDetailView = false}: HeaderProps) => {
  const navigation = useNavigation();
  const {filterHeroes, clearSearch} = useHeroes();
  const [showSearch, setShowSearch] = useState(false);
  const logoAnimationState = useAnimationState({
    shrink: {
      width: '25%',
    },
    expand: {
      width: '40%',
    },
  });
  const searchBoxAnimationState = useAnimationState({
    shrink: {
      width: '75%',
    },
    expand: {
      width: '0%',
    },
  });

  const toggleSearchBlock = () => {
    setShowSearch(currentState => {
      const newState = !currentState;
      if (!newState) {
        clearSearch();
      }
      return newState;
    });
  };

  useEffect(() => {
    logoAnimationState.transitionTo(showSearch ? 'shrink' : 'expand');
    searchBoxAnimationState.transitionTo(showSearch ? 'shrink' : 'expand');
  }, [logoAnimationState, showSearch, searchBoxAnimationState]);

  return (
    <View style={HEADER}>
      {isDetailView ? (
        <View style={HEADER_GO_BACK}>
          <AnimatePresence>
            <MotiTouchableScale
              from={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{type: 'timing', duration: 500}}
              style={SEARCH_BUTTON}
              onPress={() => navigation.navigate('Home')}>
              <BackIcon fill={Colors.black} width={20} height={20} />
            </MotiTouchableScale>
          </AnimatePresence>
        </View>
      ) : null}
      <MotiView
        state={logoAnimationState}
        transition={{type: 'spring'}}
        style={[LOGO_WRAPPER, isDetailView ? LOGO_WRAPPER_CENTERED : null]}>
        <Logo width="100%" height="100%" />
      </MotiView>
      <AnimatePresence>
        {!isDetailView ? (
          <MotiView
            style={[
              SEARCH_WRAPPER,
              isDetailView ? SEARCH_WRAPPER_CENTERED : null,
            ]}
            state={searchBoxAnimationState}
            exit={{opacity: 0}}
            transition={{type: 'timing', duration: 500}}>
            {!showSearch ? (
              <>
                <MotiTouchableScale
                  from={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{type: 'timing', duration: 500}}
                  style={SEARCH_BUTTON}
                  onPress={toggleSearchBlock}>
                  <SearchIcon fill={Colors.black} width={20} height={20} />
                </MotiTouchableScale>
              </>
            ) : (
              <MotiView
                style={SEARCH_BOX}
                from={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{
                  opacity: 0,
                }}
                transition={{type: 'timing', duration: 500}}>
                <TextInput
                  style={SEARCH_INPUT}
                  placeholderTextColor={Colors.gray600}
                  placeholder="Search for your hero"
                  onChangeText={filterHeroes}
                  autoFocus
                />
                <TouchableScale
                  style={CLEAR_BUTTON}
                  onPress={toggleSearchBlock}>
                  <ClearIcon fill={Colors.black} width={20} height={20} />
                </TouchableScale>
              </MotiView>
            )}
          </MotiView>
        ) : null}
      </AnimatePresence>
    </View>
  );
};

export default Header;
