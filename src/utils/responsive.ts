import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 822;

// Responsive by width screen. (Image Size)
export const scale = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;

// Responsive by height screen.
export const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;

// Responsive for padding - margin - fontSize.
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const s = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const mvs = moderateVerticalScale;
