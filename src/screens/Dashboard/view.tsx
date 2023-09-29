import React from 'react';
import {ScrollView} from 'react-native';
import {Container, AuthInfomation, AppView, AppBottomSheet} from '@components';
import {ms} from '@utils/responsive';
import Group from './components/Group';
import IntroduceCode from './components/IntroduceCode';
import ContractChart from './components/ContractChart';
import IncomeChart from './components/IncomeChart';
import styles from './styles';

type Props = {
  dataIncome: any;
  totalBonus: number;
  dataContract: any;
  bottomSheetRef: any;
  introduceCode: string;
  setIntroduceCode: (text: string) => void;
  onBottomSheet: () => void;
};

const View = ({
  dataIncome,
  totalBonus,
  dataContract,
  bottomSheetRef,
  introduceCode,
  setIntroduceCode,
  onBottomSheet,
}: Props) => {
  return (
    <>
      <Container>
        <AuthInfomation />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          alwaysBounceVertical={false}
          overScrollMode="never"
          bounces={false}>
          <AppView paddingHorizontal={ms(23)}>
            <Group onBottomSheet={onBottomSheet} />
            {dataIncome ? (
              <IncomeChart data={dataIncome} total={totalBonus} />
            ) : null}
            <ContractChart dataContract={dataContract} />
          </AppView>
        </ScrollView>
      </Container>
      <AppBottomSheet
        points={['25%']}
        sheetRef={bottomSheetRef}
        children={
          <IntroduceCode
            introduceCode={introduceCode}
            setIntroduceCode={setIntroduceCode}
          />
        }
      />
    </>
  );
};

export default View;
