import React from 'react';
import {ScrollView} from 'react-native';
import {
  Container,
  AuthInfomation,
  AppView,
  AppBottomSheet,
  Filter,
} from '@components';
import {ms} from '@utils/responsive';
import Group from './components/Group';
import IntroduceCode from './components/IntroduceCode';
import ContractChart from './components/Chart/ContractChart';
import IncomeChart from './components/Chart/IncomeChart';
import FilterIncome from './components/FilterIncome';

import styles from './styles';

type Props = {
  dataIncome: any;
  totalBonus: number;
  dataContract: any;
  bottomSheetRef: any;
  introduceCode: string;
  isModalVisible: boolean;
  onToggleModal: () => void;
  setIntroduceCode: (text: string) => void;
  onBottomSheet: () => void;
  onGetIncomeReport: (data: any) => void;
};

const View = ({
  dataIncome,
  totalBonus,
  dataContract,
  bottomSheetRef,
  introduceCode,
  isModalVisible,
  onToggleModal,
  setIntroduceCode,
  onBottomSheet,
  onGetIncomeReport,
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
              <IncomeChart
                data={dataIncome}
                total={totalBonus}
                onToggleModal={onToggleModal}
              />
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
      <FilterIncome
        isModalVisible={isModalVisible}
        onToggleModal={onToggleModal}
        onGetIncomeReport={onGetIncomeReport}
      />
    </>
  );
};

export default View;
