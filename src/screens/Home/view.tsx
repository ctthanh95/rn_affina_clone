import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Container, AppView, Gradient, AuthInfomation} from '@components';
import ProductTab from './components/ProductTab';
import CustomerTab from './components/CustomerTab';
import Menu from './components/Menu';
import {ms} from '@utils/responsive';
import styles from './styles';

const renderMenu = new Map([
  ['product', <ProductTab />],
  ['customer', <CustomerTab />],
]);

const View = () => {
  const [menuSelected, setMenuSelected] = useState('product');
  const handleMenuSelected = (name: string) => {
    setMenuSelected(name);
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
          <Menu
            menuSelected={menuSelected}
            onMenuSelected={handleMenuSelected}
          />
          {renderMenu.get(menuSelected)}
        </AppView>
      </ScrollView>
    </Container>
  );
};

export default View;
