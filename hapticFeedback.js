import {NativeModules} from 'react-native';

const linkingError = (err) => console.warn('Native Library ReactNativeHapticFeedback is not available', err);
export default class HapticFeedback {
  static trigger = async (options) => {
      try {
        return NativeModules.RNReactNativeHapticFeedback.trigger(options);
      } catch (err) {
          linkingError(err);
      }
  }

  static isHapticFeedbackAvailable = NativeModules.RNReactNativeHapticFeedback
}