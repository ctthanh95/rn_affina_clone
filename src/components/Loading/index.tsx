import React from 'react';
import {ActivityIndicator} from 'react-native';
import AppView from '../AppView';
import {BLACK, PRIMARY} from '@utils/colors';

type Props = {};

const Loading = (props: Props) => {
  return (
    <AppView flex center backgroundColor={BLACK[50]} absoluteFull>
      <ActivityIndicator size="large" color={PRIMARY} />
    </AppView>
  );
};

export default Loading;
