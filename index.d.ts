import * as React from "react";
import * as ReactNative from "react-native";

declare module "react-native-haptic-feedback" {

  export type HapticFeedbackTypes = 
  "selection"
  | "impactLight"
  | "impactMedium"
  | "impactHeavy"
  | "notificationSuccess"
  | "notificationWarning"
  | "notificationError";

  export interface TouchableWithHapticFeedbackProps extends ReactNative.TouchableWithoutFeedbackProperties {
    hapticType?: HapticFeedbackTypes,
    enableVibrateFallback?: boolean;
    hapticOnPressIn?: boolean;
    hapticTypeOnPressIn?: HapticFeedbackTypes;
    hapticOnPressOut?: boolean;
    hapticTypeOnPressOut?: HapticFeedbackTypes;
    hapticOnPress?: boolean;
    hapticTypeOnPress?: HapticFeedbackTypes;
  }
  export class TouchableWithHapticFeedback extends React.Component<TouchableWithHapticFeedbackProps, any> { }

  export const HapticFeedback: {
    trigger(options: {
      type: HapticFeedbackTypes,
      enableVibrateFallback: boolean
    }): Promise<boolean | 'fallback'>;
    isHapticFeedbackAvailable: boolean;
  }

}