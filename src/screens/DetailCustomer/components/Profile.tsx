import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppView, AppText} from '@components';
import {BLACK, LIGHT_BACKGROUND, PRIMARY, WHITE} from '@utils/colors';
import {CONTENT, TITLE} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Edit} from '@utils/svg';

type Props = {
  data: any;
  onUpdateCustomer: () => void;
};

const Item = ({item, index}: any) => (
  <AppView
    row
    paddingHorizontal={ms(12)}
    paddingVertical={ms(16)}
    backgroundColor={index % 2 == 0 ? WHITE : LIGHT_BACKGROUND}>
    <AppView width={'30%'}>
      <AppText style={CONTENT.semibold_16} color={BLACK[50]}>
        {item.label}
      </AppText>
    </AppView>
    <AppView width={'70%'}>
      <AppText style={CONTENT.semibold_16} color={BLACK[100]}>
        {item.value}
      </AppText>
    </AppView>
  </AppView>
);

const Profile = ({data, onUpdateCustomer}: Props) => {
  return (
    <>
      <AppView row alignCenter justifySpaceBetween marginVertical={ms(16)}>
        <AppText style={TITLE[20]} color={PRIMARY}>
          Thông tin Cá Nhân
        </AppText>
        <TouchableOpacity activeOpacity={0.9} onPress={onUpdateCustomer}>
          <Edit />
        </TouchableOpacity>
      </AppView>
      <AppView backgroundColor={WHITE} radius={ms(16)} overflow="hidden">
        {data.map((item: any, index: number) => (
          <Item item={item} key={index} index={index} />
        ))}
      </AppView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({});
