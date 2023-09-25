import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {RELATIONSHIP} from '@utils/constants';
import {PRIMARY, BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Check} from '@utils/svg';
import AppText from '../AppText';
import AppView from '../AppView';

type Props = {
  relationshiop: number;
  onPress: (id: number) => void;
};

const Relationship = ({relationshiop, onPress}: Props) => {
  return (
    <AppView paddingHorizontal={ms(23)}>
      {RELATIONSHIP.map(item => {
        const isSelected = item.id === relationshiop;
        return (
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.9}
            key={item.id}
            onPress={() => onPress(item.id)}>
            <AppText
              marginRight={ms(8)}
              style={CONTENT.semibold_14}
              color={isSelected ? PRIMARY : BLACK[100]}>
              {item.title}
            </AppText>
            {isSelected && <Check stroke={PRIMARY} />}
          </TouchableOpacity>
        );
      })}
    </AppView>
  );
};

export default Relationship;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(16),
  },
});
