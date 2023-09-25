import React, {useState} from 'react';
import {useAppDispatch} from '@hooks/redux';
import {useRoute} from '@react-navigation/native';
import {formatTime, removeVietnameseTones} from '@utils/global';
import {getProductByFilter} from '@sagas/product/getProductByFilter';
import {DATA_SHORT_TYPE, STEP_MONEY} from '@utils/constants';
import View from './view';
import {navigate} from '@navigation/RootNavigation';
import {DETAIL_PRODUCT} from '@navigation/screens';

const Product = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const {data, dob, gender, item} = route.params as any;
  //Modal
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isProgramVisible, setProgramVisible] = useState(false);
  //Program
  const [programSelected, setProgramSelected] = useState(item);
  //Menu
  const [menuData, setMenuData] = useState(data);
  const [menuSeleted, setMenuSeleted] = useState(data[0].id);
  //ListProduct
  const [productData, setProductData] = useState(data[0].listProduct);
  const [productFilterData, setProductFilterData] = useState(
    data[0].listProduct,
  );
  //Filter
  const [filter, setFilter] = useState({
    dob,
    gender,
  });

  const handleModalFilter = () => {
    setFilterVisible(!isFilterVisible);
  };

  const handleModalProgram = () => {
    setProgramVisible(!isProgramVisible);
  };

  const handleProgramSelected = (data: any) => {
    setProgramSelected(data);
    const options: any = {
      dataGet: {
        groupName: data.groupName,
        ...filter,
      },
      callbackSuccess: (data: any) => {
        setMenuData(data);
        setMenuSeleted(data[0].id);
        setProductData(data[0].listProduct);
        setProductFilterData(data[0].listProduct);
        handleModalProgram();
      },
    };
    dispatch(getProductByFilter(options));
  };

  const handleMenuSeleted = (item: any) => {
    setMenuSeleted(item.id);
    setProductData(item.listProduct || []);
    setProductFilterData(item.listProduct || []);
  };

  const handleSearch = (text: string) => {
    const keySearch = removeVietnameseTones(text);
    const filter = productData.filter((item: any) =>
      removeVietnameseTones(item.programName).includes(keySearch),
    );
    setProductFilterData(filter);
  };

  const handleResetData = () => {
    setProductFilterData(productData);
  };

  const handleSubmit = (formData: any) => {
    const {amount, arrProvider, bonus, dob, gender, orderBy} = formData;
    const dataGet: any = {
      dob,
      gender,
      orderBy: DATA_SHORT_TYPE[orderBy],
      groupName: programSelected.groupName,
    };
    if (bonus) {
      dataGet.fromBonus = bonus[0];
      dataGet.toBonus = bonus[1];
    }
    if (amount) {
      dataGet.fromAmount = amount[0] * STEP_MONEY;
      dataGet.toAmount = amount[1] * STEP_MONEY;
    }
    if (arrProvider) {
      const providerId = arrProvider.join(',');
      dataGet.providerId = providerId;
    }
    const options: any = {
      dataGet,
      callbackSuccess: (data: any) => {
        setMenuData(data);
        setMenuSeleted(data[0].id);
        setProductData(data[0].listProduct);
        setProductFilterData(data[0].listProduct);
        setFilter({dob, gender});
        handleModalFilter();
      },
    };
    dispatch(getProductByFilter(options));
  };

  const handleProductDetail = (id: string) => {
    navigate(DETAIL_PRODUCT, {
      filter: {
        id,
        ...filter,
      },
    });
  };

  return (
    <View
      programSelected={programSelected}
      menuData={menuData}
      menuSeleted={menuSeleted}
      product={productFilterData}
      isFilterVisible={isFilterVisible}
      isProgramVisible={isProgramVisible}
      onModalFilter={handleModalFilter}
      onModalProgram={handleModalProgram}
      onMenuSelected={handleMenuSeleted}
      onSearch={handleSearch}
      onResetData={handleResetData}
      onSubmit={handleSubmit}
      onProgramSelected={handleProgramSelected}
      onProductDetail={handleProductDetail}
    />
  );
};

export default Product;
