import React from 'react';
import {AppView, Container} from '@components';
import {ms} from '@utils/responsive';
import ListNotification from './components/ListNotification';
import HeaderRight from './components/HeaderRight';

type Props = {};

const DATA = [
  {
    type: 'invite',
    title: 'Mời tham gia nhóm ập nhật tin tức mới nhất',
    content: 'Jenny Wilson vừa gửi cho bạn một lời mời',
    time: '1 giờ trước',
    isRead: false,
  },
  {
    type: 'news',
    title: 'Tin tức',
    content: 'Cập nhật tin tức mới nhất',
    time: '1 giờ trước',
    isRead: true,
  },
  {
    type: 'client',
    title: 'Khách hàng',
    content: 'Cập nhật thông tin khách hàng mới nhất',
    time: '1 giờ trước',
    isRead: false,
  },
];

const View = (props: Props) => {
  return (
    <Container isAuth title="Thông báo" headerRight={<HeaderRight />}>
      <AppView paddingHorizontal={ms(23)} flex marginTop={ms(16)}>
        <ListNotification data={DATA} />
      </AppView>
    </Container>
  );
};

export default View;
