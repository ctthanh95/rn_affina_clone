import {AppText, AppView} from '@components';
import {PRIMARY, RED, WHITE} from './colors';
import {CONTENT} from './fontStyle';

export const toastConfig = {
  success: ({props}: any) => (
    <AppView width={'80%'} padding={12} radius={12} backgroundColor={WHITE}>
      <AppText center style={CONTENT.bold_16} color={PRIMARY}>
        {props.message}
      </AppText>
    </AppView>
  ),
  error: ({props}: any) => (
    <AppView width={'80%'} padding={12} radius={12} backgroundColor={RED}>
      <AppText center style={CONTENT.bold_16} color={WHITE}>
        {props.message}
      </AppText>
    </AppView>
  ),
};
