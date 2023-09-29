import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Container, AppView, Gradient, AuthInfomation} from '@components';
import ProductTab from './components/ProductTab';
import CustomerTab from './components/CustomerTab';
import Tabs from './components/Tabs';
import {ms} from '@utils/responsive';
import styles from './styles';

const renderTabs = new Map([
  ['product', <ProductTab />],
  ['customer', <CustomerTab />],
]);

const View = () => {
  const [tabSelected, setTabSelected] = useState('product');
  const handleMenuSelected = (name: string) => {
    setTabSelected(name);
  };

  return (
    <Container>
      <AuthInfomation isGradient={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        alwaysBounceVertical={false}
        overScrollMode="never"
        bounces={false}>
        <Gradient />
        <AppView paddingHorizontal={ms(23)}>
          <Tabs tabSelected={tabSelected} onTabSelected={handleMenuSelected} />
          {renderTabs.get(tabSelected)}
        </AppView>
      </ScrollView>
    </Container>
  );
};

export default View;
