import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import {AppView, Blur, AppButton} from '@components';
import {WHITE} from '@utils/colors';
import {ms, s} from '@utils/responsive';
import {Phone, Chat_Outline} from '@utils/svg';
import {navigate} from '@navigation/RootNavigation';
import {CHAT, RECEIVER} from '@navigation/screens';

type Props = {
  phone: string;
  dataBuyer: any;
};

const Action = ({phone, dataBuyer}: Props) => {
  const handleCall = () => {
    if (phone) Linking.openURL(`tel:${phone}`);
  };
  const handleChat = () => {
    navigate(CHAT);
  };

  const handleReceiver = () => {
    navigate(RECEIVER, {
      cart: null,
      companyId: null,
      buyer: dataBuyer,
    });
  };
  return (
    <AppView
      row
      absolute
      bottom={0}
      paddingTop={ms(12)}
      paddingBottom={ms(52)}
      paddingHorizontal={ms(23)}>
      <Blur />
      <TouchableOpacity activeOpacity={0.9} onPress={handleCall}>
        <AppView square={s(56)} backgroundColor={WHITE} radius={ms(16)} center>
          <Phone />
        </AppView>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.9} onPress={handleChat}>
        <AppView
          square={s(56)}
          backgroundColor={WHITE}
          radius={ms(16)}
          marginHorizontal={ms(16)}
          center>
          <Chat_Outline />
        </AppView>
      </TouchableOpacity>
      <AppView flex>
        <AppButton title="Tạo hợp đồng mới" onPress={handleReceiver} />
      </AppView>
    </AppView>
  );
};

export default Action;
