import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch} from '@hooks/redux';
import {getProductDetail} from '@sagas/product/getProductDetail';
import {getTerms} from '@sagas/contract/getTerms';
import View from './view';
import {navigate} from '@navigation/RootNavigation';
import {BUYER} from '@navigation/screens';

const DetailProduct = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const {filter} = route.params as any;
  const [data, setData] = useState<any>({});
  const [menuSeleted, setMenuSeleted] = useState(filter.id);
  const [dataFilter, setDataFilter] = useState(filter);
  const [dataTerms, setDataTerms] = useState({});
  const [fee, setFee] = useState(0);
  const [feeInsuranceSelect, setFeeInsuranceSelect] = useState<any>({});
  const [cart, setCart] = useState<any>([]);
  const [voucher, setVoucher] = useState('');
  useEffect(() => {
    const options: any = {
      dataGet: dataFilter,
      callbackSuccess: (data: any) => {
        const {listFeeInsurance} = data;
        setFee(listFeeInsurance[0].fee);
        setFeeInsuranceSelect(listFeeInsurance[0]);
        setData(data);
        handleGetTerms(data.programId);
      },
    };
    dispatch(getProductDetail(options));
  }, [dataFilter]);

  const handleGetTerms = (programId: string) => {
    const options: any = {
      dataGet: {programId},
      callbackSuccess: (data: any) => {
        setDataTerms(data);
      },
    };
    dispatch(getTerms(options));
  };

  const handleDataFilter = (id: string) => {
    setDataFilter({
      ...filter,
      id,
    });
    setMenuSeleted(id);
  };

  const handleFeeInsuranceSelect = (item: any) => {
    setFeeInsuranceSelect(item);
    setFee(item.fee);
  };

  const hanldeSetFee = (isSelected: boolean, money: number, id: string) => {
    let result = 0;
    let temp = [];
    if (isSelected) {
      result = fee - money;
      temp = cart.filter((item: string) => item !== id);
    } else {
      result = fee + money;
      temp = [...cart, id];
    }
    setFee(result);
    setCart(temp);
  };

  const hanldeBuyInsurance = () => {
    const dataSubmit = {
      cart: {
        id: data.id,
        listProductSideBenefit: cart,
        periodType: feeInsuranceSelect.periodType,
        periodValue: feeInsuranceSelect.periodValue,
        voucher: voucher || null,
      },
      companyId: data.companyId,
    };
    navigate(BUYER, dataSubmit);
  };

  const handleVoucher = (code: string) => {
    setVoucher(code);
  };

  return (
    <View
      data={data}
      dataTerms={dataTerms}
      menuSeleted={menuSeleted}
      feeInsuranceSelect={feeInsuranceSelect}
      fee={fee}
      voucher={voucher}
      onVoucher={handleVoucher}
      onSetFee={hanldeSetFee}
      onDataFilter={handleDataFilter}
      onFeeInsuranceSelect={handleFeeInsuranceSelect}
      onBuyInsurance={hanldeBuyInsurance}
    />
  );
};

export default DetailProduct;
