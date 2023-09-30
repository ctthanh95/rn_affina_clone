import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import DatePickerLibrary from 'react-native-date-picker';
import {Calender} from '@utils/svg';
import AppView from '../AppView';
import AppText from '../AppText';
import {BLACK, RED} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms, vs} from '@utils/responsive';
import {formatTime} from '@utils/global';

type Props = {
  value: number | undefined;
  label?: string;
  mode?: 'datetime' | 'date' | 'time';
  error?: any;
  onChange: (date: number) => void;
  minDate?: Date;
  maxDate?: Date;
};

const DatePicker = ({
  value,
  label,
  error,
  onChange,
  mode = 'date',
  minDate = undefined,
  maxDate = new Date(),
}: Props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleOpenCanlender = () => {
    setOpen(true);
  };
  const handleCloseCanlender = () => {
    setOpen(false);
  };
  const handleConfirm = (date: Date) => {
    setOpen(false);
    onChange(formatTime(date, 'value'));
    setDate(date);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={handleOpenCanlender}>
        {label && <AppText style={styles.label}>{label.toUpperCase()}</AppText>}
        <AppView style={styles.wrap}>
          <AppText style={styles.input} color={value ? BLACK[100] : BLACK[30]}>
            {value ? formatTime(value) : 'DD/MM/YYYY'}
          </AppText>
          <Calender />
        </AppView>
        {error && <AppText style={styles.error}>{error}</AppText>}
      </TouchableOpacity>
      <DatePickerLibrary
        modal
        open={open}
        date={date}
        onConfirm={handleConfirm}
        onCancel={handleCloseCanlender}
        mode={mode}
        title="Vui lòng chọn ngày"
        confirmText="Xác nhận"
        cancelText="Huỷ"
        maximumDate={maxDate}
        minimumDate={minDate}
      />
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: ms(20),
  },
  label: {
    ...CONTENT.bold_14,
    color: BLACK[30],
    paddingLeft: ms(4),
  },
  wrap: {
    marginTop: ms(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: ms(1),
    borderRadius: ms(20),
    borderColor: BLACK[3],
    backgroundColor: BLACK[3],
    paddingHorizontal: ms(16),
    height: vs(48),
  },
  input: {
    flex: 1,
    ...CONTENT.medium_16,
  },
  error: {
    color: RED,
    paddingLeft: ms(4),
    fontSize: ms(12),
    marginTop: ms(4),
  },
});
