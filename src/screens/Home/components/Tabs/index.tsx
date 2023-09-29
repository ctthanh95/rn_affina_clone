import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppView, AppText} from '@components';
import {WHITE} from '@utils/colors';
import {HOME_TAB_TYPE} from '@utils/constants';
import {CONTENT} from '@utils/fontStyle';
import {ms, vs} from '@utils/responsive';

const Item = ({item, onPress, isSelected}: TTabItem) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={styles.container}
    onPress={() => onPress(item.code)}>
    <AppText style={CONTENT.bold_16} color={isSelected ? WHITE : '#FFFFFFBF'}>
      {item.title}
    </AppText>
    {isSelected && (
      <AppView
        backgroundColor={WHITE}
        height={vs(4)}
        radius={ms(2)}
        marginHorizontal={ms(20)}
        marginTop={ms(8)}
      />
    )}
  </TouchableOpacity>
);

const Tabs = ({tabSelected, onTabSelected}: TTabs) => {
  return (
    <AppView row>
      {HOME_TAB_TYPE.map(item => (
        <Item
          item={item}
          onPress={onTabSelected}
          isSelected={tabSelected === item.code}
          key={item.code}
        />
      ))}
    </AppView>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    marginRight: ms(16),
    marginBottom: ms(16),
  },
});

type TTabs = {
  tabSelected: string;
  onTabSelected: (menu: string) => void;
};

type TTabItem = {
  item: any;
  onPress: (menu: string) => void;
  isSelected: boolean;
};
