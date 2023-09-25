import React from 'react';
import {AppView, AppText} from '@components';
import {PRIMARY, BLACK, LIGHT_BACKGROUND} from '@utils/colors';
import {TITLE, CONTENT} from '@utils/fontStyle';
import {formatTime} from '@utils/global';
import {ms, s} from '@utils/responsive';
import {User} from '@utils/svg';

type Props = {
  name: string;
  createdAt: string;
};

const Info = ({name, createdAt}: Props) => {
  return (
    <AppView row alignCenter justifySpaceBetween marginVertical={ms(16)}>
      <AppView flex marginRight={ms(12)}>
        <AppText
          flexGrow
          style={TITLE[24]}
          color={PRIMARY}
          marginBottom={ms(4)}>
          {name}
        </AppText>
        <AppText style={CONTENT.semibold_12} color={BLACK[100]}>
          Tham gia ngày {formatTime(createdAt, 'date')}
        </AppText>
      </AppView>
      <AppView circle={s(64)} backgroundColor={LIGHT_BACKGROUND} center>
        <User width={s(36)} height={s(36)} />
      </AppView>
    </AppView>
  );
};

export default Info;
