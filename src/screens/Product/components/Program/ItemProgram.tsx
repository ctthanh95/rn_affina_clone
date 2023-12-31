import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {AppView, AppText, AppImage} from '@components';
import {useAppSelector} from '@hooks/redux';
import {
  selectHostStaticResource,
  selectListGroupProgram,
} from '@slices/configSlice';
import {WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {s, ms, vs, width} from '@utils/responsive';
import {getLink} from '@utils/global';

type Props = {
  item: any;
  onPress: (item: any) => void;
};

const removeTagHtml = (value: string) => {
  const firts = value.indexOf('>') + 1;
  const second = value.lastIndexOf('<');
  return value.slice(firts, second);
};

const ItemProgram = ({item, onPress}: Props) => {
  const hostStaticResource = useAppSelector(selectHostStaticResource);
  const listGroupProgram = useAppSelector(selectListGroupProgram);

  const itemProgram: any = listGroupProgram.find(
    (element: any) => element.groupName == item.groupName,
  );

  const sourceImageBackground = () => {
    if (item.groupBackground) {
      return {uri: getLink(hostStaticResource, item.groupBackground)};
    }
    if (itemProgram) {
      return {uri: getLink(hostStaticResource, itemProgram.background)};
    }
    return {};
  };
  const uriImage = () => {
    if (item.groupLogo) {
      return item.groupLogo;
    }
    if (itemProgram) {
      return itemProgram.icon;
    }
    return '';
  };

  const content = () => {
    if (itemProgram) return removeTagHtml(itemProgram.content);
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(item)}>
      <ImageBackground
        style={styles.item}
        imageStyle={styles.imageBackground}
        source={sourceImageBackground()}>
        <AppView
          circle={s(40)}
          backgroundColor={WHITE}
          center
          overflow="hidden">
          <AppImage uri={uriImage()} style={styles.imageLogo} />
        </AppView>
        <AppText
          flexGrow
          numberOfLines={2}
          style={CONTENT.bold_12}
          marginTop={ms(8)}>
          {item.groupName}
        </AppText>
        {content() ? (
          <AppText
            numberOfLines={2}
            style={CONTENT.semibold_10}
            marginVertical={ms(4)}>
            {content()}
          </AppText>
        ) : null}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ItemProgram;

// 2 * 23 : paddingHorizontal
// 2 * 12 : padding between items
// /3 : 3 items
const widthItem = (width * 0.9 - 4 * 12) / 3;

const styles = StyleSheet.create({
  item: {
    width: ms(widthItem),
    padding: ms(12),
    marginBottom: ms(12),
    height: vs(140),
    backgroundColor: '#FFCAE7',
    borderRadius: ms(16),
  },
  imageBackground: {
    borderRadius: ms(16),
  },
  imageLogo: {
    width: ms(40),
    height: ms(40),
  },
});
