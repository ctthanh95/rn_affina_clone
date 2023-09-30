import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  AppText,
  AppView,
  DatePicker,
  SelectGroup,
  AppButton,
  Slider,
  SearchInput,
} from '@components';
import {BLACK, PRIMARY, WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms, width} from '@utils/responsive';
import {Close} from '@utils/svg';
import {DATA_SHORT, GENDER_2} from '@utils/constants';
import {schameModalFilter} from '@utils/schema';
import {removeVietnameseTones} from '@utils/global';

const WIDTH = 0.85 * width;

type Props = {
  isVisible: boolean;
  onToggleModal: () => void;
  children: string | JSX.Element | JSX.Element[];
};

const Filter = ({isVisible, children, onToggleModal}: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={500}
      animationOutTiming={500}
      statusBarTranslucent
      isVisible={isVisible}
      backdropOpacity={0}
      onBackButtonPress={onToggleModal}
      onBackdropPress={onToggleModal}
      style={styles.container}>
      <AppView
        width={WIDTH}
        height={'100%'}
        backgroundColor={WHITE}
        paddingTop={insets.top}
        paddingHorizontal={ms(23)}>
        <AppView row alignCenter>
          <TouchableOpacity activeOpacity={0.9} onPress={onToggleModal}>
            <Close />
          </TouchableOpacity>
          <AppText flexGrow style={CONTENT.bold_16} color={PRIMARY} center>
            Bộ lọc
          </AppText>
        </AppView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AppView marginTop={ms(32)} />
          {children}
        </ScrollView>
      </AppView>
    </Modal>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: BLACK[50],
    alignItems: 'flex-end',
  },
});
