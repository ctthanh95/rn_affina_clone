import React from 'react';
import {StyleSheet} from 'react-native';
import {AppTabs, AppText, AppView} from '@components';
import {TITLE} from '@utils/fontStyle';
import {BLACK} from '@utils/colors';
import {ms} from '@utils/responsive';
import ListMainBenefit from './ListMainBenefit';

type Props = {
  listProductInProgram: any;
  listProductMainBenefit: any;
  onDataFilter: (id: string) => void;
};

const MainBenefit = ({
  listProductInProgram,
  listProductMainBenefit,
  onDataFilter,
}: Props) => {
  return (
    <AppView>
      <AppText style={TITLE[20]} color={BLACK[50]} marginBottom={ms(16)}>
        Quyền Lợi Chính
      </AppText>
      <AppTabs
        data={listProductInProgram}
        keyLabel="packageName"
        onPress={onDataFilter}
      />
      <ListMainBenefit data={listProductMainBenefit} />
    </AppView>
  );
};

export default MainBenefit;

const styles = StyleSheet.create({});
