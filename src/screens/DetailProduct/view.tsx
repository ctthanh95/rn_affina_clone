import React, {useCallback, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {Container, AppView, AppText, AppBottomSheet} from '@components';
import Header from './components/Header';
import MainBenefit from './components/MainBenefit';
import SideBenefit from './components/SideBenefit';
import {CONTENT} from '@utils/fontStyle';
import {BLACK} from '@utils/colors';
import {Right} from '@utils/svg';
import Terms from './components/Terms';
import Cart from './components/Cart';
import {ms, vs} from '@utils/responsive';
import styles from './styles';
import Duration from './components/Duration';

type Props = {
  data: any;
  fee: number;
  dataTerms: any;
  menuSeleted: string;
  feeInsuranceSelect: any;
  onSetFee: (isSelectes: boolean, money: number, id: string) => void;
  onFeeInsuranceSelect: (item: any) => void;
  onDataFilter: (id: string) => void;
  onBuyInsurance: () => void;
  voucher: string;
  onVoucher: (code: string) => void;
};

const View = ({
  data,
  fee,
  dataTerms,
  menuSeleted,
  feeInsuranceSelect,
  voucher,
  onVoucher,
  onDataFilter,
  onSetFee,
  onFeeInsuranceSelect,
  onBuyInsurance,
}: Props) => {
  const {
    companyId,
    programName,
    bonusPercent,
    listProductInProgram,
    listProductMainBenefit,
    listProductSideBenefit,
    listFeeInsurance,
  } = data;

  const sheetRefTerms = useRef<BottomSheet>(null);
  const sheetRefCart = useRef<BottomSheet>(null);

  const lengthListProductInProgram = listProductInProgram?.length || 0;
  const lengthListProductSideBenefit = listProductSideBenefit?.length || 0;
  const handleBottomSheetTerm = useCallback(() => {
    sheetRefTerms.current?.snapToIndex(0);
  }, []);
  const handleBottomSheetCart = useCallback(() => {
    sheetRefCart.current?.snapToIndex(0);
  }, []);

  const handleSelectDuration = (item: any) => {
    onFeeInsuranceSelect(item);
    sheetRefCart.current?.close();
  };

  return (
    <>
      <Container
        isAuth
        title={`${data?.programName} - ${data?.packageName}`}
        isScrollView>
        <AppView
          paddingHorizontal={ms(23)}
          flex
          marginTop={ms(16)}
          marginBottom={vs(200)}>
          <Header
            companyId={companyId}
            programName={programName}
            bonusPercent={bonusPercent}
          />
          {lengthListProductInProgram ? (
            <MainBenefit
              menuSeleted={menuSeleted}
              listProductInProgram={listProductInProgram}
              listProductMainBenefit={listProductMainBenefit}
              onDataFilter={onDataFilter}
            />
          ) : null}
          {lengthListProductSideBenefit ? (
            <SideBenefit data={listProductSideBenefit} onSetFee={onSetFee} />
          ) : null}
          {dataTerms ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.policies}
              onPress={handleBottomSheetTerm}>
              <AppText
                style={CONTENT.medium_14}
                color={BLACK[100]}
                marginRight={ms(16)}>
                Điều khoản, chính sách và thông tin khác của bảo hiểm
              </AppText>
              <Right />
            </TouchableOpacity>
          ) : null}
        </AppView>
      </Container>
      <Cart
        fee={fee}
        feeInsuranceSelect={feeInsuranceSelect}
        voucher={voucher}
        onVoucher={onVoucher}
        onBottomSheet={handleBottomSheetCart}
        onBuyInsurance={onBuyInsurance}
      />
      <AppBottomSheet
        isScroll
        sheetRef={sheetRefTerms}
        points={['75%']}
        children={<Terms data={dataTerms} />}
      />
      <AppBottomSheet
        isScroll
        sheetRef={sheetRefCart}
        points={['40%']}
        children={
          <Duration
            data={listFeeInsurance}
            itemSelected={feeInsuranceSelect}
            onSelectDuration={handleSelectDuration}
          />
        }
      />
    </>
  );
};

export default View;
