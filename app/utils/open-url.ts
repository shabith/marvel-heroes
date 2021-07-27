import {Linking} from 'react-native';

const openURL = async (url?: string) => {
  if (url) {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    }
  }
};

export {openURL};
