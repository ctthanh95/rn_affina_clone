import {WHITE} from '@utils/colors';
import {ms, vs} from '@utils/responsive';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  gradient: {
    backgroundColor: 'aqua',
    height: vs(256),
    borderBottomRightRadius: ms(72),
    borderBottomLeftRadius: ms(72),
  },
  button: {
    backgroundColor: WHITE,
    borderRadius: ms(16),
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(56),
    marginBottom: ms(16),
  },
});

export default styles;
