import React, {useState} from 'react';
import {StyleSheet, Linking, TouchableOpacity} from 'react-native';
import ShareLib from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import {AppText, AppView} from '@components';
import {CONTENT} from '@utils/fontStyle';
import {BLACK, PRIMARY, WHITE} from '@utils/colors';
import {ms, s, vs} from '@utils/responsive';
import {Facebook, More, Zalo} from '@utils/svg';

type TShare = {
  code: string;
  link: string;
};

const FACEBOOK =
  'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2F/';

const ZALO = 'https://zalo.me/share?u=https%3A%2F%2Fwww.facebook.com%2F';

type TButtonSocial = {
  title: string;
  icon: any;
  onPress: () => void;
};

const ButtonSocial = ({title, icon, onPress}: TButtonSocial) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.button}
      onPress={onPress}>
      {icon}
      <AppText style={CONTENT.bold_16} color={PRIMARY} marginLeft={ms(8)}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const Share = ({code, link}: TShare) => {
  const copyLinkToClipboard = () => {
    Clipboard.setString(link);
    Toast.show({
      type: 'success',
      props: {message: 'Sao chép thành công!'},
    });
  };

  const copyCodeToClipboard = () => {
    Clipboard.setString(code);
    Toast.show({
      type: 'success',
      props: {message: 'Sao chép thành công!'},
    });
  };

  const handleShareFacebook = async () => {
    await Linking.openURL(FACEBOOK);
  };

  const handleShareZalo = async () => {
    await Linking.openURL(ZALO);
  };
  const handleShareMore = async () => {
    await ShareLib.open({
      message: link,
    });
  };

  return (
    <AppView marginVertical={ms(12)}>
      <AppText style={CONTENT.bold_14} color={BLACK[30]}>
        CHIA SẺ LIÊN KẾT
      </AppText>
      <AppView
        marginVertical={ms(12)}
        borderWidth={1}
        borderColor={BLACK[3]}
        padding={ms(16)}
        radius={ms(12)}
        backgroundColor={BLACK[3]}>
        <AppText style={CONTENT.medium_16} color={BLACK[100]}>
          Tham gia vào nhóm mua bán bảo hiểm cùng tôi trên ứng dụng Affina. Tải
          và đăng ký ngay tại link sau:
        </AppText>
        <AppText
          style={CONTENT.bold_16}
          color={BLACK[100]}
          marginVertical={ms(12)}>
          {link}
        </AppText>
        <TouchableOpacity activeOpacity={0.9} onPress={copyLinkToClipboard}>
          <AppText style={CONTENT.bold_16} color={PRIMARY} center>
            COPY NỘI DUNG
          </AppText>
        </TouchableOpacity>
      </AppView>
      <AppView row marginBottom={ms(20)} marginTop={ms(12)}>
        <ButtonSocial
          title="facebook"
          icon={<Facebook />}
          onPress={handleShareFacebook}
        />
        <ButtonSocial title="Zalo" icon={<Zalo />} onPress={handleShareZalo} />
        <TouchableOpacity activeOpacity={0.9} onPress={handleShareMore}>
          <AppView
            backgroundColor={WHITE}
            width={vs(48)}
            height={vs(48)}
            radius={ms(16)}
            padding={ms(12)}
            center>
            <More />
          </AppView>
        </TouchableOpacity>
      </AppView>
      <AppText style={CONTENT.bold_14} color={BLACK[30]} marginTop={ms(12)}>
        CHIA SẺ MÃ MỜI
      </AppText>
      <AppView row alignCenter marginTop={ms(12)} marginVertical={ms(20)}>
        <AppView
          justifyCenter
          flex
          borderWidth={1}
          borderColor={BLACK[3]}
          height={vs(48)}
          radius={ms(20)}
          paddingHorizontal={ms(12)}
          marginRight={ms(12)}
          backgroundColor={BLACK[3]}>
          <AppText style={CONTENT.medium_16} color={BLACK[100]}>
            {code}
          </AppText>
        </AppView>
        <TouchableOpacity activeOpacity={0.9} onPress={copyCodeToClipboard}>
          <AppText style={CONTENT.bold_16} color={PRIMARY} center>
            COPY
          </AppText>
        </TouchableOpacity>
      </AppView>
    </AppView>
  );
};

export default Share;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: WHITE,
    height: s(48),
    borderRadius: ms(16),
    padding: ms(12),
    marginRight: ms(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
