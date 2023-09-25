import React from 'react';
import {Container, FormUser} from '@components';

type Props = {
  type: string;
  data: any;
  onEditData: any;
  isOnePerson: boolean;
  onReplaceView: (type: string) => void;
};

const Edit = ({type, data, isOnePerson, onEditData, onReplaceView}: Props) => {
  const hanleSubmit = (formData: any) => {
    onEditData(formData);
    onReplaceView('');
  };
  const isRelationship = type === 'receiver' && !isOnePerson;
  return (
    <Container
      isScrollView={true}
      isAuth={true}
      title="Thay đổi thông tin"
      onPress={() => onReplaceView('')}>
      <FormUser
        onSubmit={hanleSubmit}
        data={data}
        isRelationship={isRelationship}
      />
    </Container>
  );
};

export default Edit;
