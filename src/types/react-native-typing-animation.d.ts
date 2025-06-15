declare module "react-native-typing-animation" {
  import { ViewStyle } from "react-native";

  interface TypingAnimationProps {
    dotColor?: string;
    dotAmplitude?: number;
    dotSpeed?: number;
    dotRadius?: number;
    dotMargin?: number;
    style?: ViewStyle;
  }

  export const TypingAnimation: React.FC<TypingAnimationProps>;
}
