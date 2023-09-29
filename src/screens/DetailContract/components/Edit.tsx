import React from 'react';
import {Container, FormUser} from '@components';

type Props = {
  data: any;
  title: string;
  onEditData: any;
  onSetIsEdit: () => void;
};

const Edit = ({data, title, onEditData, onSetIsEdit}: Props) => {
  const hanleSubmit = (formData: any) => {
    const dataPut = {
      ...formData,
      buyHelp: data?.buyHelp,
      contractId: data?.contractId,
      houseNumber: formData.numberHouse,
      licenseBack: formData?.upload?.backSide?.link || null,
      licenseFront: formData?.upload?.frontSide?.link || null,
    };
    onEditData(dataPut);
  };
  return (
    <Container
      isScrollView={true}
      isAuth={true}
      title={title}
      onPress={onSetIsEdit}>
      <FormUser onSubmit={hanleSubmit} data={data} isCodeClient={false} />
    </Container>
  );
};

export default Edit;
