import {WHITE} from '@utils/colors';
import {ms} from '@utils/responsive';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  policies: {
    flexDirection: 'row',
    paddingVertical: ms(12),
    backgroundColor: WHITE,
    borderRadius: ms(16),
    paddingHorizontal: ms(16),
    marginVertical: ms(20),
    alignItems: 'center',
  },
});

export default styles;
