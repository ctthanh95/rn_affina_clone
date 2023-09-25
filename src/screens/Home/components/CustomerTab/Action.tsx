import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppView, AppText} from '@components';
import {PRIMARY} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Phone, Chat_Outline} from '@utils/svg';
import {navigate} from '@navigation/RootNavigation';
import {CHAT} from '@navigation/screens';

type Props = {
  phone: string;
};

const Action = ({phone}: Props) => {
  const handleCall = () => {
    if (phone) Linking.openURL(`tel:${phone}`);
  };
  const handleChat = () => {
    navigate(CHAT);
  };
  return (
    <AppView style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={handleCall}>
        <Phone />
        <AppText style={CONTENT.bold_14} color={PRIMARY} marginLeft={ms(8)}>
          GỌI ĐIỆN
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.button}
        onPress={handleChat}>
        <Chat_Outline />
        <AppText style={CONTENT.bold_14} color={PRIMARY} marginLeft={ms(8)}>
          TRÒ CHUYỆN
        </AppText>
      </TouchableOpacity>
    </AppView>
  );
};

export default Action;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: ms(12),
    backgroundColor: '#F3F9FF',
    padding: ms(12),
    borderBottomLeftRadius: ms(20),
    borderBottomRightRadius: ms(20),
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
