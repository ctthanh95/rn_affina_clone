import React, {useCallback, useEffect, useRef, useState} from 'react';
import moment from 'moment';
import {yupResolver} from '@hookform/resolvers/yup';
import WebView from 'react-native-webview';
import {Controller, useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import BottomSheet from '@gorhom/bottom-sheet';

import {
  AppBottomSheet,
  AppButton,
  AppSwitch,
  AppText,
  AppTextInput,
  AppView,
  DatePicker,
  Loading,
  Popup,
} from '@components';
import Pay from './Pay';
import {useAppDispatch} from '@hooks/redux';
import {updateContract} from '@sagas/contract/updateContract';
import {schemaPayment} from '@utils/schema';
import {BLACK, WHITE} from '@utils/colors';
import {ms} from '@utils/responsive';
import {METHODS, RESULT, paymentPayoo} from '@utils/PayooSDK';
import {Smile} from '@utils/svg';
import {checkSmartPay} from '@sagas/contract/checkSmartPay';

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
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [isModalFail, setIsModalFail] = useState(false);
  const [dataSmartPay, setDataSmartPay] = useState<any>(null);
  const [transactionId, setTransactionId] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const handleToggleModalSuccess = () => {
    setIsModalSuccess(!isModalSuccess);
  };

  const handleToggleModalFail = () => {
    setIsModalFail(!isModalFail);
  };

  const handleSwitchRedBill = () => setIsRedBill(pre => !pre);

  const onPressPayment = (data: any, method: any) => {
    const dataPut: any = formatData(data, contractId, isRedBill, voucher);
    dataPut.paymentMethod = method.payment;
    const {payment, payoo} = method;

    const options: any = {
      dataPut,
      callbackSuccess: (res: any) => {
        const {payooOrder, payooChecksum, amountPay} = res;
        const handleResultPayment = (data: any) => {
          const temp = JSON.parse(data);
          switch (temp.groupType) {
            case RESULT.SUCCESS:
              handleToggleModalSuccess();
              break;
            case RESULT.FAILURE:
            case RESULT.UNKNOWN:
              handleToggleModalFail();
              break;
            case RESULT.CANCEL:
              Toast.show({
                type: 'error',
                props: {message: 'Thanh toán chưa được thực hiện'},
              });
              break;
          }
        };

        if (payment === METHODS.DOMESTIC_CARD) {
          paymentPayoo(
            payooOrder,
            payooChecksum,
            amountPay,
            payoo,
            handleResultPayment,
          );
        }

        if (payment === METHODS.INTERNATIONAL_CARD) {
          setDataSmartPay({
            smartPayUrl: res.smartPayUrl,
            redirectUrl: res.redirectUrl,
          });
          setTransactionId(res.transactionId);
        }
      },
    };
    dispatch(updateContract(options));
  };

  const handleCheckSmartPay = () => {
    const options: any = {
      dataPost: {
        transactionId,
      },
      callbackSuccess: (data: any) => {
        Toast.show({
          type: 'error',
          props: {message: 'Thanh toán chưa được thực hiện'},
        });
      },
    };
    dispatch(checkSmartPay(options));
  };

  const onPressRequest = (data: any) => {
    const dataPut: any = formatData(data, contractId, isRedBill, voucher);
    const options: any = {
      dataPut,
      callbackSuccess: (res: any) => {
        Toast.show({
          type: 'success',
          props: {message: 'Đã gửi yêu cầu thanh toán'},
        });
      },
    };
    dispatch(updateContract(options));
  };

  useEffect(() => {
    if (dataSmartPay) handleBottomSheet();
  }, [dataSmartPay]);

  return (
    <>
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
        <AppButton
          title="Yêu cầu khách hàng thanh toán"
          onPress={handleSubmit(onPressRequest)}
        />
      </AppView>
      <Popup
        isModalVisible={isModalSuccess}
        onToggleModal={handleToggleModalSuccess}
        title="Thanh Toán Thành Công"
        content="Yêu cầu mua bảo hiểm của bạn đã được gửi đến nhà bảo hiểm. Hồ sơ của bạn sẽ được xem xét và phản hồi sau X ngày làm việc."
        icon={<Smile />}
      />
      <Popup
        isModalVisible={isModalFail}
        onToggleModal={handleToggleModalFail}
        title="Thanh Toán Thất Bại"
        content="Đã có lỗi trong quá trình thanh toán , vui lòng liên hệ chúng tôi để được hỗ trợ tốt nhất"
      />
      <AppBottomSheet
        points={['90%']}
        sheetRef={bottomSheetRef}
        onClose={handleCheckSmartPay}
        enablePanDownToClose={false}
        children={
          <AppView flex backgroundColor={WHITE}>
            <WebView
              source={{
                uri: dataSmartPay?.smartPayUrl,
              }}
            />
          </AppView>
        }
      />
    </>
  );
};

export default Form;

type Props = {
  userId: string;
  voucher: string;
  contractId: string;
  dataPayment: any;
};
