import React from 'react';
import {StyleSheet} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import AppView from '../AppView';
import AppText from '../AppText';
import {BLACK, PRIMARY, SELECT_BUTTON, WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms, s, vs, width} from '@utils/responsive';
import {formatTime, numberWithCommas} from '@utils/global';
import {STEP_MONEY} from '@utils/constants';

type Props = {
  value: any;
  label: string;
  placeholder: string;
  type: 'percent' | 'money';
  onChange: (arr: any) => void;
  setScrollEnabled: any;
};

const WIDTH = 0.85 * width;
const WIDTH_SLIDER = WIDTH - 2 * ms(23) - 2 * ms(8);

const renderValue = (arr: any, type: string) => {
  const [a, b] = arr;
  if (type === 'percent') {
    return `${a}% - ${b}%`;
  } else {
    const money = arr.map((x: number) => x * STEP_MONEY);
    const [x, y] = money;
    return `${numberWithCommas(x)} đ - ${numberWithCommas(y)} đ`;
  }
};

const Slider = ({
  value,
  label,
  placeholder,
  type,
  onChange,
  setScrollEnabled,
}: Props) => {
  const enableScroll = () => {
    setScrollEnabled(true);
  };
  const disableScroll = () => {
    setScrollEnabled(false);
  };
  return (
    <AppView style={styles.container}>
      <AppText style={styles.label}>{label.toUpperCase()}</AppText>
      <AppView style={styles.wrap}>
        <AppText
          style={CONTENT.medium_16}
          color={value ? BLACK[100] : BLACK[30]}>
          {value ? renderValue(value, type) : placeholder}
        </AppText>
      </AppView>
      <AppView paddingHorizontal={ms(8)}>
        <MultiSlider
          values={value ? value : [0, 100]}
          sliderLength={WIDTH_SLIDER}
          onValuesChange={onChange}
          min={0}
          max={100}
          step={1}
          allowOverlap={false}
          snapped
          trackStyle={styles.trackStyle}
          markerStyle={styles.markerStyle}
          selectedStyle={styles.selectedStyle}
          onValuesChangeStart={disableScroll}
          onValuesChangeFinish={enableScroll}
        />
      </AppView>
    </AppView>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    // marginBottom: ms(20),
  },
  label: {
    ...CONTENT.bold_14,
    color: BLACK[30],
    paddingLeft: ms(4),
  },
  wrap: {
    height: vs(48),
    marginTop: ms(8),
    borderWidth: ms(1),
    borderRadius: ms(20),
    borderColor: BLACK[3],
    backgroundColor: BLACK[3],
    paddingHorizontal: ms(16),
    justifyContent: 'center',
  },
  trackStyle: {
    backgroundColor: BLACK[3],
    height: vs(4),
    borderRadius: ms(4),
  },
  markerStyle: {
    backgroundColor: SELECT_BUTTON,
    width: s(16),
    height: s(16),
  },
  selectedStyle: {
    backgroundColor: SELECT_BUTTON,
  },
});
