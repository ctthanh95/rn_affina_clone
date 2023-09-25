import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {AppView, AppText, AppImage} from '@components';
import {goBack} from '@navigation/RootNavigation';
import {WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms, s} from '@utils/responsive';
import {Down, Left} from '@utils/svg';
import {useAppSelector} from '@hooks/redux';
import {
  selectListGroupProgram,
  selectHostStaticResource,
} from '@slices/configSlice';
import {getLink} from '@utils/global';

type Props = {
  programSelected: any;
  onModalProgram: () => void;
};

const Header = ({programSelected, onModalProgram}: Props) => {
  const insets = useSafeAreaInsets();
  const listGroupProgram = useAppSelector(selectListGroupProgram);
  const hostStaticResource = useAppSelector(selectHostStaticResource);
  const itemProgram: any = listGroupProgram.find(
    (element: any) => element.groupName == programSelected.groupName,
  );

  const sourceImageBackground = () => {
    if (programSelected.groupBackground) {
      return {
        uri: getLink(hostStaticResource, programSelected.groupBackground),
      };
    }
    if (itemProgram) {
      return {uri: getLink(hostStaticResource, itemProgram.background)};
    }
    return {};
  };
  const uriImage = () => {
    if (programSelected.groupLogo) {
      return programSelected.groupLogo;
    }
    if (itemProgram) {
      return itemProgram.icon;
    }
    return '';
  };
  return (
    <AppView
      marginTop={insets.top}
      paddingVertical={ms(16)}
      row
      alignCenter
      justifySpaceBetween>
      <TouchableOpacity activeOpacity={0.9} onPress={goBack}>
        <Left width={ms(24)} height={ms(24)} />
      </TouchableOpacity>
      <ImageBackground
        style={styles.container}
        imageStyle={styles.imageBackground}
        source={sourceImageBackground()}>
        <TouchableOpacity
          style={styles.wrap}
          activeOpacity={0.9}
          onPress={onModalProgram}>
          <AppView
            circle={s(40)}
            backgroundColor={WHITE}
            center
            overflow="hidden">
            <AppImage uri={uriImage()} style={styles.imageLogo} />
          </AppView>
          <AppView flex>
            <AppText
              marginHorizontal={ms(12)}
              numberOfLines={1}
              style={CONTENT.bold_14}
              marginVertical={ms(12)}>
              {programSelected.groupName}
            </AppText>
          </AppView>
          <Down />
        </TouchableOpacity>
      </ImageBackground>
      <AppView square={ms(24)} />
    </AppView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: ms(8),
    paddingHorizontal: ms(12),
    backgroundColor: '#FFCAE7',
    borderRadius: ms(16),
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: ms(12),
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBackground: {
    borderRadius: ms(16),
  },
  imageLogo: {
    width: ms(48),
    height: ms(48),
  },
});
