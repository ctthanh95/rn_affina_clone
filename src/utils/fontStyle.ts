import {ms, vs} from './responsive';

const REGULAR = 'Raleway-Regular';
const BOLD = 'Raleway-Bold';
const SEMIBOLD = 'Raleway-Semibold';
const MEDIUM = 'Raleway-Medium';
const BLACK = 'Raleway-Black';

const getFont = (size: number, weight: number, lineHeight: number) => {
  let fontFamily = '';
  switch (weight) {
    case 100:
    case 200:
    case 300:
    case 400:
      fontFamily = REGULAR;
      break;
    case 500:
      fontFamily = MEDIUM;
      break;
    case 600:
      fontFamily = SEMIBOLD;
      break;
    case 700:
    case 800:
      fontFamily = BOLD;
      break;
    case 900:
      fontFamily = BLACK;
      break;
  }
  return {
    fontFamily,
    fontSize: ms(size),
    // lightHeight: vs(lineHeight),
  };
};

export const LINK = {
  16: {
    ...getFont(16, 700, 24),
    textDecorationLine: 'underline',
  },
  14: {
    ...getFont(14, 700, 20),
    textDecorationLine: 'underline',
  },
  12: {
    ...getFont(12, 700, 16),
    textDecorationLine: 'underline',
  },
};

export const HEADING = {
  40: getFont(40, 600, 48),
  36: getFont(36, 700, 44),
};

export const TITLE = {
  20: getFont(20, 700, 28),
  24: getFont(24, 700, 36),
  36: getFont(36, 600, 44),
};

export const CONTENT = {
  semibold_10: getFont(10, 600, 14),
  bold_10: getFont(10, 800, 14),

  bold_12: getFont(12, 700, 16),
  semibold_12: getFont(12, 600, 16),
  medium_12: getFont(12, 500, 16),

  black_14: getFont(14, 900, 20),
  medium_14: getFont(14, 500, 20),
  semibold_14: getFont(14, 600, 20),
  bold_14: getFont(14, 700, 20),

  medium_16: getFont(16, 500, 24),
  semibold_16: getFont(16, 600, 24),
  bold_16: getFont(16, 700, 24),

  bold_20: getFont(20, 700, 28),

  bold_32: getFont(32, 700, 44),
  medium_32: getFont(32, 500, 44),
};

export const BUTTON = {
  16: getFont(16, 700, 24),
  14: getFont(14, 800, 20),
};
