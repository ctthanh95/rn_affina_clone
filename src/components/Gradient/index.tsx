import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {vs, ms} from '@utils/responsive';

const Gradient = () => {
  return (
    <LinearGradient colors={['#0095ff', '#00B2FF']} style={styles.gradient} />
  );
};

export default Gradient;

const styles = StyleSheet.create({
  gradient: {
    backgroundColor: 'aqua',
    height: vs(124),
    borderBottomRightRadius: ms(72),
    borderBottomLeftRadius: ms(72),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
