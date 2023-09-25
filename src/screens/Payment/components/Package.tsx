import React from 'react';
import {StyleSheet} from 'react-native';
import {useAppSelector} from '@hooks/redux';
import {AppView, AppText, AppImage} from '@components';
import {selectListLogo} from '@slices/configSlice';
import {BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {getColorBonus, getLink} from '@utils/global';
import {ms, s, vs} from '@utils/responsive';

type Props = {
  companyId: string;
  name: string;
  bonusPercent: number;
};

const Package = ({companyId, name, bonusPercent}: Props) => {
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
    <>
      <AppView row alignCenter paddingHorizontal={ms(16)}>
        <AppView flex>
          <AppText style={CONTENT.bold_14} color={BLACK[30]}>
            GÓI BẢO HIỂM
          </AppText>
          <AppText
            style={CONTENT.bold_16}
            color={BLACK[100]}
            marginBottom={ms(8)}
            marginTop={ms(4)}>
            {name}
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
      <AppView
        height={1}
        backgroundColor={BLACK[10]}
        marginTop={ms(12)}
        marginBottom={ms(16)}
      />
    </>
  );
};

export default Package;

const styles = StyleSheet.create({
  image: {
    width: s(65),
    height: vs(40),
  },
});
