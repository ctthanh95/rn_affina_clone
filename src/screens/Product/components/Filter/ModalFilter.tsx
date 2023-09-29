import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  AppText,
  AppView,
  DatePicker,
  SelectGroup,
  AppButton,
  Slider,
  SearchInput,
} from '@components';
import {BLACK, PRIMARY, WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms, width} from '@utils/responsive';
import {Close} from '@utils/svg';
import {DATA_SHORT, GENDER_2} from '@utils/constants';
import {schameModalFilter} from '@utils/schema';
import {removeVietnameseTones} from '@utils/global';
import ListHomeInsurance from './ListHomeInsurance';

type Props = {
  data: any;
  isFilterVisible: boolean;
  onModalFilter: () => void;
  onSubmit: (data: any) => void;
};

const WIDTH = 0.85 * width;

const Title = ({title}: {title: string}) => (
  <AppText
    marginBottom={ms(8)}
    style={CONTENT.bold_14}
    color={BLACK[30]}
    paddingLeft={ms(4)}>
    {title.toUpperCase()}
  </AppText>
);

const ModalFilter = ({
  data,
  isFilterVisible,
  onModalFilter,
  onSubmit,
}: Props) => {
  const insets = useSafeAreaInsets();
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [dataProvider, setDataProvider] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schameModalFilter),
  });

  // const isIos = Platform.OS === 'ios';
  // const propagateSwipe = isIos ? true : false;
  // const Wrap = isIos ? Fragment : TouchableOpacity;
  // let props: any = {};
  // if (!isIos) props.activeOpacity = 1;

  useEffect(() => {
    setDataProvider(data);
    setDataFilter(data);
  }, [data]);

  const handleSelectProvider = (id: string) => {
    const arr = getValues('arrProvider');
    if (arr?.length) {
      const isExist = arr.includes(id);
      let result: any;
      if (isExist) {
        result = arr?.filter(item => item !== id);
      } else {
        result = [...arr, id];
      }
      setValue('arrProvider', result);
    } else {
      setValue('arrProvider', [id]);
    }
  };

  const handleResetData = () => {
    setDataFilter(dataProvider);
  };
  const handleSearchProvider = (text: string) => {
    const keySearch = removeVietnameseTones(text);
    const filterData = data.filter((item: any) =>
      removeVietnameseTones(item.providerName).includes(keySearch),
    );
    setDataFilter(filterData);
  };

  const hanleCloseFilter = () => {
    handleResetData();
    onModalFilter();
  };

  const onSubmitSuccess = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal
      // propagateSwipe={true}
      // swipeDirection="right"
      // onSwipeComplete={hanleCloseFilter}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={500}
      animationOutTiming={500}
      statusBarTranslucent
      isVisible={isFilterVisible}
      backdropOpacity={0}
      onBackButtonPress={hanleCloseFilter}
      onBackdropPress={hanleCloseFilter}
      style={styles.container}>
      <AppView
        width={WIDTH}
        height={'100%'}
        backgroundColor={WHITE}
        paddingTop={insets.top}
        paddingHorizontal={ms(23)}>
        <AppView row alignCenter>
          <TouchableOpacity activeOpacity={0.9} onPress={hanleCloseFilter}>
            <Close />
          </TouchableOpacity>
          <AppText flexGrow style={CONTENT.bold_16} color={PRIMARY} center>
            Bộ lọc
          </AppText>
        </AppView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}>
          <AppView marginTop={ms(32)} />
          <Title title="SẮP XẾP THEO MỨC HOA HỒNG" />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <SelectGroup data={DATA_SHORT} onChange={onChange} />
            )}
            name="orderBy"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Slider
                value={value}
                onChange={onChange}
                label="MỨC HOA HỒNG TRONG KHOẢN"
                placeholder="0 - 20%"
                type="percent"
                setScrollEnabled={setScrollEnabled}
              />
            )}
            name="bonus"
          />
          <Title title="PHÙ HỢP VỚI ĐỐI TƯỢNG" />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <SelectGroup data={GENDER_2} onChange={onChange} />
            )}
            name="gender"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <DatePicker
                value={value}
                onChange={onChange}
                label="sinh ngày"
                error={errors?.dob?.message}
              />
            )}
            name="dob"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Slider
                value={value}
                onChange={onChange}
                label="NGÂN SÁCH"
                placeholder="0 - 2.000.000 đ"
                type="money"
                setScrollEnabled={setScrollEnabled}
              />
            )}
            name="amount"
          />
          <Title title="NHÀ BẢO HIỂM" />
          <SearchInput
            onSearch={handleSearchProvider}
            onDelete={handleResetData}
          />
          <ListHomeInsurance
            data={dataFilter}
            onSelectProvider={handleSelectProvider}
          />
          <AppButton title="áp dụng" onPress={handleSubmit(onSubmitSuccess)} />
          {/* <Wrap {...props}> 
          <TouchableOpacity activeOpacity={1}> 
          ropagateSwipe={true}
          swipeDirection="right"
          onSwipeComplete={hanleCloseFilter}
          </Wrap> 
          </TouchableOpacity>  */}
        </ScrollView>
      </AppView>
    </Modal>
  );
};

export default ModalFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: BLACK[50],
    alignItems: 'flex-end',
  },
});
