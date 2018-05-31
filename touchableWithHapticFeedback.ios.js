import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import HapticFeedback from './hapticFeedback';

const DEFAULT_HAPTIC_TYPE = 'selection';
export default class TouchableWithHapticFeedback extends React.PureComponent {
  static defaultProps = {
    hapticType: DEFAULT_HAPTIC_TYPE,
    enableVibrateFallback: false,
    hapticOnPressIn: true,
    hapticOnPressOut: false,
    hapticOnPress: false,
  }

  pressAvailable = (func) => func && typeof func === 'function'
  
  onHaptic = (t: string) => {
    const {enableVibrateFallback, hapticType} = this.props;
    const type = t || hapticType

    HapticFeedback.trigger({
      type,
      enableVibrateFallback
    }).then().catch(err => console.log('DEBUG', err));
  }

  onPressIn = (event: any) => {
    const {
      onPressIn,
      hapticOnPressIn,
      hapticTypeOnPressIn
    } = this.props;

    if (hapticTypeOnPressIn) {
      this.onHaptic(hapticTypeOnPressIn)
    }

    if (this.pressAvailable(onPressIn)) {
      onPressIn(event);
    }
  }

  onPressOut = (event: any) => {
    const {
      onPressOut,
      hapticOnPressOut,
      hapticTypeOnPressOut
    } = this.props;

    if (hapticTypeOnPressOut) {
      this.onHaptic(hapticTypeOnPressOut)
    }

    if (this.pressAvailable(onPressOut)) {
      onPressOut(event);
    }
  }

  onPress = (event: any) => {
    const {
      onPress,
      hapticOnPress,
      hapticTypeOnPress
    } = this.props;

    if (hapticTypeOnPress) {
      this.onHaptic(hapticTypeOnPress)
    }

    if (this.pressAvailable(onPress)) {
      onPress(event);
    }
  }

  render() {
    const {children, ...otherProps} = this.props;

    return (
      <TouchableWithoutFeedback
        {...otherProps}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPress}
      >
        {children}
      </TouchableWithoutFeedback>
    )
  }
}