import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import BottomSheet from '@gorhom/bottom-sheet';
import {isEmpty} from 'lodash';
import {yupResolver} from '@hookform/resolvers/yup';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {schameCustomer} from '@utils/schema';
import AppText from '../AppText';
import AppTextInput from '../AppTextInput';
import AppView from '../AppView';
import Province from '../Province';
import SelectGroup from '../SelectGroup';
import DatePicker from '../DatePicker';
import ImageSelect from './ImageSelect';
import AppButton from '../AppButton';
import {BLACK} from '@utils/colors';
import {DATA_LICENSE_TYPE, GENDER, IDENTIFICATION} from '@utils/constants';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Flag} from '@utils/svg';
import BottomSheetProvince from '../BottomSheetProvince';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {selectListCity} from '@slices/configSlice';
import {selectUserData} from '@slices/authSlice';
import {getDistrict} from 'src/redux/sagas/config/getDistrict';
import {getWard} from 'src/redux/sagas/config/getWard';
import {getAddress, formatPhoneNumber, spreadAddress} from '@utils/global';
import Select from '../Select';
import AppBottomSheet from '../AppBottomSheet';
import Relationship from './Relationship';
import DismissKeyboard from '../DismissKeyboard';

type Props = {
  onSubmit: (data: any) => void;
  data?: any;
  schema?: any;
  title?: string;
  isCodeClient?: boolean;
  isRelationship?: boolean;
  isEditablePhone?: boolean;
};
const temp = {
  address: '111, CMT8, Phường Phú Thọ Hòa, Quận Tân Phú, Thành phố Hồ Chí Minh',
  buyHelpRelationship: 5,
  cityCode: 79,
  cityName: 'Thành phố Hồ Chí Minh',
  codeClient: '',
  districtName: 'Quận Tân Phú',
  districtsCode: 767,
  dob: -292838400000,
  email: 'Trangnq@gmail.com',
  gender: 1,
  license: '11112222',
  licenseType: 2,
  licenseTypeName: 'Passport',
  name: 'Nguyen Quỳnh Trang',
  numberHouse: '111',
  phone: '0333333333',
  saleId: '0348157799',
  street: 'CMT8',
  upload: {backSide: {}, frontSide: {}},
  wardName: 'Phường Phú Thọ Hòa',
  wardsCode: 27025,
};

