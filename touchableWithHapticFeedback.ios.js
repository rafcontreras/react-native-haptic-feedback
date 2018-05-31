import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import HapticFeedback from './hapticFeedback';

export default class TouchableWithHapticFeedback extends React.PureComponent {
  onPressIn = () => {
    const {
      onPressIn,
      hapticType,
      enableVibrateFallback
    } = this.props;

    HapticFeedback.trigger(hapticType, enableVibrateFallback)

    if (onPressIn && typeof onPressIn === 'function') {
      onPressIn();
    }
  }

  render() {
    const {children, ...otherProps} = this.props;

    return (
      <TouchableWithoutFeedback
        {...otherProps}
        onPressIn={this.onPressIn}
      >
        {children}
      </TouchableWithoutFeedback>
    )
  }
}