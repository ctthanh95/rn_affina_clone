import React, {useEffect, useState} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {BarcodeFormat, scanBarcodes} from 'vision-camera-code-scanner';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {AppText, AppView} from '@components';
import {Left} from '@utils/svg';
import {WHITE} from '@utils/colors';
import {height, ms, vs, width} from '@utils/responsive';
import Svg, {Defs, Mask, Rect} from 'react-native-svg';
import {goBack} from '@navigation/RootNavigation';
import {CONTENT} from '@utils/fontStyle';
import styles from './styles';
import {runOnJS} from 'react-native-reanimated';

type Props = {};

const SIZE = width * 0.75;

const cameraFrame = () => {
  return (
    <Svg width={'100%'} height={'100%'}>
      <Defs>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          <Rect height={'100%'} width={'100%'} fill={'#fff'} />
          <Rect rx={16} x={'12%'} y={'20%'} width={SIZE} height={SIZE} />
        </Mask>
      </Defs>
      <Rect
        height={'100%'}
        width={'100%'}
        fill={'rgba(26, 26, 26, 0.7)'}
        mask={'url(#mask)'}
      />
    </Svg>
  );
};

const View = (props: Props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const insets = useSafeAreaInsets();
  const marginTop = insets.top + vs(36);

  const [barcodes, setBarcodes] = useState<any>([]);

  const barcodeLength = barcodes.length;
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarcodes: any = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
      checkInverted: true,
    });
    runOnJS(setBarcodes)(detectedBarcodes);
  }, []);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const handleGoback = () => {
    goBack();
  };

  useEffect(() => {
    if (barcodeLength) {
      Toast.show({
        type: 'success',
        props: {message: barcodes[0].displayValue},
      });
    }
  }, [barcodeLength]);

  return (
    device != null &&
    hasPermission && (
      <>
        <StatusBar barStyle={'light-content'} />
        <AppView flex>
          <Camera
            style={styles.camera}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          <AppView
            absolute
            zIndex={2}
            marginLeft={ms(23)}
            marginTop={marginTop}>
            <TouchableOpacity activeOpacity={0.9} onPress={handleGoback}>
              <Left fill={WHITE} />
            </TouchableOpacity>
          </AppView>
          <AppView absoluteFull>{cameraFrame()}</AppView>
          <AppView
            width={SIZE}
            top={0.3 * height + SIZE}
            absolute
            paddingHorizontal={ms(10)}
            alignSelf="center">
            <AppText color={WHITE} style={CONTENT.medium_16} center>
              Đưa camera lại gần mã giới thiệu của đồng nghiệp
            </AppText>
          </AppView>
        </AppView>
      </>
    )
  );
};

export default View;
