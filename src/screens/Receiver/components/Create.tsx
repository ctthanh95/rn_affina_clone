import React from 'react';
import {StyleSheet} from 'react-native';
import {isEmpty} from 'lodash';
import {
  Container,
  AppView,
  AppText,
  FormUser,
  AppButton,
  AppSwitch,
} from '@components';
import Sumary from './Sumary';
import {PRIMARY} from '@utils/colors';
import {TITLE} from '@utils/fontStyle';
import {ms} from '@utils/responsive';

type Props = {
  dataBuyer: any;
  dataReceiver: any;
  isOnePerson: boolean;
  onSwitch: () => void;
  onDataReReceicer: (data: any) => void;
  onReplaceView: (type: string) => void;
  onPayment: () => void;
};

const Create = ({
  dataBuyer,
  dataReceiver,
  isOnePerson,
  onSwitch,
  onDataReReceicer,
  onReplaceView,
  onPayment,
}: Props) => {
  const isEmptyDataReceiver = isEmpty(dataReceiver);

  const handleSubmit = (data: any) => {
    onDataReReceicer(data);
  };

  const handleContinue = () => {
    onDataReReceicer(dataBuyer);
  };

  return (
    <>
      <Container isAuth title="Tạo hợp đồng" isScrollView>
        <AppView paddingHorizontal={ms(23)}>
          <Sumary
            title="Người mua bảo hiểm"
            data={dataBuyer}
            onPress={() => onReplaceView('buyer')}
          />
          {isEmptyDataReceiver ? (
            <AppView marginTop={ms(16)}>
              <AppText style={TITLE[24]} color={PRIMARY}>
                Người được bảo hiểm
              </AppText>
              <AppSwitch
                title="Là người mua bảo hiểm"
                value={isOnePerson}
                onValueChange={onSwitch}
              />
            </AppView>
          ) : (
            <AppView marginTop={ms(16)} marginBottom={ms(20)}>
              <Sumary
                title="Người được bảo hiểm"
                data={dataReceiver}
                onPress={() => onReplaceView('receiver')}
              />
            </AppView>
          )}
        </AppView>
        {isEmptyDataReceiver && !isOnePerson ? (
          <FormUser
            onSubmit={handleSubmit}
            title="Tiếp tục"
            isCodeClient={false}
            isRelationship={true}
          />
        ) : (
          <></>
        )}
      </Container>
      {!isEmptyDataReceiver ? (
        <AppView paddingHorizontal={ms(23)}>
          <AppButton title="thanh toán" onPress={onPayment} />
        </AppView>
      ) : null}
      {isEmptyDataReceiver && isOnePerson ? (
        <AppView paddingHorizontal={ms(23)}>
          <AppButton title="Tiếp tục" onPress={handleContinue} />
        </AppView>
      ) : null}
    </>
  );
};

export default Create;

const styles = StyleSheet.create({
  switch: {transform: [{scaleX: 0.8}, {scaleY: 0.8}]},
});
