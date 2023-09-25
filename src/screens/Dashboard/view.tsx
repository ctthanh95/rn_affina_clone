import React from 'react';
import {ScrollView, Text} from 'react-native';
import {
  Container,
  AuthInfomation,
  AppView,
  AppText,
  AppBottomSheet,
} from '@components';
import {ms} from '@utils/responsive';
import styles from './styles';
import Contract from './components/Contract';
import IntroduceCode from './components/IntroduceCode';

type Props = {
  bottomSheetRef: any;
  introduceCode: string;
  setIntroduceCode: (text: string) => void;
  onBottomSheet: () => void;
};

const View = ({
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
            <Contract onBottomSheet={onBottomSheet} />
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
