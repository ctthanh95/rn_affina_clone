import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Svg, {G} from 'react-native-svg';
import moment from 'moment';
import {AppView, AppText} from '@components';
import {ms, vs} from '@utils/responsive';
import {BLACK, WHITE} from '@utils/colors';
import {CONTENT, TITLE} from '@utils/fontStyle';
import {getTime, numberWithCommas} from '@utils/global';
import Circle, {CircleEmpty, LabelCustomer} from './Custom';

type Props = {
  customerReportData: any;
};

const getAngle = (value: number, total: number): number =>
  (value / total) * 360;

const CustomerChart = ({customerReportData}: Props) => {
  const month = getTime(moment(), 'month').toString().padStart(2, '0');
  const {accept, newCustomer, notDemand, watching} = customerReportData;
  const total = accept + newCustomer + notDemand + watching;

  const data = useMemo(() => {
    const newCustomerAngle = getAngle(newCustomer, total);
    const acceptAngle = getAngle(accept, total);
    const watchingAngle = getAngle(watching, total);
    const notDemandAngle = acceptAngle + newCustomerAngle + watchingAngle;
    const arr = [
      {
        id: 1,
        color: '#FB8BAC',
        rotation: 0,
        title: 'Khách hàng mới',
        value: newCustomer,
      },
      {
        id: 2,
        color: '#ACF4C5',
        rotation: newCustomerAngle,
        title: 'Đồng ý tham gia',
        value: accept,
      },
      {
        id: 3,
        color: '#6DB0FE',
        rotation: acceptAngle + newCustomerAngle,
        title: 'Cần theo dõi',
        value: watching,
      },
      {
        id: 4,
        color: '#FFE27A',
        rotation: notDemandAngle,
        title: 'Không có nhu cầu',
        value: notDemand,
      },
    ];
    return arr;
  }, [customerReportData]);

  return (
    <AppView marginBottom={ms(24)}>
      <AppView
        height={vs(216)}
        radius={ms(32)}
        backgroundColor={WHITE}
        padding={ms(16)}>
        <AppView>
          <AppText style={TITLE[20]}>Tổng quan tháng {month}</AppText>
          <AppView row center>
            <AppView center>
              <Svg height="160" width="160" viewBox="0 0 180 180">
                <G rotation={-90} originX="90" originY="90">
                  {total > 0 ? (
                    <>
                      {data.map(item => (
                        <Circle key={item.id} item={item} total={total} />
                      ))}
                    </>
                  ) : (
                    <CircleEmpty />
                  )}
                </G>
              </Svg>
              <AppView absolute center>
                <AppText style={CONTENT.semibold_10} color={BLACK[100]}>
                  Khách hàng
                </AppText>
                <AppText style={CONTENT.bold_32} color={BLACK[100]}>
                  {total ? numberWithCommas(total) : 0}
                </AppText>
                <AppText style={CONTENT.semibold_10} color={BLACK[100]}>
                  người
                </AppText>
              </AppView>
            </AppView>
            <AppView flex>
              {data.map(item => (
                <LabelCustomer key={item.id} item={item} total={total} />
              ))}
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    </AppView>
  );
};

export default CustomerChart;

const styles = StyleSheet.create({});
