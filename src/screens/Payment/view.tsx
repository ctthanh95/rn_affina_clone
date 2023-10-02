import React from 'react';
import {Container, AppView, AppText} from '@components';
import {ms} from '@utils/responsive';
import {PRIMARY, WHITE} from '@utils/colors';
import {TITLE} from '@utils/fontStyle';
import Package from './components/Package';
import Meta from './components/Meta';
import {PERIOD_TYPE} from '@utils/constants';
import Form from './components/Form';

type Props = {
  data: any;
  companyId: string;
  voucher: string;
  dataPayment: any;
};

const View = ({companyId, data, voucher, dataPayment}: Props) => {
  const {
    programName,
    packageName,
    bonusPercent,
    listProductMainBenefit,
    listProductSideBenefit,
    amountPay,
    period,
    periodValue,
    userId,
    contractId,
  } = data;

  const dataBenefit = [...listProductMainBenefit, ...listProductSideBenefit];

  const periodLable =
    period === 0 ? 'Vĩnh viễn' : `${periodValue} ${PERIOD_TYPE[period]}`;

  return (
    <Container isAuth title="Thanh toán" isScrollView>
      <AppView paddingHorizontal={ms(23)}>
        <AppText
          style={TITLE[24]}
          color={PRIMARY}
          marginTop={ms(8)}
          marginBottom={ms(16)}>
          Sản phẩm bảo hiểm
        </AppText>
        <AppView
          radius={ms(20)}
          paddingTop={ms(16)}
          marginBottom={ms(20)}
          backgroundColor={WHITE}
          overflow="hidden">
          <Package
            companyId={companyId}
            name={`${programName} - ${packageName}`}
            bonusPercent={bonusPercent}
          />
          <Meta
            data={dataBenefit}
            amountPay={amountPay}
            periodLable={periodLable}
          />
        </AppView>
        <Form
          voucher={voucher}
          userId={userId}
          contractId={contractId}
          dataPayment={dataPayment}
        />
      </AppView>
    </Container>
  );
};

export default View;
