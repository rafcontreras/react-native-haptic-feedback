import {NativeModules} from 'react-native';

const linkingError = (err) => console.warn('Native Library ReactNativeHapticFeedback is not available', err);
export default class HapticFeedback {
  static trigger = (type = 'selection', enableVibrateFallback = false) => {
      try {
        NativeModules.RNReactNativeHapticFeedback.trigger(type, enableVibrateFallback);
      } catch (err) {
          linkingError(err);
      }
  }

  static isHapticFeedbackAvailable = () => {
    try {
      return NativeModules.RNReactNativeHapticFeedback.isHapticFeedbackAvailable();
    } catch (err) {
      linkingError(err);
      return false;
    }
  }
}