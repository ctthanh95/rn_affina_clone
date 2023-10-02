import React, {useState} from 'react';
import {SceneMap} from 'react-native-tab-view';
import {AppView, Container, AppTabView} from '@components';
import {ms, width} from '@utils/responsive';
import InformationTab from './components/InformationTab';
import ProductTab from './components/ProductTab';

type Props = {};

const renderScene = SceneMap({
  info: InformationTab,
  product: ProductTab,
});

const View = (props: Props) => {
  const [routes] = useState([
    {key: 'info', title: 'Thông tin'},
    {key: 'product', title: 'Sản phẩm'},
  ]);

  return (
    <Container isAuth title="Hồ sơ công việc">
      <AppView flex marginHorizontal={ms(23)}>
        <AppTabView
          routes={routes}
          renderScene={renderScene}
          width={(width - ms(23 * 2)) / 2}
        />
      </AppView>
    </Container>
  );
};

export default View;
