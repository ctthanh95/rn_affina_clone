import React, {useState} from 'react';
import {StyleSheet, Pressable, TouchableOpacity, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AppView from '../AppView';
import AppModal from '../AppModal';
import AppText from '../AppText';
import {BLACK, LIGHT_BACKGROUND, PINK, PRIMARY, WHITE} from '@utils/colors';
import {ms} from '@utils/responsive';
import {BUTTON} from '@utils/fontStyle';
import {useAppDispatch} from '@hooks/redux';
import {uploadImage} from 'src/redux/sagas/config/uploadImage';

type Props = {
  children: string | JSX.Element | JSX.Element[];
  onChangeData: (data: any) => void;
};

const options: any = {
  mediaType: 'photo',
  quality: 1,
};

const UploadImage = ({children, onChangeData}: Props) => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const isAndroid = Platform.OS === 'android';
  const isIos = Platform.OS === 'ios';

  const handleToggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleCloseModeal = () => {
    setModalVisible(false);
  };

  const handleImagePicker = async (type: string) => {
    let handle = type === 'camera' ? launchCamera : launchImageLibrary;
    if (isAndroid) {
      handleCloseModeal();
    }
    const result: any = await handle(options);
    if (isIos) {
      handleCloseModeal();
    }
    const lengthResult = result.assets?.length;

    if (lengthResult) {
      const item = result.assets[0];

      const uri = isIos ? item.uri.replace('file://', '') : item.uri;
      const ext = '.' + uri.split('.').pop();
      const options: any = {
        dataPost: {
          uri,
          name: item.fileName,
          type: item.type,
        },
        callbackSuceess: (data: any) => {
          onChangeData({
            ext,
            link: data.link,
          });
        },
      };
      dispatch(uploadImage(options));
    }
  };

  return (
    <>
      <TouchableOpacity activeOpacity={0.9} onPress={handleToggleModal}>
        {children}
      </TouchableOpacity>
      <AppModal
        isModalVisible={isModalVisible}
        onToggleModal={handleToggleModal}>
        <AppView absolute bottom={0} width="90%" marginBottom={ms(20)}>
          <Pressable
            style={styles.camera}
            onPress={() => handleImagePicker('camera')}>
            <AppText style={BUTTON[16]} color={PRIMARY}>
              CHỤP HÌNH
            </AppText>
          </Pressable>
          <Pressable
            style={styles.library}
            onPress={() => handleImagePicker('library')}>
            <AppText style={BUTTON[16]} color={PRIMARY}>
              CHỌN TỪ THIẾT BỊ
            </AppText>
          </Pressable>
          <Pressable style={styles.cancel} onPress={handleToggleModal}>
            <AppText style={BUTTON[16]} color={PINK}>
              HUỶ
            </AppText>
          </Pressable>
        </AppView>
      </AppModal>
    </>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  camera: {
    backgroundColor: WHITE,
    paddingVertical: ms(16),
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(56),
    borderTopRightRadius: ms(16),
    borderTopLeftRadius: ms(16),
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_BACKGROUND,
  },
  library: {
    backgroundColor: WHITE,
    paddingVertical: ms(16),
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(56),
    borderBottomRightRadius: ms(16),
    borderBottomLeftRadius: ms(16),
  },
  cancel: {
    backgroundColor: WHITE,
    paddingVertical: ms(16),
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(56),
    borderRadius: ms(16),
    marginTop: ms(12),
  },
});
