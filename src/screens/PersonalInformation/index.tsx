import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {selectUserData} from '@slices/authSlice';
import {goBack} from '@navigation/RootNavigation';
import {updateSaleProfile} from '@sagas/user/updateSaleProfile';
import View from './view';

const PersonalInformation = () => {
  const dispatch = useAppDispatch();
  const userData: any = useAppSelector(selectUserData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (isModalVisible) goBack();
  };

  const defaultValues = {
    name: userData?.name,
    dob: userData?.dob,
    phone: userData?.phone,
    email: userData?.email,
    address: userData?.address,
    wardsCode: userData?.wardsCode,
    districtsCode: userData?.districtsCode,
    cityCode: userData?.cityCode,
    license: userData?.license,
    gender: userData?.gender || 1,
    licenseType: userData?.licenseType || 1,
    fontSide: {
      ext: userData?.upload?.frontSide?.ext || '',
      link: userData?.upload?.frontSide?.link || '',
    },
    backSide: {
      ext: userData?.upload?.backSide?.ext || '',
      link: userData?.upload?.backSide?.link || '',
    },
  };

  const handleSubmit = (data: any) => {
    const upload = [
      {
        name: 'frontSide',
        ext: data?.fontSide?.ext || null,
        link: data?.fontSide?.link || null,
      },
      {
        name: 'backSide',
        ext: data?.fontSide?.ext || null,
        link: data?.fontSide?.link || null,
      },
    ];
    const dataPut = {
      address: data?.address || null,
      cityCode: data?.cityCode || null,
      districtsCode: data?.districtsCode || null,
      wardsCode: data?.wardsCode || null,
      phone: data?.phone || null,
      name: data?.name || null,
      gender: data?.gender,
      licenseType: data?.licenseType,
      upload: JSON.stringify(upload),
      dob: data?.dob || null,
      email: data?.email || null,
    };
    const options: any = {
      dataPut,
      callbackSuccess: () => {
        handleToggleModal();
      },
    };
    dispatch(updateSaleProfile(options));
  };
  return (
    <View
      data={defaultValues}
      isModalVisible={isModalVisible}
      onSubmit={handleSubmit}
      onToggleModal={handleToggleModal}
    />
  );
};

export default PersonalInformation;