const FormUser = ({
  onSubmit,
  data = temp,
  // data,
  schema = schameCustomer,
  title = 'Lưu',
  isCodeClient = true,
  isRelationship = false,
  isEditablePhone = true,
}: Props) => {
  let defaultValues = undefined;
  if (data) {
    const [numberHouse, street, wardName, districtName, cityName] =
      spreadAddress(data.address);
    defaultValues = {
      ...data,
      numberHouse,
      street,
      wardName,
      districtName,
      cityName,
    };
  }
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const listCity = useAppSelector(selectListCity);
  const userData: any = useAppSelector(selectUserData);
  const [cityCode, setCityCode] = useState(0);
  const [listDistrict, setListDistrict] = useState([]);
  const [districtsCode, setDistrictsCode] = useState(0);
  const [listWard, setListWard] = useState([]);
  const [wardsCode, setWardsCode] = useState(0);
  const [frontSide, setFrontSide] = useState({});
  const [backSide, setBackSide] = useState({});
  const [relationshiop, setRelationshiop] = useState(5);

  const sheetCityRef = useRef<BottomSheet>(null);
  const sheetDistrictRef = useRef<BottomSheet>(null);
  const sheetWardRef = useRef<BottomSheet>(null);
  const sheetRalationship = useRef<BottomSheet>(null);

  useEffect(() => {
    if (cityCode) {
      const options: any = {
        dataGet: {
          cityCode,
        },
        callbackSuccess: (data: any) => {
          setListDistrict(data);
        },
      };
      dispatch(getDistrict(options));
    }
  }, [cityCode]);

  useEffect(() => {
    if (districtsCode) {
      const options: any = {
        dataGet: {
          districtsCode,
        },
        callbackSuccess: (data: any) => {
          setListWard(data);
        },
      };
      dispatch(getWard(options));
    }
  }, [districtsCode]);

  useEffect(() => {
    if (data) {
      const {cityCode, districtsCode, wardsCode} = data;
      setCityCode(cityCode);
      setDistrictsCode(districtsCode);
      setWardsCode(wardsCode);
    }
  }, []);

  const handleSnapCity = useCallback(() => {
    sheetCityRef.current?.snapToIndex(0);
  }, []);

  const handleSelectCity = (item: any) => {
    setValue('districtName', '');
    setValue('wardName', '');
    clearErrors('cityName');
    setValue('cityName', item.cityName);
    setCityCode(item.cityCode);
  };

  const handleSnapDistrict = useCallback(() => {
    const isEmptyProvince = isEmpty(getValues('cityName'));
    if (!isEmptyProvince) {
      sheetDistrictRef.current?.snapToIndex(0);
    }
  }, []);

  const handleSelectDistrict = (item: any) => {
    setValue('wardName', '');
    clearErrors('districtName');
    setValue('districtName', item.districtsName);
    setDistrictsCode(item.districtsCode);
  };

  const handleSnapWard = useCallback(() => {
    const isEmptyDistrict = isEmpty(getValues('districtName'));
    if (!isEmptyDistrict) {
      sheetWardRef.current?.snapToIndex(0);
    }
  }, []);

  const handleSelectWard = (item: any) => {
    setValue('wardName', item.wardsName);
    clearErrors('wardName');
    setWardsCode(item.wardsCode);
  };

  const handleSnapRelationship = useCallback(() => {
    sheetRalationship.current?.snapToIndex(0);
  }, []);

  const handleSelectRelationship = (id: number) => {
    setValue('buyHelpRelationship', id);
    setRelationshiop(id);
    sheetRalationship.current?.close();
  };

  const handleFrontSide = (data: any) => {
    setFrontSide(data);
  };
  const handleBackSide = (data: any) => {
    setBackSide(data);
  };

  const onPress = (data: any) => {
    const {
      licenseType,
      numberHouse,
      street,
      wardName,
      districtName,
      cityName,
      phone,
      buyHelpRelationship,
    } = data;
    const licenseTypeName = DATA_LICENSE_TYPE[licenseType];

    const address = getAddress(
      numberHouse,
      street,
      wardName,
      districtName,
      cityName,
    );
    const saleId = userData.userId;
    const dataPost = {
      ...data,
      licenseTypeName,
      address,
      buyHelpRelationship,
      saleId,
      cityCode,
      districtsCode,
      wardsCode,
      upload: {
        backSide,
        frontSide,
      },
      phone: formatPhoneNumber(phone),
    };
    // console.log(dataPost);
    onSubmit(dataPost);
  };

  return (
    <DismissKeyboard>
      <AppView flex paddingHorizontal={23} marginTop={ms(24)}>
        {isCodeClient ? (
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.codeClient?.message}
                label="Mã khách hàng"
              />
            )}
            name="codeClient"
          />
        ) : null}
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <SelectGroup data={GENDER} onChange={onChange} value={value} />
          )}
          name="gender"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.name?.message}
              label="Họ và tên"
              placeholder="Nguyễn Văn A"
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <DatePicker
              value={value}
              onChange={onChange}
              label="Ngày tháng năm sinh"
              error={errors?.dob?.message}
            />
          )}
          name="dob"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextInput
              editable={isEditablePhone}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.phone?.message}
              label="Số điện thoại"
              placeholder={'12 345 6789'}
              keyboardType={'number-pad'}
              maxLength={10}
              contentLeft={
                <AppView row alignCenter marginRight={ms(12)}>
                  <Flag width={ms(48)} height={ms(48)} />
                  <AppText color={BLACK[100]} style={CONTENT.medium_16}>
                    +84
                  </AppText>
                </AppView>
              }
            />
          )}
          name="phone"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.email?.message}
              label="Email"
              placeholder="username@tenmien.com"
              keyboardType="email-address"
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.numberHouse?.message}
              label="địa chỉ"
              placeholder="Số nhà"
              marginBottom={0}
            />
          )}
          name="numberHouse"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.street?.message}
              placeholder="Đường/ ấp"
              marginBottom={0}
            />
          )}
          name="street"
        />
        <Controller
          control={control}
          render={({field: {value}}) => (
            <Province
              error={errors?.cityName?.message}
              value={value}
              placeholder="Tỉnh/ thành phố"
              onPress={handleSnapCity}
            />
          )}
          name="cityName"
        />
        <Controller
          control={control}
          render={({field: {value}}) => (
            <Province
              error={errors?.districtName?.message}
              value={value}
              placeholder="Quận/ huyện"
              onPress={handleSnapDistrict}
            />
          )}
          name="districtName"
        />
        <Controller
          control={control}
          render={({field: {value}}) => (
            <Province
              error={errors?.wardName?.message}
              value={value}
              placeholder="Phường/ xã"
              onPress={handleSnapWard}
              isMarginBottom={true}
            />
          )}
          name="wardName"
        />
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <SelectGroup
              data={IDENTIFICATION}
              onChange={onChange}
              value={value}
            />
          )}
          name="licenseType"
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <AppTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.license?.message}
              label="Mã định danh"
              placeholder="Số CMND/ CCCD hoặc passport"
              keyboardType="number-pad"
            />
          )}
          name="license"
        />
        <AppView row marginBottom={ms(20)}>
          <AppView flex>
            <ImageSelect data={frontSide} onChangeData={handleFrontSide} />
          </AppView>
          <AppView width={ms(10)} />
          <AppView flex>
            <ImageSelect
              data={backSide}
              onChangeData={handleBackSide}
              isFront={false}
            />
          </AppView>
        </AppView>
        {isRelationship ? (
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Select
                value={value}
                onChange={onChange}
                label="Mối quan hệ với người mua bảo hiểm"
                error={errors?.buyHelpRelationship?.message}
                onPress={handleSnapRelationship}
              />
            )}
            name="buyHelpRelationship"
          />
        ) : null}

        <AppButton title={title} onPress={handleSubmit(onPress)} />
        <KeyboardSpacer />
      </AppView>
      <BottomSheetProvince
        data={listCity}
        sheetRef={sheetCityRef}
        onSelectItem={handleSelectCity}
        type="city"
      />
      <BottomSheetProvince
        data={listDistrict}
        sheetRef={sheetDistrictRef}
        onSelectItem={handleSelectDistrict}
        type="district"
      />
      <BottomSheetProvince
        data={listWard}
        sheetRef={sheetWardRef}
        onSelectItem={handleSelectWard}
        type="ward"
      />
      <AppBottomSheet
        children={
          <Relationship
            onPress={handleSelectRelationship}
            relationshiop={relationshiop}
          />
        }
        sheetRef={sheetRalationship}
        points={['25%']}
      />
    </DismissKeyboard>
  );
};

export default FormUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
