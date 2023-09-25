import React from 'react';
import {Container, FormUser, Popup} from '@components';
import {schamePersonalInformation} from '@utils/schema';
import {Smile} from '@utils/svg';

type Props = {
  data: any;
  isModalVisible: boolean;
  onToggleModal: () => void;
  onSubmit: (data: any) => void;
};

const View = ({data, isModalVisible, onToggleModal, onSubmit}: Props) => {
  return (
    <>
      <Container isScrollView={true} isAuth={true} title="Thông Tin Cá nhân">
        <FormUser
          onSubmit={onSubmit}
          isCodeClient={false}
          data={data}
          schema={schamePersonalInformation}
          isEditablePhone={false}
        />
      </Container>
      <Popup
        isModalVisible={isModalVisible}
        onToggleModal={onToggleModal}
        title="Yêu cầu cập nhật hồ sơ đã được gửi"
        content="Thông tin của bạn đang được công ty quản lý xét duyệt. Sau khi được
        duyệt, Affina sẽ cập nhật thông tin cho bạn."
        icon={<Smile />}
      />
    </>
  );
};

export default View;
