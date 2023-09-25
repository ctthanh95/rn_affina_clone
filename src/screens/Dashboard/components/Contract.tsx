import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppText, AppView} from '@components';
import {
  BACKGROUND,
  BLACK,
  LIGHT_BACKGROUND,
  PRIMARY,
  WHITE,
} from '@utils/colors';
import {ms, s} from '@utils/responsive';
import {CONTENT, LINK} from '@utils/fontStyle';
import {LINK as LINKSCREEN} from '@navigation/screens';

import {Manager, Structure} from '@utils/svg';
import {navigate} from '@navigation/RootNavigation';

type Props = {
  onBottomSheet: () => void;
};

type TItem = {
  icon: any;
  title: string;
  desciption: string;
  onPress: () => void;
};

const Item = ({icon, title, desciption, onPress}: TItem) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <AppView
        row
        alignCenter
        radius={ms(20)}
        marginTop={ms(12)}
        paddingHorizontal={ms(16)}
        paddingVertical={ms(12)}
        backgroundColor={LIGHT_BACKGROUND}>
        <AppView circle={s(52)} backgroundColor={WHITE} center>
          {icon}
        </AppView>
        <AppView marginLeft={ms(16)}>
          <AppText
            color={BLACK[100]}
            style={CONTENT.bold_16}
            marginBottom={ms(4)}>
            {title}
          </AppText>
          <AppText color={PRIMARY} style={LINK[12]}>
            {desciption}
          </AppText>
        </AppView>
      </AppView>
    </TouchableOpacity>
  );
};

const Contract = ({onBottomSheet}: Props) => {
  const handleStructure = () => {
    navigate(LINKSCREEN);
  };
  return (
    <AppView
      backgroundColor={WHITE}
      radius={ms(32)}
      padding={ms(20)}
      marginVertical={ms(16)}>
      <AppText color={PRIMARY} style={CONTENT.bold_20}>
        Nhóm của tôi
      </AppText>
      <Item
        icon={<Manager />}
        title="Thêm quản lý"
        desciption="Nhập mã giới thiệu"
        onPress={onBottomSheet}
      />
      <Item
        icon={<Structure />}
        title="Chưa có thành viên"
        desciption="Mời thành viên"
        onPress={handleStructure}
      />
    </AppView>
  );
};

export default Contract;

const styles = StyleSheet.create({});
