import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppView, AppText} from '@components';
import {PRIMARY, BLACK} from '@utils/colors';
import {CUSTOMER_TYPE} from '@utils/constants';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Check} from '@utils/svg';

type Props = {
  status: number;
  onSelectItem: (value: number) => void;
};

const Modal = ({status, onSelectItem}: Props) => {
  return (
    <AppView paddingHorizontal={ms(23)}>
      {CUSTOMER_TYPE.map(item => {
        const isCurrentStatus = item.id === status;
        return (
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.9}
            key={item.id}
            onPress={() => onSelectItem(item.id)}>
            <AppText
              marginRight={ms(8)}
              style={CONTENT.semibold_14}
              color={isCurrentStatus ? PRIMARY : BLACK[100]}>
              {item.title}
            </AppText>
            {isCurrentStatus && <Check stroke={PRIMARY} />}
          </TouchableOpacity>
        );
      })}
    </AppView>
  );
};

export default Modal;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(16),
  },
});
