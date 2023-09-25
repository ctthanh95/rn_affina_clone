import {StyleSheet} from 'react-native';
import React from 'react';
import {AppImage, AppText, AppView} from '@components';
import {ms, s, vs} from '@utils/responsive';
import {CONTENT, TITLE} from '@utils/fontStyle';
import {BLACK, PRIMARY} from '@utils/colors';
import {getColorBonus, getLink} from '@utils/global';
import {useAppSelector} from '@hooks/redux';
import {selectListLogo} from '@slices/configSlice';

type Props = {
  companyId: string;
  programName: string;
  bonusPercent: number;
};

const Header = ({companyId, programName, bonusPercent}: Props) => {
  const listLogo = useAppSelector(selectListLogo);

  const itemCompany: any = listLogo.find(
    (element: any) => element.companyId == companyId,
  );

  const uriImage = () => {
    if (itemCompany) {
      return itemCompany.logo;
    }
    return '';
  };
  return (
    <AppView row alignCenter marginBottom={ms(16)}>
      <AppView flex>
        <AppText style={CONTENT.bold_14} color={BLACK[30]}>
          GÓI BẢO HIỂM
        </AppText>
        <AppText
          style={TITLE[24]}
          color={PRIMARY}
          marginBottom={ms(8)}
          marginTop={ms(4)}>
          {programName}
        </AppText>
        {bonusPercent ? (
          <AppView
            alignSelf="flex-start"
            radius={ms(8)}
            paddingVertical={ms(4)}
            paddingHorizontal={ms(8)}
            backgroundColor={getColorBonus(bonusPercent)}>
            <AppText style={CONTENT.semibold_12} color={BLACK[100]}>
              {`Hoa hồng: ${bonusPercent}%`}
            </AppText>
          </AppView>
        ) : null}
      </AppView>
      <AppImage style={styles.image} uri={uriImage()} />
    </AppView>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: s(65),
    height: vs(40),
  },
});
