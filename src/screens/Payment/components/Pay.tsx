import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Checkbox, AppText, AppView, AppButton} from '@components';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Right} from '@utils/svg';
import {BLACK, WHITE} from '@utils/colors';

type Props = {
  isChecked: boolean;
  data: any;
  onChecked: () => void;
};

const Item = ({item, isChecked}: any) => {
  const Icon = item.icon;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={!isChecked}
      onPress={() => {
        console.log('click');
      }}>
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

const Condition = ({isChecked, data, onChecked}: Props) => {
  return (
    <AppView marginTop={ms(12)}>
      <Checkbox
        isChecked={isChecked}
        onCheckbox={onChecked}
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
          <Item item={item} isChecked={isChecked} key={index} />
        ))}
      </AppView>
      <AppButton title="Yêu cầu khách hàng thanh toán" />
    </AppView>
  );
};

export default Condition;

const styles = StyleSheet.create({
  regular: {
    flex: 1,
  },
  bold: {
    textDecorationLine: 'underline',
  },
});
