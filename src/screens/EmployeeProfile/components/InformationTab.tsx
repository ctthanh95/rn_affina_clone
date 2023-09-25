import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {ms} from '@utils/responsive';
import {AppText, AppView} from '@components';
import {CONTENT} from '@utils/fontStyle';
import {BACKGROUND, BLACK} from '@utils/colors';

type TTitle = {
  title: string;
  children: string | JSX.Element | JSX.Element[];
};

type TCodeItem = {
  item: {
    id: string;
    code: string;
  };
};

const DATA_CODE = [
  {
    id: '1',
    code: 'Suspendisse id lacinia',
  },
  {
    id: '2',
    code: 'Nec efficitur',
  },
  {
    id: '3',
    code: 'Maecenas tempus',
  },
  {
    id: '4',
    code: 'Ipsum nunc',
  },
];

const Title = ({title, children}: TTitle) => (
  <AppView marginBottom={ms(32)}>
    <AppText style={CONTENT.bold_20} color={BLACK[100]} marginBottom={ms(12)}>
      {title}
    </AppText>
    {children}
  </AppView>
);

const CodeItem = ({item}: TCodeItem) => (
  <AppView
    backgroundColor={BACKGROUND}
    radius={ms(16)}
    paddingHorizontal={ms(16)}
    paddingVertical={ms(4)}
    marginBottom={ms(10)}
    marginRight={ms(10)}>
    <AppText style={CONTENT.medium_16}>{item.code}</AppText>
  </AppView>
);
const InformationTab = props => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <Title title="Chức vụ">
        <AppText style={CONTENT.medium_16} color={BLACK[100]}>
          Suspendisse id lacinia ipsum
        </AppText>
      </Title>
      <Title title="Thông tin">
        <AppText style={CONTENT.medium_16} color={BLACK[100]} justify>
          Maecenas tempus ipsum nunc, vitae maximus neque egestas vel. Aliquam
          et consequat libero, vitae efficitur lorem. Pellentesque a tristique
          urna. Quisque consectetur erat fringilla libero fermentum, vitae
          vulputate urna ullamcorper. Vivamus lacus mi, commodo ut urna nec,
          euismod blandit ligula. Morbi eget sem quam.
        </AppText>
      </Title>
      <Title title="Code bán hàng">
        <AppView wrap row>
          {DATA_CODE.map(item => (
            <CodeItem key={item.id} item={item} />
          ))}
        </AppView>
      </Title>
    </ScrollView>
  );
};

export default InformationTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: ms(20),
  },
});
