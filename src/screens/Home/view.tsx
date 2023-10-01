import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Container, AppView, Gradient, AuthInfomation} from '@components';
import ProductTab from './components/ProductTab';
import CustomerTab from './components/CustomerTab';
import Tabs from './components/Tabs';
import {ms} from '@utils/responsive';
import styles from './styles';

type TCloseToBottom = {
  layoutMeasurement: any;
  contentOffset: any;
  contentSize: any;
};

const View = () => {
  const [tabSelected, setTabSelected] = useState('product');
  const [isEndReached, setIsEndReached] = useState(false);
  const handleMenuSelected = (name: string) => {
    setTabSelected(name);
  };

  const handleCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: TCloseToBottom) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const renderTabs = new Map([
    ['product', <ProductTab />],
    [
      'customer',
      <CustomerTab
        isEndReached={isEndReached}
        setIsEndReached={setIsEndReached}
      />,
    ],
  ]);

  return (
    <Container>
      <AuthInfomation isGradient={true} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.container}
        alwaysBounceVertical={false}
        overScrollMode="never"
        onScroll={({nativeEvent}) => {
          if (handleCloseToBottom(nativeEvent)) {
            setIsEndReached(true);
          }
        }}
        scrollEventThrottle={16}>
        <Gradient />
        <AppView paddingHorizontal={ms(23)} flex>
          <Tabs tabSelected={tabSelected} onTabSelected={handleMenuSelected} />
          {renderTabs.get(tabSelected)}
        </AppView>
      </ScrollView>
    </Container>
  );
};

export default View;
