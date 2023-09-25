import React from 'react';
import {Container, FormUser} from '@components';

type Props = {
  onSubmit: (data: any) => void;
};

const View = ({onSubmit}: Props) => {
  return (
    <Container isScrollView={true} isAuth={true} title="Khách hàng mới">
      <FormUser onSubmit={onSubmit} />
    </Container>
  );
};

export default View;
