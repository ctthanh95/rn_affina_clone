import {StyleSheet} from 'react-native';
import {ms} from '@utils/responsive';

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpaceAround: {
    justifyContent: 'space-around',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  absoluteFull: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radiusTop: radius => ({
    borderTopLeftRadius: ms(radius),
    borderTopRightRadius: ms(radius),
  }),
  radiusBottom: radius => ({
    borderBottomLeftRadius: ms(radius),
    borderBottomRightRadius: ms(radius),
  }),
});

export default styles;
