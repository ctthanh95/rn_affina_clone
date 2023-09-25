import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Scan} from '@utils/svg';
import {navigate} from '@navigation/RootNavigation';
import {SCAN} from '@navigation/screens';

type Props = {};

const HeaderRight = (props: Props) => {
  const handleScan = () => {
    navigate(SCAN);
  };
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleScan}>
      <Scan />
    </TouchableOpacity>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({});
