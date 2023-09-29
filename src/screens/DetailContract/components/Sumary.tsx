import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AppView, AppText} from '@components';
import {PRIMARY, WHITE, BLACK, LIGHT_BACKGROUND} from '@utils/colors';
import {GENDER_TYPE} from '@utils/constants';
import {TITLE, CONTENT} from '@utils/fontStyle';
import {formatTime} from '@utils/global';
import {ms} from '@utils/responsive';
import {Edit} from '@utils/svg';

const Item = ({title, content, isWhite = true}: TItem) => (
  <AppView
    row
    paddingHorizontal={ms(12)}
    paddingVertical={ms(16)}
    backgroundColor={isWhite ? WHITE : LIGHT_BACKGROUND}>
    <AppView width={'30%'}>
      <AppText style={CONTENT.semibold_16} color={BLACK[50]}>
        {title}
      </AppText>
    </AppView>
    <AppView width={'70%'}>
      <AppText style={CONTENT.semibold_16} color={BLACK[100]}>
        {content}
      </AppText>
    </AppView>
  </AppView>
);

const Sumary = ({title, data, onPress}: TSumary) => {
  const {
    name = '',
    gender,
    licenseTypeName,
    license,
    dob,
    phone,
    email,
    address,
  } = data;
  return (
    <>
      <AppView row alignCenter justifySpaceBetween>
        <AppText style={TITLE[24]} color={PRIMARY} marginTop={ms(8)}>
          {title}
        </AppText>
        {/* <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
          <Edit />
        </TouchableOpacity> */}
      </AppView>
      <AppView
        radius={ms(16)}
        overflow="hidden"
        marginTop={ms(16)}
        marginBottom={ms(20)}>
        <AppView
          justifySpaceBetween
          row
          paddingHorizontal={ms(12)}
          paddingVertical={ms(16)}
          backgroundColor={WHITE}>
          <AppText style={CONTENT.semibold_16} color={BLACK[100]}>
            {name.toUpperCase()}
          </AppText>
          <AppText style={CONTENT.semibold_16} color={BLACK[50]}>
            {GENDER_TYPE[gender]}
          </AppText>
        </AppView>
        <Item title={licenseTypeName} content={license} isWhite={false} />
        <Item title="Ngày sinh" content={formatTime(dob)} />
        <Item title="SĐT" content={phone} isWhite={false} />
        <Item title="Email" content={email} />
        <Item title="Địa chỉ" content={address} isWhite={false} />
      </AppView>
    </>
  );
};

export default Sumary;

type TSumary = {
  title: string;
  data: any;
  onPress: () => void;
};

type TItem = {
  title: string;
  content: string;
  isWhite?: boolean;
};
