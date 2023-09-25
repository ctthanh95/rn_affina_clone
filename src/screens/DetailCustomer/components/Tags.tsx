import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {AppView, AppText} from '@components';
import {WHITE} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Dropdown} from '@utils/svg';
import {CUSTOMER_TYPE} from '@utils/constants';

type Props = {
  status: number;
  onOpenBottomSheet: () => void;
};

const Tags = ({status, onOpenBottomSheet}: Props) => {
  const customerType = useMemo(
    () => CUSTOMER_TYPE.find(element => element.id === status),
    [status],
  );
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onOpenBottomSheet}>
      <AppView
        overflow="hidden"
        row
        alignCenter
        radius={ms(16)}
        alignSelf="flex-start"
        paddingVertical={ms(4)}
        paddingHorizontal={ms(12)}
        backgroundColor={customerType?.color}>
        <AppText style={CONTENT.semibold_14} color={WHITE} marginRight={ms(8)}>
          {customerType?.title}
        </AppText>
        <Dropdown />
      </AppView>
    </TouchableOpacity>
  );
};

export default Tags;
