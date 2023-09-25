import React, {useState, useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MonthPicker from 'react-native-month-year-picker';
import Svg, {G} from 'react-native-svg';
import {Portal} from '@gorhom/portal';
import moment from 'moment';
import {AppView, AppText} from '@components';
import {ms, s, vs} from '@utils/responsive';
import {BLACK, WHITE} from '@utils/colors';
import {Calender} from '@utils/svg';
import {CONTENT, TITLE} from '@utils/fontStyle';
import {getTime, numberWithCommas} from '@utils/global';
import Circle, {CircleEmpty, LabelProduct} from './Custom';

type Props = {
  date: Date;
  setDate: (date: Date) => void;
  productReportData: any;
};

const getMonth = (date: Date): string => {
  const month = getTime(date, 'month').toString().padStart(2, '0');
  const year = getTime(date, 'year');
  if (year !== getTime(moment(), 'year')) {
    return `${month}/${year}`;
  }
  return month;
};

const getAngle = (value: number, total: number): number =>
  (value / total) * 360;

const getRatio = (current: number, previous: number) => {
  const subtract = Math.abs(current - previous);
  if (previous === 0 && current === 0) return '';
  if (previous === 0 && current !== 0) return `tăng ${subtract * 100}%`;
  const ratio = Math.round((subtract / previous) * 100);
  if (current > previous) return `tăng ${ratio}%`;
  if (current < previous) return `giảm ${ratio}%`;
};

const ProductChart = ({date, setDate, productReportData}: Props) => {
  const [show, setShow] = useState(false);

  const {assets, other, people, travel, prevRevenue, totalRevenue} =
    productReportData;

  const data = useMemo(() => {
    const assetsAngle = getAngle(assets, totalRevenue);
    const peopleAngle = getAngle(people, totalRevenue);
    const travelAngle = getAngle(travel, totalRevenue);
    const otherAngle = assetsAngle + travelAngle + peopleAngle;
    const arr = [
      {
        id: 1,
        color: '#FB8BAC',
        rotation: 0,
        title: 'Sản phẩm sức khoẻ',
        value: people,
      },
      {
        id: 2,
        color: '#6DB0FE',
        rotation: peopleAngle,
        title: 'Sản phẩm tài sản',
        value: assets,
      },
      {
        id: 3,
        color: '#ACF4C5',
        rotation: assetsAngle + peopleAngle,
        title: 'Sản phẩm du lịch',
        value: travel,
      },
      {
        id: 4,
        color: '#FFE27A',
        rotation: otherAngle,
        title: 'Sản phẩm khác',
        value: other,
      },
    ];
    return arr;
  }, [productReportData]);

  const showPicker = useCallback((value: boolean) => {
    setShow(value);
  }, []);

  const onValueChange = useCallback(
    (event: any, newDate: Date) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  return (
    <>
      <AppView marginBottom={ms(24)}>
        <AppView
          height={vs(216)}
          radius={ms(32)}
          backgroundColor={WHITE}
          padding={ms(16)}>
          <AppView row justifySpaceBetween>
            <AppText style={TITLE[20]}>
              Tổng quan tháng {getMonth(date)}
            </AppText>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => showPicker(true)}>
              <Calender />
            </TouchableOpacity>
          </AppView>
          <AppView row center>
            <AppView center>
              <Svg height="160" width="160" viewBox="0 0 180 180">
                <G rotation={-90} originX="90" originY="90">
                  {totalRevenue > 0 ? (
                    <>
                      {data.map(item => (
                        <Circle
                          key={item.id}
                          item={item}
                          total={totalRevenue}
                        />
                      ))}
                    </>
                  ) : (
                    <CircleEmpty />
                  )}
                </G>
              </Svg>
              <AppView absolute center>
                <AppText style={CONTENT.semibold_10} color={BLACK[100]}>
                  Doanh thu
                </AppText>
                <AppText style={CONTENT.bold_32} color={BLACK[100]}>
                  {totalRevenue ? numberWithCommas(totalRevenue) : 0} tr
                </AppText>
                <AppText style={CONTENT.semibold_10} color={BLACK[100]}>
                  {getRatio(totalRevenue, prevRevenue)}
                </AppText>
              </AppView>
            </AppView>
            <AppView flex>
              {data.map(item => (
                <LabelProduct key={item.id} item={item} total={totalRevenue} />
              ))}
            </AppView>
          </AppView>
        </AppView>
      </AppView>
      <Portal>
        {show && (
          <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={new Date(2020)}
            maximumDate={new Date()}
            locale="vi"
            okButton="Chọn"
            cancelButton="Huỷ"
          />
        )}
      </Portal>
    </>
  );
};

export default ProductChart;

const styles = StyleSheet.create({});
