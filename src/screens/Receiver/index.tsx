import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch} from '@hooks/redux';
import {createContract} from '@sagas/contract/createContract';
import {navigate} from '@navigation/RootNavigation';
import {PAYMENT} from '@navigation/screens';
import View from './view';

const Receiver = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const params = route.params;
  const {cart, companyId, buyer} = params as any;
  const [dataBuyer, setDataBuyer] = useState(buyer);
  const [dataReceiver, setDataReceiver] = useState<any>({});
  const [isOnePerson, setIsOnePerson] = useState(true);
  const handleSwitch = () => setIsOnePerson(previousState => !previousState);

  const handleDataReceicer = (data: any) => {
    setDataReceiver(data);
  };
  const handleDataBuyer = (data: any) => {
    setDataBuyer(data);
  };
  const handlePayment = () => {
    const {periodType, periodValue, id, listProductSideBenefit} = cart;
    const dataPost: any = {
      buyHelp: isOnePerson ? 0 : 1,
      period: periodType,
      periodValue: periodValue,
      productId: id,
      listProductSideBenefit:
        listProductSideBenefit.length > 0 ? listProductSideBenefit : null,
      buyHelpRelationship: isOnePerson
        ? null
        : dataReceiver.buyHelpRelationship,
      //Data buyer
      gender: dataBuyer.gender,
      name: dataBuyer.name,
      dob: dataBuyer.dob,
      phone: dataBuyer.phone,
      email: dataBuyer.email,
      cityCode: dataBuyer.cityCode,
      districtsCode: dataBuyer.districtsCode,
      wardsCode: dataBuyer.wardsCode,
      street: dataBuyer.street,
      houseNumber: dataBuyer.numberHouse,
      address: dataBuyer.address,
      license: dataBuyer.license,
      licenseType: dataBuyer.licenseType,
      userId: dataBuyer.codeClient,
      licenseFront: dataBuyer?.upload?.frontSide?.link || null,
      licenseBack: dataBuyer?.upload?.backSide?.link || null,
    };
    if (!isOnePerson) {
      dataPost.buyHelpGender = dataReceiver.gender;
      dataPost.buyHelpName = dataReceiver.name;
      dataPost.buyHelpDob = dataReceiver.dob;
      dataPost.buyHelpPhone = dataReceiver.phone;
      dataPost.buyHelpEmail = dataReceiver.email;
      dataPost.buyHelpCityCode = dataReceiver.cityCode;
      dataPost.buyHelpDistrictsCode = dataReceiver.districtsCode;
      dataPost.buyHelpWardsCode = dataReceiver.wardsCode;
      dataPost.buyHelpStreet = dataReceiver.street;
      dataPost.buyHelpHouseNumber = dataReceiver.numberHouse;
      dataPost.buyHelpAddress = dataReceiver.address;
      dataPost.buyHelpLicense = dataReceiver.license;
      dataPost.buyHelpLicenseType = dataReceiver.licenseType;
      dataPost.buyHelpLicenseFront =
        dataReceiver?.upload?.frontSide?.link || null;
      dataPost.buyHelpLicenseBack =
        dataReceiver?.upload?.backSide?.link || null;
    }
    const options: any = {
      dataPost,
      callbackSuccess: (data: any) => {
        navigate(PAYMENT, {
          data,
          companyId,
          voucher: cart.voucher,
        });
      },
    };
    // console.log('dataPost', dataPost);
    dispatch(createContract(options));
  };

  return (
    <View
      dataBuyer={dataBuyer}
      dataReceiver={dataReceiver}
      isOnePerson={isOnePerson}
      onDataReReceicer={handleDataReceicer}
      onDataBuyer={handleDataBuyer}
      onPayment={handlePayment}
      onSwitch={handleSwitch}
    />
  );
};

export default Receiver;
