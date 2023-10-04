import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {Portal} from '@gorhom/portal';
import {BLACK} from '@utils/colors';
import {s, vs} from '@utils/responsive';

type Props = {
  sheetRef: any;
  points?: string[];
  children: string | JSX.Element | JSX.Element[];
  isScroll?: boolean;
  enablePanDownToClose?: boolean;
  onClose?: () => void;
};

const AppBottomSheet = ({
  sheetRef,
  points = ['20%'],
  isScroll = false,
  children,
  enablePanDownToClose = true,
  onClose,
}: Props) => {
  const snapPoints = useMemo(() => points, []);
  const Wrap = isScroll ? BottomSheetScrollView : BottomSheetView;

  return (
    <Portal>
      <BottomSheet
        index={-1}
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
        handleIndicatorStyle={styles.indicator}
        backdropComponent={props => (
          <BottomSheetBackdrop
            onPress={() => {
              if (onClose) onClose();
            }}
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}>
        <Wrap style={styles.container} showsVerticalScrollIndicator={false}>
          {children}
        </Wrap>
      </BottomSheet>
    </Portal>
  );
};

export default AppBottomSheet;

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: BLACK[10],
    width: s(50),
    height: vs(4),
  },
  container: {
    flex: 1,
  },
});
