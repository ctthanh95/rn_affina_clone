import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AppView, AppText} from '@components';
import {WHITE, BLACK, LIGHT_BACKGROUND} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms, s} from '@utils/responsive';
import {Edit, User} from '@utils/svg';

type Props = {
  saleName: string;
};

const Agent = ({saleName}: Props) => {
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
          {saleName}
        </AppText>
      </AppView>
      <AppView circle={s(64)} backgroundColor={LIGHT_BACKGROUND} center>
        <User width={s(36)} height={s(36)} />
      </AppView>
      {/* <TouchableOpacity activeOpacity={0.9}>
        <Edit />
      </TouchableOpacity> */}
    </AppView>
  );
};

export default Agent;
