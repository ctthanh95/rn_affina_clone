import React from 'react';
import {AppText, Container, FormUser} from '@components';
import {ms} from '@utils/responsive';
import {TITLE} from '@utils/fontStyle';
import {PRIMARY} from '@utils/colors';

type Props = {
  onSubmit: (data: any) => void;
};

const View = ({onSubmit}: Props) => {
  return (
    <Container isAuth title="Tạo hợp đồng" isScrollView>
      <AppText
        style={TITLE[24]}
        color={PRIMARY}
        marginTop={ms(8)}
        marginLeft={ms(23)}>
        Người mua bảo hiểm
      </AppText>
      <FormUser onSubmit={onSubmit} title="Tiếp tục" />
    </Container>
  );
};

export default View;
