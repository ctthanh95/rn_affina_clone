import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  AppButton,
  Container,
  AppView,
  DismissKeyboard,
  PublicTitle,
  SelectGroup,
  AppTextInput,
  Checkbox,
  DatePicker,
  AppText,
} from '@components';
import {ms} from '@utils/responsive';
import {TouchableOpacity} from 'react-native';
import {GENDER, IDENTIFICATION} from '@utils/constants';
import {Down, Info} from '@utils/svg';
import {schameCreateAccount} from '@utils/schema';
import ImageSelect from './components/ImageSelect';
import {CONTENT} from '@utils/fontStyle';
import styles from './styles';

type Props = {onSubmit: (data: any) => void};

const Description = () => (
  <AppText style={[styles.regular, CONTENT.medium_14]}>
    Tôi đồng ý với{' '}
    <AppText style={[CONTENT.bold_14, styles.bold]}>điều khoản sử dụng</AppText>
    <AppText> và </AppText>
    <AppText style={[CONTENT.bold_14, styles.bold]}>
      chính sách bảo mật{' '}
    </AppText>
    <AppText> của Affina</AppText>
  </AppText>
);

const View = ({onSubmit}: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [imageFont, setImageFont] = useState('');
  const [imageBack, setImageBack] = useState('');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schameCreateAccount),
  });

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Container isPublic isScrollView>
      <DismissKeyboard>
        <AppView flex paddingHorizontal={23} marginTop={ms(56)}>
          <PublicTitle title="Tạo Tài Khoản" />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <SelectGroup data={GENDER} onChange={onChange} />
            )}
            name="gender"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.name?.message}
                label="Họ và tên"
                placeholder="Nguyễn Văn A"
              />
            )}
            name="name"
          />
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <DatePicker
                value={value}
                onChange={onChange}
                label="Ngày tháng năm sinh"
                error={errors?.birthday?.message}
              />
            )}
            name="birthday"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.email?.message}
                label="Email"
                placeholder="username@tenmien.com"
                keyboardType="email-address"
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.apartment_number?.message}
                label="địa chỉ"
                placeholder="Số nhà"
                marginBottom={0}
              />
            )}
            name="apartment_number"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.street?.message}
                placeholder="Đường/ ấp"
                marginBottom={0}
              />
            )}
            name="street"
          />
          <AppTextInput
            // error
            placeholder="Tỉnh/ thành phố"
            marginBottom={0}
            contentRight={
              <TouchableOpacity activeOpacity={0.9}>
                <Down />
              </TouchableOpacity>
            }
            editable={false}
          />
          <AppTextInput
            // error
            placeholder="Quận/ huyện"
            marginBottom={0}
            contentRight={
              <TouchableOpacity activeOpacity={0.9}>
                <Down />
              </TouchableOpacity>
            }
            editable={false}
          />
          <AppTextInput
            // error
            placeholder="Phường/ xã"
            contentRight={
              <TouchableOpacity activeOpacity={0.9}>
                <Down />
              </TouchableOpacity>
            }
            editable={false}
          />
          <Controller
            control={control}
            render={({field: {onChange}}) => (
              <SelectGroup data={IDENTIFICATION} onChange={onChange} />
            )}
            name="identifier"
          />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.identifier_code?.message}
                label="Mã định danh"
                placeholder="Số CMND/ CCCD hoặc passport"
                keyboardType="number-pad"
              />
            )}
            name="identifier_code"
          />
          <AppView row marginBottom={ms(20)}>
            <AppView flex>
              <ImageSelect imageUri={imageFont} setImageUri={setImageFont} />
            </AppView>
            <AppView width={ms(10)} />
            <AppView flex>
              <ImageSelect imageUri={imageBack} setImageUri={setImageBack} />
            </AppView>
          </AppView>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.tax_code?.message}
                label="Mã số thuế"
                placeholder="Số CMND/ CCCD hoặc passport"
                keyboardType="number-pad"
                labelRight={
                  <TouchableOpacity activeOpacity={0.9}>
                    <Info />
                  </TouchableOpacity>
                }
              />
            )}
            name="tax_code"
          />
          <Checkbox
            isChecked={isChecked}
            onCheckbox={handleCheckbox}
            children={<Description />}
          />
          <AppView height={ms(20)} />
          <AppButton
            title="Tiếp tục"
            disabled={!isChecked}
            onPress={handleSubmit(onSubmit)}
          />
        </AppView>
      </DismissKeyboard>
    </Container>
  );
};

export default View;
