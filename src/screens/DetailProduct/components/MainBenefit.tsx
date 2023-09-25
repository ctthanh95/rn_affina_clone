import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppText, AppView} from '@components';
import {CONTENT, TITLE} from '@utils/fontStyle';
import {BLACK} from '@utils/colors';
import Menu from './Menu';
import {ms} from '@utils/responsive';
import ListMainBenefit from './ListMainBenefit';

type Props = {
  menuSeleted: string;
  listProductInProgram: any;
  listProductMainBenefit: any;
  onDataFilter: (id: string) => void;
};

const MainBenefit = ({
  menuSeleted,
  listProductInProgram,
  listProductMainBenefit,
  onDataFilter,
}: Props) => {
  return (
    <AppView>
      <AppText style={TITLE[20]} color={BLACK[50]} marginBottom={ms(16)}>
        Quyền Lợi Chính
      </AppText>
      <Menu
        data={listProductInProgram}
        menuSeleted={menuSeleted}
        onMenuSelected={onDataFilter}
      />
      <ListMainBenefit data={listProductMainBenefit} />
    </AppView>
  );
};

export default MainBenefit;

const styles = StyleSheet.create({});
