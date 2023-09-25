import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {BACKGROUND, BLACK} from '@utils/colors';
import {AppView} from '@components';
import {ms} from '@utils/responsive';
import {useAppSelector} from '@hooks/redux';
import {selectProgram} from '@slices/productSlice';
import {} from 'react-native-gesture-handler';
import TypeProgram from './TypeProgram';
import ListProgram from './ListProgram';

type Props = {
  isProgramVisible: boolean;
  onModalProgram: () => void;
  onProgramSelected: (data: any) => void;
};

const Program = ({
  isProgramVisible,
  onModalProgram,
  onProgramSelected,
}: Props) => {
  const program: any = useAppSelector(selectProgram);
  const [programSelected, setProgramSelected] = useState(program[0]?.id);
  const [programList, setProgramList] = useState(program[0]?.programList);
  const handleProgramSelecte = (item: any) => {
    setProgramSelected(item.id);
    setProgramList(item.programList);
  };

  return (
    <Modal
      statusBarTranslucent
      isVisible={isProgramVisible}
      backdropOpacity={0}
      onBackButtonPress={onModalProgram}
      onBackdropPress={onModalProgram}
      style={styles.container}>
      <AppView
        paddingTop={ms(16)}
        alignSelf="center"
        backgroundColor={BACKGROUND}
        radius={ms(20)}
        width="90%"
        height="50%">
        <AppView flex>
          <TypeProgram
            data={program}
            programSelected={programSelected}
            onProgramSelecte={handleProgramSelecte}
          />
          <ListProgram data={programList} onSelectItem={onProgramSelected} />
        </AppView>
      </AppView>
    </Modal>
  );
};

export default Program;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: BLACK[50],
  },
});
