import React, {useCallback, useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {isEmpty} from 'lodash';
import BottomSheet from '@gorhom/bottom-sheet';
import {Container, AppView, AppText, AppBottomSheet} from '@components';
import Header from './components/Header';
import MainBenefit from './components/MainBenefit';
import SideBenefit from './components/SideBenefit';
import {CONTENT} from '@utils/fontStyle';
import {BLACK, WHITE} from '@utils/colors';
import {Right} from '@utils/svg';
import Terms from './components/Terms';
import Duration from './components/Duration';
import Cart from './components/Cart';
import {ms, vs} from '@utils/responsive';

type Props = {
  data: any;
  fee: number;
  dataTerms: any;
  feeInsuranceSelect: any;
  onSetFee: (isSelectes: boolean, money: number, id: string) => void;
  onFeeInsuranceSelect: (item: any) => void;
  onDataFilter: (id: string) => void;
  onSubmit: () => void;
  voucher: string;
  onVoucher: (code: string) => void;
};

const Policy = ({onPress}: any) => (
  <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
    <AppView
      row
      alignCenter
      backgroundColor={WHITE}
      radius={ms(16)}
      paddingVertical={ms(8)}
      paddingHorizontal={ms(16)}
      marginTop={ms(20)}
      marginBottom={ms(50)}>
      <AppView flex>
        <AppText
          flexGrow
          style={CONTENT.medium_14}
          color={BLACK[100]}
          marginRight={ms(16)}>
          Điều khoản, chính sách và thông tin khác của bảo hiểm
        </AppText>
      </AppView>
      <Right />
    </AppView>
  </TouchableOpacity>
);

const View = ({
  data,
  fee,
  dataTerms,
  feeInsuranceSelect,
  voucher,
  onVoucher,
  onDataFilter,
  onSetFee,
  onFeeInsuranceSelect,
  onSubmit,
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

  const isEmptyData = isEmpty(data);

  const title = data?.programName
    ? `${data?.programName} - ${data?.packageName}`
    : '';

  return (
    <>
      <Container isAuth title={title} isScrollView>
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
              listProductInProgram={listProductInProgram}
              listProductMainBenefit={listProductMainBenefit}
              onDataFilter={onDataFilter}
            />
          ) : null}
          {lengthListProductSideBenefit ? (
            <SideBenefit data={listProductSideBenefit} onSetFee={onSetFee} />
          ) : null}
          {dataTerms ? <Policy onPress={handleBottomSheetTerm} /> : null}
        </AppView>
      </Container>
      {!isEmptyData ? (
        <Cart
          fee={fee}
          feeInsuranceSelect={feeInsuranceSelect}
          voucher={voucher}
          onVoucher={onVoucher}
          onBottomSheet={handleBottomSheetCart}
          onSubmit={onSubmit}
        />
      ) : null}
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
