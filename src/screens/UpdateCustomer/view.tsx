import React from 'react';
import {Container, FormUser} from '@components';

type Props = {
  onSubmit: (data: any) => void;
  data: any;
};

const View = ({onSubmit, data}: Props) => {
  return (
    <Container isScrollView={true} isAuth={true} title="Thay đổi thông tin">
      <FormUser onSubmit={onSubmit} data={data} />
    </Container>
  );
};

export default View;
