import React, {useRef, useState} from 'react';
import {Text} from 'react-native';
import {Container} from '@components';
import styles from './styles';
import Detail from './components/Detail';
import Edit from './components/Edit';
import {DATA_LICENSE_TYPE, PERIOD_TYPE} from '@utils/constants';

type Props = {
  contractId: string;
  data: any;
  onUpdateContractInfo: (data: any) => void;
};

const getKey = (key: string, isBuyer: boolean) => {
  const result = isBuyer
    ? key
    : 'people' + key.charAt(0).toUpperCase() + key.slice(1);
  return result;
};

const getData = (data: any, isBuyer = true) => {
  return {
    name: data?.[getKey('name', isBuyer)],
    gender: data?.[getKey('gender', isBuyer)],
    licenseTypeName:
      DATA_LICENSE_TYPE[data?.[getKey('peopleLicenseType', isBuyer)] || 0],
    license: data?.[getKey('license', isBuyer)],
    licenseType: data?.[getKey('licenseType', isBuyer)],
    dob: data?.[getKey('dob', isBuyer)],
    phone: data?.[getKey('phone', isBuyer)],
    email: data?.[getKey('email', isBuyer)],
    address: data?.[getKey('address', isBuyer)],
    cityCode: data?.[getKey('cityCode', isBuyer)],
    wardsCode: data?.[getKey('wardsCode', isBuyer)],
    districtsCode: data?.[getKey('districtsCode', isBuyer)],
    buyHelp: data?.buyHelp,
    contractId: data?.contractId,
  };
};

const View = ({contractId, data, onUpdateContractInfo}: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isBuyer, setIsBuyer] = useState(true);

  const {amountPay, contractPeriod, contractPeriodValue, bonusPercent} = data;
  const listContractObject = data?.listContractObject || [];
  const receiver = listContractObject[0] || {};
  const {packageName, programName} = receiver;
  const listProductMainBenefit = receiver?.listProductMainBenefit || [];
  const listProductSideBenefit = receiver?.listProductSideBenefit || [];

  const dataBuyer = getData(data);
  const dataReceiver = getData(receiver, false);

  const dataBenefit = [...listProductMainBenefit, ...listProductSideBenefit];
  const periodLable =
    contractPeriod === 0
      ? 'Vĩnh viễn'
      : `${contractPeriodValue} ${PERIOD_TYPE[contractPeriod]}`;

  const handleSetIsEdit = () => {
    setIsEdit(isEdit => !isEdit);
  };

  const handleSetIsBuyer = (value: boolean) => {
    setIsBuyer(value);
  };

  return (
    <>
      {isEdit ? (
        <Edit
          data={isBuyer ? dataBuyer : dataReceiver}
          title={isBuyer ? 'Người mua bảo hiểm' : 'Người được bảo hiểm'}
          onSetIsEdit={handleSetIsEdit}
          onEditData={onUpdateContractInfo}
        />
      ) : (
        <Detail
          contractId={contractId}
          dataBuyer={dataBuyer}
          dataReceiver={dataReceiver}
          dataBenefit={dataBenefit}
          amountPay={amountPay}
          periodLable={periodLable}
          programName={programName}
          packageName={packageName}
          bonusPercent={bonusPercent}
          onSetIsEdit={handleSetIsEdit}
          onSetIsBuyer={handleSetIsBuyer}
        />
      )}
    </>
  );
};

export default View;
