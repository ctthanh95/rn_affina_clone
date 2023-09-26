import React from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppView from '../AppView';
import AppText from '../AppText';
import {BACKGROUND, PRIMARY} from '@utils/colors';
import {Left} from '@utils/svg';
import {ms} from '@utils/responsive';
import {goBack} from '@navigation/RootNavigation';
import {CONTENT} from '@utils/fontStyle';

type Props = {
  children: string | JSX.Element | JSX.Element[];
  isScrollView?: boolean | undefined;
  isPublic?: boolean | undefined;
  isAuth?: boolean | undefined;
  title?: string | undefined;
  headerRight?: string | JSX.Element | JSX.Element[];
  onPress?: any;
};

const Container = ({
  children,
  isScrollView = false,
  isPublic = false,
  isAuth = false,
  title,
  headerRight,
  onPress = goBack,
}: Props) => {
  const Wrap = isScrollView ? ScrollView : View;
  const insets = useSafeAreaInsets();
  return (
    <AppView flex backgroundColor={BACKGROUND}>
      {isAuth && (
        <AppView
          marginTop={insets.top}
          paddingHorizontal={ms(17)}
          paddingVertical={ms(16)}
          row
          alignCenter
          justifySpaceBetween>
          <BackButton onPress={onPress} />
          {title && (
            <AppText
              flex
              center
              style={CONTENT.bold_16}
              color={PRIMARY}
              numberOfLines={1}
              marginHorizontal={ms(12)}>
              {title}
            </AppText>
          )}
          {headerRight ? headerRight : <AppView square={ms(24)} />}
        </AppView>
      )}
      <Wrap style={styles.container} showsVerticalScrollIndicator={false}>
        {isPublic && (
          <AppView marginTop={ms(84)} paddingHorizontal={ms(17)}>
            <BackButton onPress={onPress} />
          </AppView>
        )}
        {children}
      </Wrap>
    </AppView>
  );
};

export default Container;

const BackButton = ({onPress}: any) => (
  <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
    <Left width={ms(24)} height={ms(24)} fill={PRIMARY} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
