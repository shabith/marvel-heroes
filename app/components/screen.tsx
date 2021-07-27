import React from 'react';
import {KeyboardAvoidingView, Platform, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Colors} from '../config/theme';

type ScreenProps = {
  style?: ViewStyle;
};

const SCREEN: ViewStyle = {
  backgroundColor: Colors.white,
  flex: 1,
  padding: 15,
  paddingBottom: 0,
};

const SCREEN_INNER: ViewStyle = {
  flex: 1,
};

const Screen: React.FC<ScreenProps> = ({children, style}) => {
  return (
    <SafeAreaView style={[SCREEN, style]}>
      <KeyboardAvoidingView
        style={SCREEN_INNER}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Screen;
