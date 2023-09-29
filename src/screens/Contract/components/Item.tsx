import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {AppView, AppImage, AppText} from '@components';
import {useAppSelector} from '@hooks/redux';
import {selectListGroupProgram} from '@slices/configSlice';
import {WHITE, BLACK, PRIMARY, LIGHT_BACKGROUND} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {getColorBonus, formatTime} from '@utils/global';
import {ms, s, vs} from '@utils/responsive';
import {User} from '@utils/svg';
import {navigate} from '@navigation/RootNavigation';
import {DETAIL_CONTRACT} from '@navigation/screens';

const MAP_STATUS = new Map([
  [
    3,
    {
      title: 'Chờ thanh toán',
      color: WHITE,
      backgroundColor: '#FB8BAC',
    },
  ],
  [
    1,
    {
      title: 'Hoàn thành',
      color: BLACK[100],
      backgroundColor: '#ACF4C5',
    },
  ],
  [
    -1,
    {
      title: 'Bị Từ chối',
      color: BLACK[100],
      backgroundColor: BLACK[10],
    },
  ],
]);

type TItem = {
  item: any;
};

type TTag = {
  data: any;
};

const Tag = ({data}: TTag) => {
  return (
    <AppView
      marginRight={ms(8)}
      radius={ms(16)}
      paddingVertical={ms(4)}
      paddingHorizontal={ms(8)}
      backgroundColor={data.backgroundColor}>
      <AppText style={CONTENT.semibold_12} color={data.color}>
        {data.title}
      </AppText>
    </AppView>
  );
};

const Item = ({item}: TItem) => {
  const {
    groupBackground,
    bonusPercent,
    contractIdDisplay,
    listContractObject,
    createdAt,
    contractStatus,
    contractId,
  } = item;

  const listGroupProgram = useAppSelector(selectListGroupProgram);
  const firstContract = listContractObject[0];

  const {peopleName = '', programTypeName = ''} = firstContract;

  const itemProgram: any = listGroupProgram.find(
    (element: any) => element.groupName == item.groupName,
  );

  const uriImage = () => {
    if (groupBackground) {
      return {uri: groupBackground};
    }
    if (itemProgram) {
      return {uri: itemProgram.icon};
    }
    return '';
  };

  const onPress = () => {
    navigate(DETAIL_CONTRACT, {
      contractId,
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <AppView
        marginBottom={ms(20)}
        radius={ms(20)}
        backgroundColor={WHITE}
        overflow="hidden">
        <AppView
          paddingVertical={ms(12)}
          paddingHorizontal={ms(16)}
          row
          alignCenter>
          <AppImage style={styles.image} uri={uriImage()} />
          <AppView flex marginLeft={ms(12)} alignEnd>
            {bonusPercent ? (
              <AppView
                marginBottom={ms(8)}
                radius={ms(8)}
                paddingVertical={ms(4)}
                paddingHorizontal={ms(8)}
                backgroundColor={getColorBonus(bonusPercent)}>
                <AppText style={CONTENT.semibold_12} color={BLACK[100]}>
                  {`Hoa hồng: ${bonusPercent}%`}
                </AppText>
              </AppView>
            ) : null}
            <AppText
              style={CONTENT.bold_16}
              color={BLACK[100]}
              numberOfLines={1}>
              Hợp đồng số: {contractIdDisplay}
            </AppText>
          </AppView>
        </AppView>
        <AppView height={1} backgroundColor={BLACK[10]} />
        <AppView
          row
          alignCenter
          paddingVertical={ms(12)}
          paddingHorizontal={ms(16)}>
          <AppView flex>
            <AppText
              style={CONTENT.bold_16}
              color={BLACK[100]}
              numberOfLines={1}>
              {peopleName}
            </AppText>
            <AppText
              marginTop={ms(4)}
              marginBottom={ms(8)}
              style={CONTENT.semibold_12}
              color={BLACK[100]}
              numberOfLines={1}>
              Tham gia ngày: {formatTime(createdAt)}
            </AppText>
            <AppView row alignCenter>
              <Tag data={MAP_STATUS.get(contractStatus)} />
              <Tag
                data={{
                  title: programTypeName,
                  color: PRIMARY,
                  backgroundColor: LIGHT_BACKGROUND,
                }}
              />
            </AppView>
          </AppView>
          <AppView circle={s(64)} backgroundColor={LIGHT_BACKGROUND} center>
            <User width={s(36)} height={s(36)} />
          </AppView>
        </AppView>
      </AppView>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  image: {
    width: s(65),
    height: vs(40),
  },
});
