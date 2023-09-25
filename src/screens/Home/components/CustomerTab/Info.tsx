import React from 'react';
import {StyleSheet} from 'react-native';
import {AppView, AppText} from '@components';
import {BLACK, LIGHT_BACKGROUND, WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {formatTime} from '@utils/global';
import {ms, s} from '@utils/responsive';
import {User} from '@utils/svg';

type Props = {
  name: string;
  createdAt: string;
  color: string | undefined;
  title: string | undefined;
};

const Info = ({name, createdAt, color, title}: Props) => (
  <AppView style={styles.container}>
    <AppView>
      <AppText style={CONTENT.bold_16} color={BLACK[100]}>
        {name}
      </AppText>
      <AppText
        style={CONTENT.semibold_12}
        color={BLACK[100]}
        marginTop={ms(4)}
        marginBottom={ms(12)}>
        Tham gia ngày {formatTime(createdAt, 'date')}
      </AppText>
      <AppView
        alignSelf="flex-start"
        radius={ms(16)}
        paddingHorizontal={ms(12)}
        paddingVertical={ms(4)}
        backgroundColor={color}>
        <AppText style={CONTENT.semibold_12} color={WHITE}>
          {title}
        </AppText>
      </AppView>
    </AppView>
    <AppView circle={s(64)} backgroundColor={LIGHT_BACKGROUND} center>
      <User width={s(36)} height={s(36)} />
    </AppView>
  </AppView>
);

export default Info;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    padding: ms(12),
    borderTopLeftRadius: ms(20),
    borderTopRightRadius: ms(20),
  },
});
