import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AppView, AppText} from '@components';
import {WHITE, BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Edit} from '@utils/svg';

type Props = {};

const Agent = (props: Props) => {
  return (
    <AppView
      row
      alignCenter
      justifySpaceBetween
      backgroundColor={WHITE}
      padding={ms(12)}
      radius={ms(20)}>
      <AppView>
        <AppText
          style={CONTENT.bold_12}
          color={BLACK[100]}
          marginBottom={ms(8)}>
          Phụ trách chính bởi
        </AppText>
        <AppText style={CONTENT.bold_16} color={BLACK[100]}>
          Phụ trách chính bởi
        </AppText>
      </AppView>
      <TouchableOpacity activeOpacity={0.9}>
        <Edit />
      </TouchableOpacity>
    </AppView>
  );
};

export default Agent;
