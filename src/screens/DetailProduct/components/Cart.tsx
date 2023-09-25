import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {AppText, AppTextInput, AppView, Blur, AppButton} from '@components';
import {ms, s} from '@utils/responsive';
import {BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {Add, Close, Down, Send} from '@utils/svg';
import {numberWithCommas} from '@utils/global';
import {PERIOD_TYPE} from '@utils/constants';

export const getValue = (item: any) => {
  const {periodType, periodValue} = item;
  const typeString = PERIOD_TYPE[periodType];
  const value = periodType ? `${periodValue} ${typeString}` : 'Vĩnh viễn';
  const result = value ? value : 'Lựa chọn';
  return result;
};

const Cart = ({
  fee,
  feeInsuranceSelect,
  voucher,
  onVoucher,
  onBottomSheet,
  onBuyInsurance,
}: Props) => {
  const [isShowInput, setisShowInput] = useState(false);

  const handleShowInput = () => {
    setisShowInput(!isShowInput);
  };

  return (
    <AppView padding={ms(23)} absolute bottom={0} width={'100%'}>
      <Blur />
      <AppView row justifySpaceBetween marginBottom={ms(8)} alignCenter>
        <AppText color={BLACK[50]} style={CONTENT.medium_12}>
          Mã giảm giá
        </AppText>
        <TouchableOpacity activeOpacity={0.9} onPress={handleShowInput}>
          <AppView row alignCenter>
            {isShowInput ? (
              <Close width={s(16)} height={s(16)} />
            ) : (
              <>
                <Add />
                <AppText
                  color={BLACK[100]}
                  style={CONTENT.bold_12}
                  marginLeft={ms(8)}>
                  {voucher ? voucher : 'Thêm mã giảm giá'}
                </AppText>
              </>
            )}
          </AppView>
        </TouchableOpacity>
      </AppView>
      {isShowInput ? (
        <AppTextInput
          value={voucher}
          onChangeText={(text: string) => onVoucher(text)}
          marginBottom={0}
          placeholder="Nhập mã giảm giá"
          contentRight={
            <TouchableOpacity activeOpacity={0.9} onPress={handleShowInput}>
              <Send />
            </TouchableOpacity>
          }
        />
      ) : null}
      <AppView row justifySpaceBetween marginVertical={ms(8)} alignCenter>
        <AppText color={BLACK[50]} style={CONTENT.medium_12}>
          Thời hạn bảo hiểm
        </AppText>
        <TouchableOpacity activeOpacity={0.9} onPress={onBottomSheet}>
          <AppView row alignCenter>
            <AppText
              color={BLACK[100]}
              style={CONTENT.bold_12}
              marginLeft={ms(8)}>
              {getValue(feeInsuranceSelect)}
            </AppText>
            <Down />
          </AppView>
        </TouchableOpacity>
      </AppView>
      <AppView row justifySpaceBetween marginBottom={ms(12)} alignCenter>
        <AppText color={BLACK[50]} style={CONTENT.medium_12}>
          Chi phí bảo hiểm
        </AppText>
        <AppText color={BLACK[100]} style={CONTENT.bold_14} marginLeft={ms(8)}>
          {numberWithCommas(fee)} đ
        </AppText>
      </AppView>
      <AppButton title="Mua bảo hiểm" onPress={onBuyInsurance} />
    </AppView>
  );
};

export default Cart;

const styles = StyleSheet.create({});

type Props = {
  fee: number;
  feeInsuranceSelect: any;
  voucher: string;
  onVoucher: (code: string) => void;
  onBottomSheet: () => void;
  onBuyInsurance: () => void;
};
