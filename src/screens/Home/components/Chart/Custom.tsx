import React from 'react';
import {Circle as CircleSvg} from 'react-native-svg';
import {AppView, AppText} from '@components';
import {BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms, s} from '@utils/responsive';
import {numberWithCommas} from '@utils/global';

const RADIUS = s(65);

const CIRCLE_CIRUMFERENCE = 2 * Math.PI * RADIUS;

type Props = {
  item: any;
  total: number;
};

const floorNumber = (value: number) => {
  if (value) return Math.floor(value);
  return 0;
};

export const LabelProduct = ({item, total}: Props) => {
  const percent = floorNumber((item.value / total) * 100);
  return (
    <AppView row marginBottom={ms(8)} alignCenter>
      <AppView
        circle={s(12)}
        backgroundColor={item.color}
        marginRight={ms(4)}
      />
      <AppText style={CONTENT.semibold_10} color={BLACK[100]}>
        {item.title} <AppText style={CONTENT.bold_12}>{percent}%</AppText>
      </AppText>
    </AppView>
  );
};

export const LabelCustomer = ({item}: Props) => {
  return (
    <AppView row marginBottom={ms(8)} alignCenter>
      <AppView
        circle={s(12)}
        backgroundColor={item.color}
        marginRight={ms(4)}
      />
      <AppText style={CONTENT.semibold_10} color={BLACK[100]}>
        {item.title}{' '}
        <AppText style={CONTENT.bold_12}>
          {item.value ? numberWithCommas(item.value) : '0'}
        </AppText>
      </AppText>
    </AppView>
  );
};

const Circle = ({item, total}: Props) => {
  const percent = floorNumber((item.value / total) * 100);
  const strokeDashoffset = floorNumber(
    CIRCLE_CIRUMFERENCE - (CIRCLE_CIRUMFERENCE * percent) / 100,
  );
  return (
    <>
      {item.value ? (
        <CircleSvg
          cx="50%"
          cy="50%"
          r={RADIUS}
          fill="transparent"
          strokeWidth={s(16)}
          strokeLinecap="round"
          originX="90"
          originY="90"
          strokeDasharray={CIRCLE_CIRUMFERENCE}
          stroke={item.color}
          strokeDashoffset={strokeDashoffset}
          rotation={item.rotation}
        />
      ) : null}
    </>
  );
};

export const CircleEmpty = () => (
  <CircleSvg
    cx="50%"
    cy="50%"
    r={RADIUS}
    stroke="#F1F6F9"
    fill="transparent"
    strokeWidth={s(16)}
  />
);

export default Circle;
