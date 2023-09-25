import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {BLACK} from '@utils/colors';

type Props = {
  children: string | JSX.Element | JSX.Element[];
  isModalVisible: boolean;
  onToggleModal: () => void;
};

const AppModal = ({children, isModalVisible, onToggleModal}: Props) => {
  return (
    <Modal
      style={styles.container}
      statusBarTranslucent
      isVisible={isModalVisible}
      backdropColor={BLACK[100]}
      backdropOpacity={0}
      onBackButtonPress={onToggleModal}
      onBackdropPress={onToggleModal}>
      {children}
    </Modal>
  );
};

export default memo(AppModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLACK[50],
  },
});
