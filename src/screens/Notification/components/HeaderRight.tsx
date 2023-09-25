import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppText} from '@components';
import {PRIMARY} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';

type Props = {};

const HeaderRight = (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <AppText style={CONTENT.bold_16} color={PRIMARY}>
        Chọn
      </AppText>
    </TouchableOpacity>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});
