import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {AppView, AppText, SearchInput, Checkbox, Empty} from '@components';
import {BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {useAppDispatch} from '@hooks/redux';
import {getCompanyProvider} from '@sagas/config/getCompanyProvider';

type Props = {
  onInsurance: (id: string) => void;
};

const Item = ({item, onSelected}: TItem) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => {
    setIsChecked(!isChecked);
    onSelected(item.id);
  };
  return (
    <AppView style={styles.item}>
      <Checkbox
        isChecked={isChecked}
        onCheckbox={handleChecked}
        children={
          <AppText style={CONTENT.bold_16} numberOfLines={1}>
            {item.name}
            <AppText style={CONTENT.medium_16}>
              {` (${item.numberPackage} sản phẩm)`}
            </AppText>
          </AppText>
        }
      />
    </AppView>
  );
};

const Insurance = ({onInsurance}: Props) => {
  const dispatch = useAppDispatch();
  const [dataInsurance, setDataInsurance] = useState([]);

  const handleGetCompanyProvider = (search?: string | undefined) => {
    const options: any = {
      dataPost: {
        searchValue: search || null,
      },
      callbackSuccess: (data: any) => {
        setDataInsurance(data);
      },
    };
    dispatch(getCompanyProvider(options));
  };

  useEffect(() => {
    handleGetCompanyProvider();
  }, []);

  const lengthData = dataInsurance.length;

  return (
    <AppView>
      <AppText style={CONTENT.bold_14} color={BLACK[30]} marginBottom={ms(20)}>
        NHÀ BẢO HIỂM
      </AppText>
      <SearchInput
        onSearch={handleGetCompanyProvider}
        onDelete={handleGetCompanyProvider}
      />
      {lengthData ? (
        <>
          {dataInsurance.map((item: any, index: number) => (
            <Item item={item} key={item.id} onSelected={onInsurance} />
          ))}
        </>
      ) : (
        <Empty />
      )}
    </AppView>
  );
};

export default Insurance;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ms(12),
    borderBottomWidth: 1,
    borderBottomColor: BLACK[10],
    paddingBottom: ms(12),
  },
});

type TItem = {
  item: any;
  onSelected: (id: string) => void;
};
