import React from 'react';
import {Container, AppView, DismissKeyboard} from '@components';
import ActionFilter from './components/Filter/ActionFilter';
import Menu from './components/Menu';
import ModalFilter from './components/Filter/ModalFilter';
import ListProduct from './components/ListProduct';
import Program from './components/Program';
import Header from './components/Header';

const View = ({
  programSelected,
  menuData,
  product,
  menuSeleted,
  isFilterVisible,
  isProgramVisible,
  refreshing,
  onMenuSelected,
  onModalFilter,
  onModalProgram,
  onSearch,
  onResetData,
  onSubmit,
  onProgramSelected,
  onProductDetail,
  onRefresh,
}: Props) => {
  return (
    <>
      <Container>
        <DismissKeyboard>
          <AppView paddingHorizontal={23} flex>
            <Header
              programSelected={programSelected}
              onModalProgram={onModalProgram}
            />
            <Menu
              data={menuData}
              onMenuSelected={onMenuSelected}
              menuSeleted={menuSeleted}
            />
            <ActionFilter
              onModal={onModalFilter}
              onSearch={onSearch}
              onResetData={onResetData}
            />
            <ListProduct
              data={product}
              onProductDetail={onProductDetail}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          </AppView>
        </DismissKeyboard>
      </Container>
      <ModalFilter
        isFilterVisible={isFilterVisible}
        data={menuData}
        onModalFilter={onModalFilter}
        onSubmit={onSubmit}
      />
      <Program
        isProgramVisible={isProgramVisible}
        onModalProgram={onModalProgram}
        onProgramSelected={onProgramSelected}
      />
    </>
  );
};

export default View;

type Props = {
  programSelected: any;
  menuData: any;
  product: any;
  menuSeleted: string;
  isFilterVisible: boolean;
  isProgramVisible: boolean;
  refreshing: boolean;
  onModalFilter: () => void;
  onModalProgram: () => void;
  onMenuSelected: (item: any) => void;
  onSearch: (text: string) => void;
  onResetData: () => void;
  onSubmit: (data: any) => void;
  onProgramSelected: (data: any) => void;
  onProductDetail: (id: string) => void;
  onRefresh: () => void;
};
