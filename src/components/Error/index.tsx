import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import AppView from '../AppView';
import AppText from '../AppText';
import AppButton from '../AppButton';
import {ms} from '@utils/responsive';
import {Sad} from '@utils/svg';
import {CONTENT, TITLE} from '@utils/fontStyle';
import {BLACK, PRIMARY, WHITE} from '@utils/colors';
import AppModal from '../AppModal';
import {
  hideErrorSlice,
  selectContentError,
  selectIsError,
  selectTitleError,
} from '@slices/errorSlice';
import {useAppDispatch, useAppSelector} from '@hooks/redux';

const Error = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(selectTitleError);
  const content = useAppSelector(selectContentError);
  const isError = useAppSelector(selectIsError);

  const handleToggleModal = () => {
    console.log('handleToggleModal');
    dispatch(hideErrorSlice());
  };

  return (
    <AppModal isModalVisible={isError} onToggleModal={handleToggleModal}>
      <AppView
        backgroundColor={WHITE}
        marginHorizontal={ms(23)}
        radius={ms(44)}
        paddingTop={ms(44)}
        paddingHorizontal={ms(32)}
        paddingBottom={ms(16)}>
        <AppView center>
          <Sad />
          <AppText color={PRIMARY} style={TITLE[24]} center marginTop={ms(28)}>
            {title}
          </AppText>
          <AppText
            color={BLACK[100]}
            style={CONTENT.medium_16}
            center
            marginTop={ms(12)}
            marginBottom={ms(28)}>
            {content}
          </AppText>
          <AppButton title="Đã hiểu" onPress={handleToggleModal} />
        </AppView>
      </AppView>
    </AppModal>
  );
};

export default Error;

const styles = StyleSheet.create({});
