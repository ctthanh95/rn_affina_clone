import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {G} from 'react-native-svg';
import {AppView, AppText, Circle} from '@components';
import {ms, vs} from '@utils/responsive';
import {BLACK, PRIMARY, WHITE} from '@utils/colors';
import {Right} from '@utils/svg';
import {CONTENT, LINK, TITLE} from '@utils/fontStyle';
import {numberWithCommas} from '@utils/global';
import {CircleEmpty, LabelContract} from 'src/components/Circle';
import {navigate} from '@navigation/RootNavigation';
import {CONTRACT} from '@navigation/screens';

type Props = {
  dataContract: any;
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

const ContractChart = ({dataContract}: Props) => {
  const {active, draft, expired, paid, unPaid, prepare} = dataContract;
  const total = draft + unPaid + paid + active + expired;

  const data = useMemo(() => {
    const draftAngle = getAngle(draft, total);
    const unPaidAngle = getAngle(unPaid, total);
    const paidAngle = getAngle(paid, total);
    const activeAngle = getAngle(active, total);
    const expiredAngle = draftAngle + unPaidAngle + paidAngle + activeAngle;

    const arr = [
      {
        id: 1,
        color: '#ACF4C5',
        rotation: 0,
        title: 'Hợp đồng nháp',
        value: draft,
      },
      {
        id: 2,
        color: '#6DB0FE',
        rotation: draftAngle,
        title: 'Đang xử lý',
        value: unPaid,
      },
      {
        id: 3,
        color: '#FB8BAC',
        rotation: draftAngle + unPaidAngle,
        title: 'Chờ thanh toán',
        value: paid,
      },
      {
        id: 4,
        color: '#FFE27A',
        rotation: draftAngle + unPaidAngle + paidAngle,
        title: 'Hợp đồng có hiệu lực',
        value: active,
      },
      {
        id: 5,
        color: '#0000001A',
        rotation: expiredAngle,
        title: 'Hợp đồng hết hiệu lực',
        value: expired,
      },
    ];
    return arr;
  }, [dataContract]);

  const handleContract = () => {
    navigate(CONTRACT);
  };

  return (
    <AppView marginBottom={ms(24)}>
      <AppView
        height={vs(216)}
        radius={ms(32)}
        backgroundColor={WHITE}
        padding={ms(16)}>
        <AppView row justifySpaceBetween>
          <AppText style={TITLE[20]} color={PRIMARY}>
            Hợp đồng
          </AppText>
          <TouchableOpacity activeOpacity={0.9} onPress={handleContract}>
            <AppView row alignCenter>
              <AppText style={LINK[14]} color={PRIMARY}>
                Chi tiết
              </AppText>
              <Right />
            </AppView>
          </TouchableOpacity>
        </AppView>
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
                Tổng cộng
              </AppText>
              <AppText style={CONTENT.bold_32} color={BLACK[100]}>
                {total ? numberWithCommas(total) : 0}
              </AppText>
              <AppText style={CONTENT.semibold_10} color={BLACK[100]}>
                hợp đồng
              </AppText>
            </AppView>
          </AppView>
          <AppView flex>
            {data.map(item => (
              <LabelContract key={item.id} item={item} />
            ))}
          </AppView>
        </AppView>
      </AppView>
    </AppView>
  );
};

export default ContractChart;

const styles = StyleSheet.create({});
