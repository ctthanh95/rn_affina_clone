import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppText, AppView} from '@components';
import {ms, width} from '@utils/responsive';
import {CONTENT} from '@utils/fontStyle';
import {BACKGROUND, BLACK, PRIMARY, WHITE} from '@utils/colors';
import {navigate} from '@navigation/RootNavigation';
import {SYSTEM_INFOMATION} from '@navigation/screens';

const ItemSetting = ({item, isPrimaryTitle = false}: TItemSetting) => {
  const handleScreen = (item: any) => {
    if (isPrimaryTitle) {
      navigate(SYSTEM_INFOMATION, {
        title: item.title,
        url: item.url,
      });
    } else {
      navigate(item.screen);
    }
  };
  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={1}
      onPress={() => handleScreen(item)}>
      <AppView circle={ms(48)} backgroundColor={BACKGROUND} center>
        <item.icon />
      </AppView>
      <AppText style={CONTENT.bold_12} center marginTop={ms(8)}>
        {item.title}
      </AppText>
    </TouchableOpacity>
  );
};

const MenuSetting = ({title, data, isPrimaryTitle = false}: TMenuSetting) => {
  return (
    <AppView marginBottom={ms(16)} zIndex={1}>
      <AppText
        style={styles.description}
        color={isPrimaryTitle ? PRIMARY : WHITE}>
        {title}
      </AppText>
      <AppView row wrap justifySpaceBetween>
        {data.map((item: TItem) => (
          <ItemSetting
            item={item}
            key={item.id}
            isPrimaryTitle={isPrimaryTitle}
          />
        ))}
      </AppView>
    </AppView>
  );
};

export default MenuSetting;

// 2 * 23 : paddingHorizontal
// 2 * 12 : padding between items
// /3 : 3 items

const widthItem = (width - 2 * 23 - 2 * 12) / 3;

const styles = StyleSheet.create({
  description: {
    ...CONTENT.bold_16,
    textTransform: 'capitalize',
    marginBottom: ms(16),
  },
  item: {
    width: ms(widthItem),
    borderRadius: ms(20),
    paddingHorizontal: ms(16),
    paddingVertical: ms(12),
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ms(12),
  },
});

type TMenuSetting = {
  title: string;
  data: any;
  isPrimaryTitle?: boolean;
};

type TItemSetting = {
  item: {
    id: number;
    title: string;
    icon: any;
    url?: string;
  };
  isPrimaryTitle?: boolean;
};

type TItem = {
  id: number;
  title: string;
  icon: any;
  screen?: string | undefined;
  url?: string;
};
