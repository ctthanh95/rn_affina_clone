import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {isEmpty} from 'lodash';
import {AppImage, AppText, AppView, UploadImage} from '@components';
import {ms, s} from '@utils/responsive';
import {Bell, User} from '@utils/svg';
import {CONTENT} from '@utils/fontStyle';
import {BLACK, PINK, PRIMARY, WHITE} from '@utils/colors';
import {navigate} from '@navigation/RootNavigation';
import {NOTIFICATION} from '@navigation/screens';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {selectUserData, setUserData} from '@slices/authSlice';
import {updateSaleProfile} from '@sagas/user/updateSaleProfile';

type Props = {
  isGradient?: boolean;
};

const AuthInfomation = ({isGradient = false}: Props) => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const userData: any = useAppSelector(selectUserData);
  const [imageUri, setImageUri] = useState('');

  const Wrap = isGradient ? LinearGradient : AppView;
  const color = isGradient ? WHITE : BLACK[100];

  const handleSuccess = (avatar: string) => {
    dispatch(
      setUserData({
        ...userData,
        avatar,
      }),
    );
    setImageUri(avatar);
  };

  const handleImageUri = (data: any) => {
    const avatar = data.link;
    const options: any = {
      dataPut: {
        avatar,
      },
      callbackSuccess: () => {
        handleSuccess(avatar);
      },
    };
    dispatch(updateSaleProfile(options));
  };

  const handleNotification = () => {
    navigate(NOTIFICATION);
  };

  useEffect(() => {
    setImageUri(userData?.avatar);
  }, [userData]);

  return (
    <Wrap colors={['#0148b0', '#0095ff']}>
      <AppView
        row
        marginTop={insets.top}
        alignCenter
        width={'100%'}
        paddingVertical={ms(16)}
        paddingHorizontal={ms(23)}>
        <UploadImage onChangeData={handleImageUri}>
          {isEmpty(imageUri) ? (
            <AppView style={styles.avatar}>
              <User />
            </AppView>
          ) : (
            <AppImage uri={imageUri} style={styles.avatar} />
          )}
        </UploadImage>
        <AppView flex marginLeft={ms(12)}>
          <AppText style={CONTENT.bold_20} color={color} numberOfLines={2}>
            {userData?.name}
          </AppText>
          <AppText style={CONTENT.medium_14} color={color}>
            {userData?.levelName}
          </AppText>
        </AppView>
        <TouchableOpacity activeOpacity={0.9} onPress={handleNotification}>
          <Bell fill={isGradient ? WHITE : PRIMARY} />
          <AppView circle={s(12)} backgroundColor={PINK} absolute right={0} />
        </TouchableOpacity>
      </AppView>
    </Wrap>
  );
};

export default AuthInfomation;

const styles = StyleSheet.create({
  avatar: {
    width: s(52),
    height: s(52),
    borderRadius: s(26),
    borderWidth: ms(4),
    borderColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
});
