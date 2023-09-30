import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {AppText, AppView} from '@components';
import {WIDTH, ms, s, vs} from '@utils/responsive';
import {BLACK, WHITE} from '@utils/colors';
import {CONTENT, TITLE} from '@utils/fontStyle';
import {Filter} from '@utils/svg';
import {getMonth, numberWithCommas} from '@utils/global';
import moment from 'moment';

type Props = {
  data: any;
  total: number;
  onToggleModal: () => void;
};

const DATA = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#0055D4',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#00B2FF',
  backgroundGradientToOpacity: 0.25,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, //grid color
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, //label color
  propsForDots: {
    r: '6',
    strokeWidth: '4',
    stroke: WHITE,
  },
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional,
};

const IncomeChart = ({data, total, onToggleModal}: Props) => {
  const dataDate = useMemo(() => {
    const result = data.map((item: any) => moment(item.date).format('DD/MM'));
    return result;
  }, [data]);

  const dataTotal = useMemo(() => {
    const result = data.map((item: any) => item.total);
    return result;
  }, [data]);

  const dataChart = {
    labels: dataDate,
    datasets: [
      {
        data: dataTotal,
        color: (opacity = 1) => `rgba(83, 203, 255, ${opacity})`, // dot color
      },
    ],
  };

  const getWidthChart = useMemo(() => {
    const lengthData = data.length;
    // const lengthData = DATA.labels.length;
    const width = lengthData * s(50);
    const WIDTH_CHART_SCREEN = WIDTH - 2 * ms(20);
    return width > WIDTH_CHART_SCREEN ? width : WIDTH_CHART_SCREEN;
  }, [data]);

  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    index: 0,
  });

  return (
    <AppView style={styles.container} backgroundColor={'#0055D4'}>
      <AppView row justifySpaceBetween marginBottom={ms(20)}>
        <AppText style={TITLE[20]} color={WHITE}>
          Tổng quan tháng {getMonth(new Date())}
        </AppText>
        <TouchableOpacity activeOpacity={0.9} onPress={onToggleModal}>
          <Filter fill={WHITE} />
        </TouchableOpacity>
      </AppView>
      <ScrollView
        bounces={false}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <LineChart
          style={styles.chart}
          bezier
          // fromZero
          data={dataChart}
          // data={DATA}
          width={getWidthChart}
          height={vs(200)}
          chartConfig={chartConfig}
          yAxisSuffix=" tr"
          yAxisInterval={1}
          xLabelsOffset={5}
          onDataPointClick={
            data => {
              // check if we have clicked on the same point again
              let isSamePoint =
                tooltipPos.x === data.x && tooltipPos.y === data.y;
              // if clicked on the same point again toggle visibility
              // else,render tooltip to new position and update its value
              isSamePoint
                ? setTooltipPos(previousState => {
                    return {
                      ...previousState,
                      visible: !previousState.visible,
                    };
                  })
                : setTooltipPos({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                    index: data.index,
                  });
            } // end function
          }
          decorator={() => {
            return tooltipPos.visible ? (
              <AppView
                width={s(120)}
                height={vs(50)}
                left={tooltipPos.x - s(60)}
                top={tooltipPos.y + vs(10)}
                center
                absolute
                alignStart
                backgroundColor={WHITE}
                radius={ms(8)}>
                <AppText
                  center
                  style={CONTENT.bold_10}
                  color={BLACK[100]}
                  marginBottom={ms(4)}>
                  Ngày {dataDate[tooltipPos.index]}
                </AppText>
                <AppView row alignCenter>
                  <AppView circle={s(10)} backgroundColor="#ACF4C5" />
                  <AppText
                    style={CONTENT.semibold_10}
                    color={BLACK[100]}
                    marginHorizontal={ms(4)}>
                    Doanh thu
                  </AppText>
                  <AppText style={CONTENT.bold_10} color={BLACK[100]}>
                    {numberWithCommas(dataTotal[tooltipPos.index])} tr
                  </AppText>
                </AppView>
              </AppView>
            ) : null;
          }}
        />
      </ScrollView>
      <AppView row justifySpaceBetween marginTop={ms(20)} alignCenter>
        <AppText style={CONTENT.bold_12} color={WHITE}>
          Hoa hồng tạm tính
        </AppText>
        <AppText style={CONTENT.bold_16} color={WHITE}>
          {total ? numberWithCommas(total) : 0} đ
        </AppText>
      </AppView>
    </AppView>
  );
};

export default IncomeChart;

const styles = StyleSheet.create({
  container: {
    borderRadius: ms(32),
    marginBottom: ms(20),
    paddingHorizontal: ms(20),
    paddingTop: ms(24),
    paddingBottom: ms(20),
  },
  chart: {
    marginBottom: ms(25),
  },
});
