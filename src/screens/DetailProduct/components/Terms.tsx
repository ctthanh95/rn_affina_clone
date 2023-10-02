import React, {useState} from 'react';
import RenderHtml from 'react-native-render-html';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import {AppText, AppView} from '@components';
import {ms} from '@utils/responsive';
import {BLACK, PRIMARY} from '@utils/colors';
import {Down, Right} from '@utils/svg';
import {CONTENT, TITLE} from '@utils/fontStyle';

const tagsStyles = {
  p: {
    ...CONTENT.semibold_14,
    color: BLACK[100],
  },
};

const Item = ({title, content, isLine = true}: TItem) => {
  const {width} = useWindowDimensions();
  const [isShow, setIsShow] = useState(true);
  const handlePress = () => {
    setIsShow(!isShow);
  };
  const source = {
    html: content,
  };
  return (
    <AppView marginVertical={ms(16)}>
      <AppView row alignCenter justifySpaceBetween marginBottom={ms(16)}>
        <AppText color={PRIMARY} style={TITLE[24]}>
          {title}
        </AppText>
        <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
          {isShow ? <Down /> : <Right />}
        </TouchableOpacity>
      </AppView>
      {isShow && (
        <AppView marginBottom={ms(16)}>
          <RenderHtml
            contentWidth={width}
            source={source}
            tagsStyles={tagsStyles}
          />
        </AppView>
      )}
      {isLine && <AppView height={1} backgroundColor={BLACK[10]} />}
    </AppView>
  );
};

const Terms = ({data}: TTerms) => {
  const {benefit, applicableObject, feePaymentMethod, listExclusionTerms} =
    data;

  return (
    <AppView paddingHorizontal={ms(23)}>
      <Item title="Quyền lợi" content={benefit} />
      <Item title="Đối tượng áp dụng" content={applicableObject} />
      <Item
        title="Phương thức đóng phí"
        content={feePaymentMethod}
        isLine={false}
      />
      {/* <Item
        title="Điều khoản loại trừ"
        content={listExclusionTerms}
        isLine={false}
      /> */}
    </AppView>
  );
};

export default Terms;

const styles = StyleSheet.create({});

type TTerms = {data: any};

type TItem = {title: string; content: string; isLine?: boolean};
