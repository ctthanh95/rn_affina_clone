import React from 'react';
import {StyleSheet} from 'react-native';
import {AppView, AppText} from '@components';
import {WHITE, LIGHT_BACKGROUND, BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';

type Props = {
  title: string;
  content: string;
  isWhite?: boolean;
};
const Item = ({title, content, isWhite = true}: Props) => (
  <AppView
    row
    paddingHorizontal={ms(12)}
    paddingVertical={ms(16)}
    backgroundColor={isWhite ? WHITE : LIGHT_BACKGROUND}>
    <AppView width={'30%'}>
      <AppText style={CONTENT.semibold_16} color={BLACK[50]}>
        {title}
      </AppText>
    </AppView>
    <AppView width={'70%'}>
      <AppText style={CONTENT.semibold_16} color={BLACK[100]}>
        {content}
      </AppText>
    </AppView>
  </AppView>
);

export default Item;

const styles = StyleSheet.create({});
