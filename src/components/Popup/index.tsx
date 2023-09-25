import React from 'react';
import AppButton from '../AppButton';
import AppModal from '../AppModal';
import AppText from '../AppText';
import AppView from '../AppView';
import {WHITE, PRIMARY, BLACK} from '@utils/colors';
import {TITLE, CONTENT} from '@utils/fontStyle';
import {ms} from '@utils/responsive';
import {Sad} from '@utils/svg';

type Props = {
  title: string;
  content: string;
  isModalVisible: boolean;
  onToggleModal: () => void;
  icon?: any;
  footer?: string | JSX.Element | JSX.Element[];
};

const Popup = ({
  icon = <Sad />,
  title,
  content,
  isModalVisible,
  onToggleModal,
  footer,
}: Props) => {
  return (
    <AppModal isModalVisible={isModalVisible} onToggleModal={onToggleModal}>
      <AppView
        marginHorizontal={ms(23)}
        backgroundColor={WHITE}
        radius={ms(44)}
        paddingTop={ms(44)}
        paddingHorizontal={ms(32)}
        paddingBottom={ms(16)}>
        <AppView center>
          {icon}
          <AppText color={PRIMARY} style={TITLE[24]} center marginTop={ms(28)}>
            {title}
          </AppText>
          <AppText
            color={BLACK[100]}
            style={CONTENT.medium_16}
            center
            marginTop={ms(12)}
            marginBottom={ms(28)}>
            {content}
          </AppText>

          {footer ? (
            footer
          ) : (
            <AppButton title="Đã hiểu" onPress={onToggleModal} />
          )}
        </AppView>
      </AppView>
    </AppModal>
  );
};

export default Popup;
