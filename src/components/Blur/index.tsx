import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';

type Props = {};

const Blur = (props: Props) => {
  return (
    <BlurView
      style={StyleSheet.absoluteFillObject}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
    />
  );
};

export default Blur;

const styles = StyleSheet.create({});
