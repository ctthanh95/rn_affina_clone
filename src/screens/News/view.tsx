import React from 'react';
import {AppView, AuthInfomation, Container, AppTabs} from '@components';
import ListNews from './components/ListNews';
import {ms} from '@utils/responsive';

type Props = {
  dataTopic: any;
  dataNews: any;
  onSelectedTopic: (id: string) => void;
};

const View = ({dataTopic, dataNews, onSelectedTopic}: Props) => {
  const lengthDataTopic = dataTopic.length;
  return (
    <Container>
      <AuthInfomation />
      <>
        {lengthDataTopic ? (
          <AppView paddingHorizontal={ms(23)}>
            <AppTabs
              data={dataTopic}
              keyLabel="name"
              onPress={onSelectedTopic}
            />
          </AppView>
        ) : null}
      </>
      <AppView flex paddingLeft={ms(23)}>
        <ListNews data={dataNews} />
      </AppView>
    </Container>
  );
};

export default View;
