import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  AppButton,
  Container,
  AppText,
  AppTextInput,
  AppView,
  DismissKeyboard,
  PublicTitle,
} from '@components';
import {Flag} from '@utils/svg';
import {ms} from '@utils/responsive';
import {BLACK} from '@utils/colors';
import {CONTENT} from '@utils/fontStyle';
import {schameSignUp} from '@utils/schema';

type Props = {
  onSubmit: any;
};

const View = ({onSubmit}: Props) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors, isDirty, isValid},
  } = useForm({
    resolver: yupResolver(schameSignUp),
    mode: 'onChange',
  });

  return (
    <Container>
      <DismissKeyboard>
        <AppView
          flex
          paddingHorizontal={ms(23)}
          marginTop={ms(140)}
          justifySpaceBetween>
          <AppView>
            <PublicTitle
              title="Xin Chào Bạn"
              description="Vui lòng nhập số điện thoại của bạn để tiếp tục"
            />
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <AppTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.phoneNumber?.message}
                  label="Số điện thoại"
                  placeholder={'12 345 6789'}
                  keyboardType={'number-pad'}
                  maxLength={10}
                  contentLeft={
                    <AppView row alignCenter marginRight={ms(12)}>
                      <Flag width={ms(48)} height={ms(48)} />
                      <AppText color={BLACK[100]} style={CONTENT.medium_16}>
                        +84
                      </AppText>
                    </AppView>
                  }
                />
              )}
              name="phoneNumber"
            />
          </AppView>
          <AppButton
            title="Tiếp tục"
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty || !isValid}
          />
        </AppView>
      </DismissKeyboard>
    </Container>
  );
};

export default View;
