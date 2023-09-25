import React from 'react';
import AppText from '../AppText';
import AppView from '../AppView';
import {BLACK} from '@utils/colors';
import {ms} from '@utils/responsive';

const Empty = () => {
  return (
    <AppView center marginVertical={ms(12)}>
      <AppText color={BLACK[30]}>Không tìm thấy kết quả phù hợp!</AppText>
    </AppView>
  );
};

export default Empty;
