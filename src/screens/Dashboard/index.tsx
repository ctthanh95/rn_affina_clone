import React, {useCallback, useRef, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

import View from './view';

const Dashboard = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [introduceCode, setIntroduceCode] = useState('');

  const handleBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <View
      introduceCode={introduceCode}
      bottomSheetRef={bottomSheetRef}
      onBottomSheet={handleBottomSheet}
      setIntroduceCode={setIntroduceCode}
    />
  );
};

export default Dashboard;
