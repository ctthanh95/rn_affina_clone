import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {createContract} from '@sagas/contract/createContract';
import {navigate} from '@navigation/RootNavigation';
import {FILTER_INSURANCE, PAYMENT} from '@navigation/screens';
import {selectProgram} from '@slices/productSlice';
import View from './view';

const formatData = (
  isOnePerson: boolean,
  dataBuyer: any,
  dataReceiver: any,
) => {
  const data: any = {
    buyHelp: isOnePerson ? 0 : 1,
    buyHelpRelationship: isOnePerson ? null : dataReceiver.buyHelpRelationship,
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
    data.buyHelpGender = dataReceiver.gender;
    data.buyHelpName = dataReceiver.name;
    data.buyHelpDob = dataReceiver.dob;
    data.buyHelpPhone = dataReceiver.phone;
    data.buyHelpEmail = dataReceiver.email;
    data.buyHelpCityCode = dataReceiver.cityCode;
    data.buyHelpDistrictsCode = dataReceiver.districtsCode;
    data.buyHelpWardsCode = dataReceiver.wardsCode;
    data.buyHelpStreet = dataReceiver.street;
    data.buyHelpHouseNumber = dataReceiver.numberHouse;
    data.buyHelpAddress = dataReceiver.address;
    data.buyHelpLicense = dataReceiver.license;
    data.buyHelpLicenseType = dataReceiver.licenseType;
    data.buyHelpLicenseFront = dataReceiver?.upload?.frontSide?.link || null;
    data.buyHelpLicenseBack = dataReceiver?.upload?.backSide?.link || null;
  }

  return data;
};

const Receiver = () => {
  const dispatch = useAppDispatch();
  const program: any = useAppSelector(selectProgram);
  const route = useRoute();
  const {cart, companyId, buyer} = route.params as any;
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

  const handleFilterInsurance = () => {
    const item = program[0]?.programList[0];
    const dataContract = formatData(isOnePerson, dataBuyer, dataReceiver);
    navigate(FILTER_INSURANCE, {item, type: 'customer', dataContract});
  };

  const handlePayment = () => {
    const {periodType, periodValue, id, listProductSideBenefit} = cart;
    const data = formatData(isOnePerson, dataBuyer, dataReceiver);
    const dataPost = {
      ...data,
      period: periodType,
      periodValue: periodValue,
      productId: id,
      listProductSideBenefit:
        listProductSideBenefit.length > 0 ? listProductSideBenefit : null,
    };
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
    dispatch(createContract(options));
  };

  return (
    <View
      cart={cart}
      dataBuyer={dataBuyer}
      dataReceiver={dataReceiver}
      isOnePerson={isOnePerson}
      onDataReReceicer={handleDataReceicer}
      onDataBuyer={handleDataBuyer}
      onPayment={handlePayment}
      onSwitch={handleSwitch}
      onFilterInsurance={handleFilterInsurance}
    />
  );
};

export default Receiver;
