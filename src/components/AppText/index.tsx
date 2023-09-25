import React from 'react';
import {Text} from 'react-native';
import {ms} from '@utils/responsive';
import {isNumber} from 'lodash';
import {handleMargin, handlePadding} from '@utils/shapes';
import PropTypes from './type';

const AppText = ({
  flex,
  flexShrink,
  flexGrow,
  size = 16,
  color = 'black',
  center,
  right,
  left,
  justify,
  padding,
  margin,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  lineHeight,
  textDecorationLine,
  maxWidth,
  children,
  numberOfLines,
  ...props
}: PropTypes) => {
  const {style} = props;
  const textStyle = [
    flex && {flex: 1},
    flexShrink && {flexShrink: 1},
    flexGrow && {flexGrow: 1},
    color && {color: color},
    center && {textAlign: 'center'},
    right && {textAlign: 'right'},
    left && {textAlign: 'left'},
    justify && {textAlign: 'justify'},
    padding && {...handlePadding(ms(padding))},
    margin && {...handleMargin(ms(margin))},
    paddingTop && {paddingTop: ms(paddingTop)},
    paddingRight && {paddingRight: ms(paddingRight)},
    paddingBottom && {paddingBottom: ms(paddingBottom)},
    paddingLeft && {paddingLeft: ms(paddingLeft)},
    marginBottom && {marginBottom: ms(marginBottom)},
    marginTop && {marginTop: ms(marginTop)},
    marginRight && {marginRight: ms(marginRight)},
    marginLeft && {marginLeft: ms(marginLeft)},
    paddingHorizontal && {paddingHorizontal: ms(paddingHorizontal)},
    paddingVertical && {paddingVertical: ms(paddingVertical)},
    marginHorizontal && {marginHorizontal: ms(marginHorizontal)},
    marginVertical && {marginVertical: ms(marginVertical)},
    isNumber(lineHeight) && {lineHeight: ms(lineHeight)},
    {fontSize: ms(size)},
    textDecorationLine && {textDecorationLine},
    isNumber(maxWidth) && {maxWidth: ms(maxWidth)},
    !isNumber(maxWidth) && {maxWidth},
  ];
  return (
    <Text numberOfLines={numberOfLines} {...props} style={[textStyle, style]}>
      {children || ''}
    </Text>
  );
};

export default AppText;
