import React from 'react';
import {AppView, AppText} from '@components';
import {LIGHT_BACKGROUND, PRIMARY} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';

type Props = {
  data: any;
};

const Benefit = ({data}: Props) => {
  const lengthData = data?.length;
  return (
    <>
      {lengthData ? (
        <AppView paddingRight={ms(16)} marginBottom={ms(8)}>
          {data.map((element: any) => (
            <AppView
              key={element.id}
              marginBottom={ms(8)}
              backgroundColor={LIGHT_BACKGROUND}
              radius={ms(8)}
              paddingVertical={ms(4)}
              paddingHorizontal={ms(12)}>
              <AppText style={CONTENT.semibold_12} color={PRIMARY}>
                {element.name}
              </AppText>
            </AppView>
          ))}
        </AppView>
      ) : null}
    </>
  );
};

export default Benefit;
