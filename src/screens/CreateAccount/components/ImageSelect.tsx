import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isEmpty} from 'lodash';
import {UploadImage, AppView, AppText, AppImage} from '@components';
import {Front} from '@utils/svg';
import {BLACK, PRIMARY} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms, vs} from '@utils/responsive';

type Props = {
  imageUri: string | undefined;
  setImageUri: any;
};

const ImageSelect = ({imageUri, setImageUri}: Props) => {
  return (
    <UploadImage setImageUri={setImageUri}>
      {isEmpty(imageUri) ? (
        <AppView style={styles.wrap}>
          <Front />
          <AppText style={styles.title}>Mặt trước</AppText>
        </AppView>
      ) : (
        <AppImage uri={imageUri} style={styles.image} />
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
