import React from 'react';
import AppView from '../AppView';
import AppText from '../AppText';
import {BLACK, PRIMARY} from '@utils/colors';
import {CONTENT, HEADING} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
type Props = {
  title: string;
  description?: string | undefined;
};

const PublicTitle = ({title, description}: Props) => {
  return (
    <AppView marginBottom={ms(32)}>
      <AppText color={PRIMARY} style={HEADING[40]} marginBottom={ms(8)}>
        {title}
      </AppText>
      {description ? (
        <AppText color={BLACK[100]} style={CONTENT.medium_16}>
          {description}
        </AppText>
      ) : null}
    </AppView>
  );
};

export default PublicTitle;
