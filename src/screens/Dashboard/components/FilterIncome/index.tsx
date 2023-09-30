import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {isEmpty} from 'lodash';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  AppButton,
  AppText,
  KeyboardSpacer,
  BottomSheetProvince,
  DatePicker,
  Filter,
  Province,
} from '@components';
import {schameFilterIncome} from '@utils/schema';
import ProductGroup from './ProductGroup';
import Insurance from './Insurance';
import {useAppSelector} from '@hooks/redux';
import BottomSheet from '@gorhom/bottom-sheet';
import {selectListCity} from '@slices/configSlice';
import {BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';

type Props = {
  isModalVisible: boolean;
  onToggleModal: () => void;
  onGetIncomeReport: (data: any) => void;
};

const FilterIncome = ({
  isModalVisible,
  onToggleModal,
  onGetIncomeReport,
}: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors, isDirty, isValid},
  } = useForm({
    resolver: yupResolver(schameFilterIncome),
    defaultValues: {
      fromDate: 0,
      toDate: 0,
      cityName: '',
      programType: [],
      providerId: [],
    },
  });

  const listCity = useAppSelector(selectListCity);
  const [cityCode, setCityCode] = useState(null);
  const [minDate, setMinDate] = useState<undefined | Date>(undefined);
  const sheetCityRef = useRef<BottomSheet>(null);

  const handleSnapCity = () => {
    onToggleModal();
    sheetCityRef.current?.snapToIndex(0);
  };

  const handleSelectCity = (item: any) => {
    setValue('cityName', item.cityName);
    setCityCode(item.cityCode);
    onToggleModal();
  };

  const handleProductGroup = (id: number) => {
    const arr = getValues('programType');
    if (arr?.length) {
      const isExist = arr.includes(id);
      let result: any;
      if (isExist) {
        result = arr?.filter(item => item !== id);
      } else {
        result = [...arr, id];
      }
      setValue('programType', result);
    } else {
      setValue('programType', [id]);
    }
  };

  const handleInsurance = (id: string) => {
    const arr = getValues('providerId');
    if (arr?.length) {
      const isExist = arr.includes(id);
      let result: any;
      if (isExist) {
        result = arr?.filter(item => item !== id);
      } else {
        result = [...arr, id];
      }
      setValue('providerId', result);
    } else {
      setValue('providerId', [id]);
    }
  };

  const handleResetProductGroup = () => {
    setValue('programType', []);
  };

  const handleCloseAndReset = () => {
    onToggleModal();
    reset();
    setCityCode(null);
  };

  const onSubmit = (data: any) => {
    const dataPost = {
      toDate: data.toDate,
      fromDate: data.fromDate,
      cityCode: cityCode ? cityCode : null,
      programType: isEmpty(data?.programType) ? null : data.programType,
      providerId: isEmpty(data?.providerId) ? null : data.providerId,
    };
    handleCloseAndReset();
    onGetIncomeReport(dataPost);
  };

  return (
    <>
      <Filter isVisible={isModalVisible} onToggleModal={handleCloseAndReset}>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <DatePicker
              value={value}
              onChange={data => {
                onChange(data);
                const temp = new Date(moment(data).format('YYYY-MM-DD'));
                setMinDate(temp);
              }}
              label="Từ ngày"
              error={errors?.fromDate?.message}
            />
          )}
          name="fromDate"
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <DatePicker
              value={value}
              onChange={onChange}
              label="Đến ngày"
              error={errors?.toDate?.message}
              minDate={minDate}
            />
          )}
          name="toDate"
        />
        <AppText style={CONTENT.bold_14} color={BLACK[30]}>
          KHU VỰC
        </AppText>
        <Controller
          control={control}
          render={({field: {value}}) => (
            <Province
              error={errors?.cityName?.message}
              value={value}
              placeholder="Lựa chọn khu vực"
              onPress={handleSnapCity}
              isMarginBottom
            />
          )}
          name="cityName"
        />
        <ProductGroup
          onProductGroup={handleProductGroup}
          onResetProductGroup={handleResetProductGroup}
        />
        <Insurance onInsurance={handleInsurance} />
        <AppButton
          disabled={!isDirty || !isValid}
          title="áp dụng"
          onPress={handleSubmit(onSubmit)}
        />
        <KeyboardSpacer />
      </Filter>
      <BottomSheetProvince
        data={listCity}
        sheetRef={sheetCityRef}
        onSelectItem={handleSelectCity}
        type="city"
      />
    </>
  );
};

export default FilterIncome;

const styles = StyleSheet.create({});
