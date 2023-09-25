import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {AppSwitch, AppTextInput, AppView, DatePicker} from '@components';
import {schemaPayment} from '@utils/schema';
import {BLACK} from '@utils/colors';
import {ms} from '@utils/responsive';

const TOMORROW = moment().add(1, 'days');
const MIN_DATE = new Date(TOMORROW.format('YYYY-MM-DD'));
const MAX_DATE = new Date(TOMORROW.add(1, 'years').format('YYYY-MM-DD'));

const defaultValues = {
  startDate: TOMORROW.valueOf(),
  redBillCompanyTaxNumber: '',
  redBillCompanyName: '',
  redBillCompanyAddress: '',
};

const Form = ({userId}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schemaPayment) as any,
  });
  const [isRedBill, setIsRedBill] = useState(false);

  const handleSwitchRedBill = () =>
    setIsRedBill(previousState => !previousState);

  return (
    <AppView>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <DatePicker
            value={value}
            onChange={onChange}
            label="Thời gian hiệu lực"
            error={errors?.startDate?.message}
            maxDate={MAX_DATE}
            minDate={MIN_DATE}
          />
        )}
        name="startDate"
      />
      <AppTextInput
        editable={false}
        label="Mã khách hàng"
        placeholder="11111"
        value={userId}
      />
      <AppView
        borderColor={BLACK[10]}
        borderTopWidth={1}
        borderBottomWidth={1}
        paddingVertical={ms(8)}
        marginBottom={ms(8)}>
        <AppSwitch
          title="Xuất hoá đơn đỏ"
          value={isRedBill}
          onValueChange={handleSwitchRedBill}
        />
      </AppView>

      {isRedBill ? (
        <AppView marginTop={ms(20)}>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.redBillCompanyTaxNumber?.message}
                label={'Mã số thuế'}
              />
            )}
            name="redBillCompanyTaxNumber"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.redBillCompanyName?.message}
                label="Tên công ty"
              />
            )}
            name="redBillCompanyName"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.redBillCompanyAddress?.message}
                label="Địa chỉ công ty"
              />
            )}
            name="redBillCompanyAddress"
          />
        </AppView>
      ) : null}
    </AppView>
  );
};

export default Form;

const styles = StyleSheet.create({});

type Props = {
  userId: string;
};
