import React from 'react';
import {StyleSheet} from 'react-native';
import {AppText, AppView, Container} from '@components';
import Sumary from './Sumary';
import Package from './Package';
import Meta from './Meta';
import {ms} from '@utils/responsive';
import {PRIMARY, WHITE} from '@utils/colors';
import {TITLE} from '@utils/fontStyle';

type Props = {
  contractId: string;
  dataBuyer: any;
  dataReceiver: any;
  dataBenefit: any;
  amountPay: number;
  periodLable: string;
  programName: string;
  packageName: string;
  bonusPercent: number;
  onSetIsEdit: () => void;
  onSetIsBuyer: (isBuyer: boolean) => void;
};

const Detail = ({
  contractId,
  dataBuyer,
  dataReceiver,
  dataBenefit,
  amountPay,
  periodLable,
  programName,
  packageName,
  bonusPercent,
  onSetIsEdit,
  onSetIsBuyer,
}: Props) => {
  const handlePress = (value: boolean) => {
    onSetIsEdit();
    onSetIsBuyer(value);
  };
  return (
    <Container isAuth title={`Hợp đồng số: ${contractId}`} isScrollView>
      <AppView paddingHorizontal={ms(23)} paddingTop={ms(20)}>
        <Sumary
          title="Người mua bảo hiểm"
          data={dataBuyer}
          onPress={() => handlePress(true)}
        />
        <Sumary
          title="Người được bảo hiểm"
          data={dataReceiver}
          onPress={() => handlePress(false)}
        />
        <AppText
          style={TITLE[24]}
          color={PRIMARY}
          marginTop={ms(8)}
          marginBottom={ms(16)}>
          Sản phẩm bảo hiểm
        </AppText>
        <AppView
          radius={ms(20)}
          paddingTop={ms(16)}
          marginBottom={ms(20)}
          backgroundColor={WHITE}
          overflow="hidden">
          <Package
            name={`${programName} - ${packageName}`}
            bonusPercent={bonusPercent}
          />
          <Meta
            data={dataBenefit}
            amountPay={amountPay}
            periodLable={periodLable}
          />
        </AppView>
      </AppView>
    </Container>
  );
};

export default Detail;

const styles = StyleSheet.create({});
