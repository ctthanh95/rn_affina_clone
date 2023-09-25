import React from 'react';
import {ScrollView} from 'react-native';
import {Container, AppView, AppText} from '@components';
import HeaderRight from './components/HeaderRight';
import QR from './components/QR';
import Share from './components/Share';
import {ms} from '@utils/responsive';
import styles from './styles';
import IntroduceCode from './components/IntroduceCode';

type Props = {
  code: string;
  link: string;
  introduceCode: string;
  setIntroduceCode: (text: string) => void;
};

const View = ({code, link, introduceCode, setIntroduceCode}: Props) => {
  return (
    <Container isAuth title="Mã giới thiệu" headerRight={<HeaderRight />}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <QR link={link} />
        <Share code={code} link={link} />
      </ScrollView>
      <IntroduceCode
        introduceCode={introduceCode}
        setIntroduceCode={setIntroduceCode}
      />
    </Container>
  );
};

export default View;
