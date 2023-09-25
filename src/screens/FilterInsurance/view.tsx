import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  AppButton,
  Container,
  AppView,
  DismissKeyboard,
  PublicTitle,
  SelectGroup,
  DatePicker,
  AppText,
} from '@components';
import {ms} from '@utils/responsive';
import {GENDER_2} from '@utils/constants';
import {schameFilterInsurance} from '@utils/schema';
import {CONTENT} from '@utils/fontStyle';
import {BLACK} from '@utils/colors';

type Props = {onSubmit: (data: any) => void};

const View = ({onSubmit}: Props) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schameFilterInsurance),
  });

  return (
    <Container isPublic>
      <DismissKeyboard>
        <AppView paddingHorizontal={23} marginTop={ms(56)} flex>
          <AppView flex>
            <PublicTitle title="Lựa chọn nhu cầu bảo hiểm" />
            <AppText
              marginBottom={ms(8)}
              style={CONTENT.bold_14}
              color={BLACK[30]}
              paddingLeft={ms(4)}>
              {'Phù hợp với đối tượng'.toUpperCase()}
            </AppText>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <SelectGroup data={GENDER_2} onChange={onChange} />
              )}
              name="gender"
            />
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <DatePicker
                  value={value}
                  onChange={onChange}
                  label="sinh ngày"
                  error={errors?.dob?.message}
                />
              )}
              name="dob"
            />
          </AppView>
          <AppButton title="áp dụng" onPress={handleSubmit(onSubmit)} />
        </AppView>
      </DismissKeyboard>
    </Container>
  );
};

export default View;
