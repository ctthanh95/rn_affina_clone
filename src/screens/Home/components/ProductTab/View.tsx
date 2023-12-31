import React from 'react';
import {StyleSheet} from 'react-native';
import {AppView} from '@components';
import {FlashList} from '@shopify/flash-list';
import SectionListProduct from './SectionListProduct';
import ProductChart from './ProductChart';

type Props = {
  data: any;
  date: Date;
  setDate: (date: Date) => void;
  productReportData: any;
};

const View = ({data, date, setDate, productReportData}: Props) => {
  return (
    <AppView flex>
      <ProductChart
        date={date}
        setDate={setDate}
        productReportData={productReportData}
      />
      <AppView style={styles.list}>
        <FlashList
          data={data}
          renderItem={({item}: any) => (
            <SectionListProduct
              title={item.name}
              data={item.programList}
              type={item.type}
            />
          )}
          estimatedItemSize={200}
          keyExtractor={(item: any, index: number) => `${item.id}${index}`}
          showsVerticalScrollIndicator={false}
        />
      </AppView>
    </AppView>
  );
};

export default View;

const styles = StyleSheet.create({
  list: {
    minHeight: 50,
  },
});
