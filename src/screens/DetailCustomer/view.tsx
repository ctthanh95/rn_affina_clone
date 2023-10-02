import React, {useRef} from 'react';
import {Container, AppView, AppText, AppBottomSheet} from '@components';
import {ms, vs} from '@utils/responsive';
import {DATA_LICENSE_TYPE} from '@utils/constants';
import {TITLE} from '@utils/fontStyle';
import {PRIMARY} from '@utils/colors';
import {convertObjectToArray} from '@utils/global';
import BottomSheet from '@gorhom/bottom-sheet';
import Tags from './components/Tags';
import Info from './components/Info';
import Agent from './components/Agent';
import Profile from './components/Profile';
import Modal from './components/Modal';
import Action from './components/Action';

type Props = {
  data: any;
  status: number;
  onUpdateStatus: (value: number) => void;
  onUpdateCustomer: () => void;
};

const View = ({data, status, onUpdateStatus, onUpdateCustomer}: Props) => {
  const sheetRef = useRef<BottomSheet>(null);

  const dataInfo: any = {
    name: data?.name,
    [DATA_LICENSE_TYPE[data.licenseType]]: data.license,
    dob: data.dob,
    phone: data.phone,
    email: data.email,
    address: data.address,
  };

  const dataBuyer = {
    address: data?.address,
    cityCode: data?.cityCode,
    districtsCode: data?.districtsCode,
    dob: data?.dob,
    email: data?.email,
    gender: data?.gender,
    license: data?.license,
    licenseType: data?.licenseType,
    licenseTypeName: DATA_LICENSE_TYPE[data?.licenseType],
    name: data?.name,
    phone: data?.phone,
    upload: {backSide: {}, frontSide: {}},
    wardsCode: data?.wardsCode,
  };

  const dataInfoConvert = convertObjectToArray(dataInfo);

  const handleOpenBottomSheet = () => {
    sheetRef.current?.snapToIndex(0);
  };

  const handleSelectItem = (value: number) => {
    if (value !== status) onUpdateStatus(value);
    sheetRef.current?.close();
  };

  return (
    <>
      <Container isAuth title={data?.name} isScrollView>
        <AppView paddingHorizontal={ms(23)} flex marginTop={ms(16)}>
          <Tags status={status} onOpenBottomSheet={handleOpenBottomSheet} />
          <Info name={data?.name} createdAt={data?.createdAt} />
          <Agent saleName={data?.saleName} />
          <Profile data={dataInfoConvert} onUpdateCustomer={onUpdateCustomer} />
          <AppText style={TITLE[20]} color={PRIMARY} marginTop={ms(16)}>
            Danh Sách Hợp đồng
          </AppText>
          <AppView height={vs(200)} />
        </AppView>
      </Container>
      <Action phone={data.phone} dataBuyer={dataBuyer} />
      <AppBottomSheet
        sheetRef={sheetRef}
        children={<Modal onSelectItem={handleSelectItem} status={status} />}
      />
    </>
  );
};

export default View;
