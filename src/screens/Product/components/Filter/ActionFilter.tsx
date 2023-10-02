import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AppView, SearchInput} from '@components';
import {ms} from '@utils/responsive';
import {Filter} from '@utils/svg';
import {PRIMARY} from '@utils/colors';

type Props = {
  onModal: () => void;
  onSearch: (text: string) => void;
  onResetData: () => void;
};

const FilterData = ({onModal, onSearch, onResetData}: Props) => {
  return (
    <AppView>
      <AppView row alignCenter>
        <AppView flex marginRight={ms(12)}>
          <SearchInput onSearch={onSearch} onDelete={onResetData} />
        </AppView>
        <TouchableOpacity activeOpacity={0.9} onPress={onModal}>
          <AppView marginBottom={ms(20)}>
            <Filter fill={PRIMARY} />
          </AppView>
        </TouchableOpacity>
      </AppView>
    </AppView>
  );
};

export default FilterData;
