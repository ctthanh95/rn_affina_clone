import React, {useCallback, useMemo, memo, useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppText from '../AppText';
import AppView from '../AppView';
import {CONTENT} from '@utils/fontStyle';
import {BLACK, PRIMARY, WHITE} from '@utils/colors';
import {Search} from '@utils/svg';
import {ms, s, vs} from '@utils/responsive';
import {Portal} from '@gorhom/portal';
import {removeVietnameseTones} from '@utils/global';

type Props = {
  data: any;
  sheetRef: any;
  type: 'city' | 'district' | 'ward';
  onSelectItem: (item: any) => void;
};

const getKey = (type: string): string => {
  switch (type) {
    case 'city':
      return 'cityName';
    case 'district':
      return 'districtsName';
    case 'ward':
      return 'wardsName';
    default:
      return '';
  }
};

const BottomSheetProvince = ({data, sheetRef, type, onSelectItem}: Props) => {
  const insets = useSafeAreaInsets();
  const [text, setText] = useState<string>('');
  const [filteredDataSource, setFilteredDataSource] = useState(data);
  const [masterDataSource, setMasterDataSource] = useState(data);
  const snapPoints = useMemo(() => ['85%'], []);

  const key = getKey(type);

  useEffect(() => {
    setMasterDataSource(data);
    setFilteredDataSource(data);
  }, [data]);

  const onPress = (item: any) => {
    onSelectItem(item);
    sheetRef.current?.close();
    setText('');
    setFilteredDataSource(data);
    setMasterDataSource(data);
  };

  const renderItem = useCallback(
    ({item}: any) => (
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={styles.item}
        activeOpacity={0.9}>
        <AppText style={CONTENT.medium_16}>{item[key]}</AppText>
      </TouchableOpacity>
    ),
    [],
  );
  const searchFilterFunction = useCallback(
    (text: string) => {
      if (text) {
        const newData = masterDataSource.filter((item: any) => {
          const name = item[key];
          const itemData = item ? removeVietnameseTones(name) : '';
          const textData = removeVietnameseTones(text);
          return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setText(text);
      } else {
        setFilteredDataSource(masterDataSource);
        setText(text);
      }
    },
    [text, masterDataSource],
  );

  return (
    <Portal>
      <BottomSheet
        style={styles.container}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        index={-1}
        ref={sheetRef}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        android_keyboardInputMode="adjustPan"
        keyboardBehavior="fillParent"
        handleIndicatorStyle={styles.indicator}>
        <AppView style={styles.wrap} marginTop={insets.top}>
          <Search />
          <BottomSheetTextInput
            style={styles.input}
            onChangeText={text => searchFilterFunction(text)}
            value={text}
            placeholder="Tìm kiếm"
            placeholderTextColor={BLACK[30]}
          />
        </AppView>
        <BottomSheetFlatList
          showsVerticalScrollIndicator={false}
          data={filteredDataSource}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.flatList}
        />
      </BottomSheet>
    </Portal>
  );
};

export default BottomSheetProvince;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(23),
  },
  flatList: {
    backgroundColor: WHITE,
  },
  item: {
    paddingVertical: ms(2),
    marginBottom: ms(16),
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: BLACK[10],
    width: s(50),
    height: vs(4),
  },
  input: {
    marginHorizontal: ms(8),
    flex: 1,
    height: '100%',
    color: PRIMARY,
    ...CONTENT.medium_16,
  },
  wrap: {
    flexDirection: 'row',
    height: vs(48),
    alignItems: 'center',
    backgroundColor: BLACK[3],
    paddingHorizontal: ms(16),
    borderRadius: ms(20),
    borderWidth: 1,
    borderColor: BLACK[3],
    marginBottom: ms(16),
  },
});
