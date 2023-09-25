import React from 'react';
import {StyleSheet} from 'react-native';
import {isEmpty} from 'lodash';
import AppImage from '../AppImage';
import AppText from '../AppText';
import AppView from '../AppView';
import UploadImage from '../UploadImage';
import {Front} from '@utils/svg';
import {BLACK, PRIMARY} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms, vs} from '@utils/responsive';

type Props = {
  data: any;
  onChangeData: (data: any) => void;
  isFront?: boolean;
};

const ImageSelect = ({data, onChangeData, isFront = true}: Props) => {
  const uri = data?.link;
  return (
    <UploadImage onChangeData={onChangeData}>
      {isEmpty(uri) ? (
        <AppView style={styles.wrap}>
          <Front />
          <AppText style={styles.title}>
            {isFront ? 'Mặt trước' : 'Mặt sau'}
          </AppText>
        </AppView>
      ) : (
        <AppImage uri={uri} style={styles.image} />
      )}
    </UploadImage>
  );
};

export default ImageSelect;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: BLACK[3],
    borderWidth: 1,
    borderColor: BLACK[3],
    height: vs(92),
    borderRadius: ms(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...CONTENT.semibold_12,
    color: PRIMARY,
    marginTop: ms(10),
  },
  image: {
    width: '100%',
    height: vs(92),
    borderRadius: ms(12),
  },
});
