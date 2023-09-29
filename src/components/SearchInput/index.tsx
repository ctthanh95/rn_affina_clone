import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {debounce} from 'lodash';
import {BLACK, PRIMARY} from '@utils/colors';
import {ms, vs} from '@utils/responsive';
import {Delete, Search} from '@utils/svg';
import AppView from '../AppView';
import {CONTENT} from '@utils/fontStyle';

type Props = {
  isDisabled?: boolean;
  onPress?: () => void;
  onSearch?: (search: string) => void;
  onDelete?: () => void;
};

const SearchInput = ({
  isDisabled = false,
  onPress,
  onSearch,
  onDelete,
}: Props) => {
  const [value, setValue] = useState('');

  const handleDelete = () => {
    setValue('');
    if (onDelete) onDelete();
  };

  const handleSearch = (text: string) => {
    if (onSearch) onSearch(text);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 1000), []);

  const onChangeText = (text: string) => {
    setValue(text);
    debouncedSearch(text);
  };

  return (
    <>
      {isDisabled ? (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.container}
          onPress={onPress}>
          <Search />
          <TextInput
            placeholder="Tìm kiếm"
            placeholderTextColor={BLACK[30]}
            style={styles.input}
            editable={false}
          />
        </TouchableOpacity>
      ) : (
        <AppView style={styles.container}>
          <Search />
          <TextInput
            placeholder="Tìm kiếm"
            placeholderTextColor={BLACK[30]}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
          />
          {value ? (
            <TouchableOpacity activeOpacity={0.9} onPress={handleDelete}>
              <Delete />
            </TouchableOpacity>
          ) : null}
        </AppView>
      )}
    </>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: vs(48),
    alignItems: 'center',
    backgroundColor: BLACK[3],
    paddingHorizontal: ms(16),
    borderRadius: ms(20),
    borderWidth: 1,
    borderColor: BLACK[3],
    marginBottom: ms(20),
  },
  input: {
    marginHorizontal: ms(8),
    flex: 1,
    height: '100%',
    color: PRIMARY,
    ...CONTENT.medium_16,
  },
});
