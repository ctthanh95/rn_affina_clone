import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Checkbox, AppText, AppView} from '@components';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Right} from '@utils/svg';
import {BLACK, WHITE} from '@utils/colors';

type TPay = {
  data: any;
  onPress: (data: any) => void;
};

type TItem = {
  item: any;
  isChecked: boolean;
  onPress: (data: any) => void;
};

const Item = ({item, isChecked, onPress}: TItem) => {
  const Icon = item.icon;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={!isChecked}
      onPress={() =>
        onPress({
          payment: item.id,
          payoo: item.payoo,
        })
      }>
      <AppView
        row
        alignCenter
        padding={ms(16)}
        borderColor={BLACK[3]}
        borderWidth={1}
        backgroundColor={isChecked ? WHITE : BLACK[3]}
        marginBottom={ms(12)}
        radius={ms(16)}>
        <Icon />
        <AppText
          flex
          marginHorizontal={ms(12)}
          style={CONTENT.bold_16}
          color={BLACK[100]}>
          {item.title}
        </AppText>
        <Right />
      </AppView>
    </TouchableOpacity>
  );
};

const Pay = ({data, onPress}: TPay) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <AppView marginTop={ms(12)}>
      <Checkbox
        isChecked={isChecked}
        onCheckbox={handleChecked}
        children={
          <AppText style={[styles.regular, CONTENT.medium_14]}>
            Tôi đồng ý với{' '}
            <AppText style={[CONTENT.bold_14, styles.bold]}>
              điều khoản sử dụng
            </AppText>
            <AppText> và </AppText>
            <AppText style={[CONTENT.bold_14, styles.bold]}>
              chính sách bảo mật{' '}
            </AppText>
            <AppText> của Affina</AppText>
          </AppText>
        }
      />
      <AppView marginVertical={ms(20)}>
        {data.map((item: any, index: any) => (
          <Item
            item={item}
            isChecked={isChecked}
            onPress={onPress}
            key={index}
          />
        ))}
      </AppView>
    </AppView>
  );
};

export default Pay;

const styles = StyleSheet.create({
  regular: {
    flex: 1,
  },
  bold: {
    textDecorationLine: 'underline',
  },
});
