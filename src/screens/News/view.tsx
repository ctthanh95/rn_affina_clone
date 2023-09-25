import React, {useEffect, useState} from 'react';
import {AppView, AuthInfomation, Container, Empty, Tab} from '@components';
import ListNews from './components/ListNews';
import {ms} from '@utils/responsive';

type Props = {
  dataTopic: any;
  dataNews: any;
  onSelectedTopic: (id: string) => void;
};

const View = ({dataTopic, dataNews, onSelectedTopic}: Props) => {
  const [routes, setRoutes] = useState<any>([]);
  const lengthDataTopic = dataTopic.length;
  const lengthRoutes = routes.length;

  const handleSelected = (index: number) => {
    const id = routes[index].key;
    onSelectedTopic(id);
  };

  useEffect(() => {
    if (lengthDataTopic) {
      const result = dataTopic.map((item: any) => ({
        key: item.id,
        title: item.name,
      }));
      setRoutes(result);
    }
  }, [dataTopic]);

  const renderScene = () => <ListNews data={dataNews} />;

  return (
    <Container>
      <AuthInfomation />
      <AppView flex paddingLeft={ms(23)}>
        {lengthRoutes ? (
          <Tab
            renderScene={renderScene}
            routes={routes}
            onSelected={handleSelected}
          />
        ) : (
          <Empty />
        )}
      </AppView>
    </Container>
  );
};

export default View;
