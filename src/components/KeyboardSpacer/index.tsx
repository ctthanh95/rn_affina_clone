import {css} from '@emotion/native';
import {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  LayoutAnimationConfig,
  Platform,
  useWindowDimensions,
  View,
} from 'react-native';

const defaultAnimation: LayoutAnimationConfig = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
};

type Props = {
  // height current + height keyboard then / 2
  topSpacing?: number;
};

const KeyboardSpacer = ({topSpacing = 0}: Props) => {
  const {height: screenHeight} = useWindowDimensions();
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  const isIos = Platform.OS === 'ios';

  useEffect(() => {
    const updateKeyboardSpace = (event: KeyboardEvent) => {
      if (!event.endCoordinates) {
        return;
      }

      let animationConfig = defaultAnimation;
      if (isIos) {
        animationConfig = LayoutAnimation.create(
          event.duration,
          LayoutAnimation.Types[event.easing],
          LayoutAnimation.Properties.opacity,
        );
      }
      LayoutAnimation.configureNext(animationConfig);
      const calculateTopSpacing = isIos ? 0 : topSpacing;
      const keyboardSpace =
        screenHeight - event.endCoordinates.screenY - calculateTopSpacing;
      setKeyboardSpace(keyboardSpace);
    };

    const resetKeyboardSpace = (event: KeyboardEvent) => {
      let animationConfig = defaultAnimation;
      if (isIos) {
        animationConfig = LayoutAnimation.create(
          event.duration,
          LayoutAnimation.Types[event.easing],
          LayoutAnimation.Properties.opacity,
        );
      }
      LayoutAnimation.configureNext(animationConfig);

      setKeyboardSpace(0);
    };

    const updateListener = isIos ? 'keyboardWillShow' : 'keyboardDidShow';
    const resetListener = isIos ? 'keyboardWillHide' : 'keyboardDidHide';

    const listeners = [
      Keyboard.addListener(updateListener, updateKeyboardSpace),
      Keyboard.addListener(resetListener, resetKeyboardSpace),
    ];

    return () => {
      listeners.forEach(listener => listener.remove());
    };
  }, [screenHeight]);

  return (
    <View
      style={css({
        left: 0,
        right: 0,
        bottom: 0,
        height: keyboardSpace,
      })}
    />
  );
};

export default KeyboardSpacer;
