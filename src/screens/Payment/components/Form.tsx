import React, {useState} from 'react';
import moment from 'moment';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {
  AppButton,
  AppSwitch,
  AppTextInput,
  AppView,
  DatePicker,
} from '@components';
import Pay from './Pay';
import {useAppDispatch} from '@hooks/redux';
import {updateContract} from '@sagas/contract/updateContract';
import {schemaPayment} from '@utils/schema';
import {BLACK} from '@utils/colors';
import {ms} from '@utils/responsive';

const TOMORROW = moment().add(1, 'days');
const MIN_DATE = new Date(TOMORROW.format('YYYY-MM-DD'));
const MAX_DATE = new Date(TOMORROW.add(1, 'years').format('YYYY-MM-DD'));

const formatData = (
  formData: any,
  contractId: string,
  isRedBill: boolean,
  voucher: string,
) => {
  const {
    redBillCompanyAddress: address,
    redBillCompanyName: name,
    redBillCompanyTaxNumber: tax,
    startDate,
  } = formData;
  const result = {
    contractId,
    redBill: isRedBill ? 1 : 0,
    startDate,
    voucherId: voucher ? voucher : null,
    redBillCompanyAddress: address ? address : null,
    redBillCompanyName: name ? name : null,
    redBillCompanyTaxNumber: tax ? tax : null,
  };
  return result;
};

const defaultValues = {
  startDate: TOMORROW.valueOf(),
  redBillCompanyTaxNumber: '',
  redBillCompanyName: '',
  redBillCompanyAddress: '',
};

const Form = ({voucher, userId, contractId, dataPayment}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues,
    resolver: yupResolver(schemaPayment) as any,
  });
  const dispatch = useAppDispatch();
  const [isRedBill, setIsRedBill] = useState(false);

  const handleSwitchRedBill = () => setIsRedBill(pre => !pre);

  const onPressPayment = (data: any, method: any) => {
    const dataPut: any = formatData(data, contractId, isRedBill, voucher);
    dataPut.paymentMethod = method.payment;

    const options: any = {
      dataPut,
      callbackSuccess: (res: any) => {
        console.log('response', res);
      },
    };
    return;
    dispatch(updateContract(options));
  };

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
                keyboardType="number-pad"
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
      <Pay data={dataPayment} onPress={handleSubmit(onPressPayment)} />
    </AppView>
  );
};

export default Form;

type Props = {
  userId: string;
  voucher: string;
  contractId: string;
  dataPayment: any;
};
