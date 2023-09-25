import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BLACK, WHITE} from '@utils/colors';
import {ms} from '@utils/responsive';
import {AppText, AppView} from '@components';
import {useAppSelector} from '@hooks/redux';
import {selectListLogo} from '@slices/configSlice';
import {CONTENT} from '@utils/fontStyle';
import MetaInfo from './MetaInfo';
import Benefit from './Benefit';
import Price from './Price';

type Props = {
  item: any;
  onProductDetail: (id: string) => void;
};

const ItemProduct = ({item, onProductDetail}: Props) => {
  const {
    id,
    bonusPercent,
    programName,
    listProductMainBenefit,
    listFeeInsurance,
  } = item;

  const listLogo = useAppSelector(selectListLogo);

  const itemCompany: any = listLogo.find(
    (element: any) => element.companyId == item.companyId,
  );

  const uriImage = () => {
    if (itemCompany) {
      return itemCompany.logo;
    }
    return '';
  };

  const handlePress = () => {
    onProductDetail(id);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.item}
      onPress={handlePress}>
      <AppView paddingTop={ms(16)}>
        <AppView paddingLeft={ms(16)}>
          <MetaInfo uri={uriImage()} bonusPercent={bonusPercent} />
          <AppText
            style={CONTENT.bold_16}
            color={BLACK[100]}
            marginVertical={ms(12)}>
            {programName}
          </AppText>
          <Benefit data={listProductMainBenefit} />
        </AppView>
        <Price data={listFeeInsurance} />
      </AppView>
    </TouchableOpacity>
  );
};

export default ItemProduct;

const styles = StyleSheet.create({
  item: {
    backgroundColor: WHITE,
    borderRadius: ms(16),
    overflow: 'hidden',
    marginBottom: ms(20),
  },
});
