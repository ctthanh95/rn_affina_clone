import * as yup from 'yup';

export const phoneRegex =
  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

export const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const schameSignUp = yup
  .object({
    phoneNumber: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegex, 'Số điện thoại không hợp lệ'),
  })
  .required();

export const schameCreateAccount = yup
  .object({
    gender: yup.string().default('male'),
    name: yup.string().required('Vui lòng nhập họ tên'),
    birthday: yup.string().required('Vui lòng chọn ngày tháng năm sinh'),
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .matches(emailRegex, 'Email không hợp lệ'),
    apartment_number: yup.string().required('Vui lòng nhập số nhà'),
    street: yup.string().required('Vui lòng nhập đường/ ấp'),
    identifier: yup.string().default('cccd'),
    identifier_code: yup.string().required('Vui lòng nhập mã định danh'),
    tax_code: yup.string().required('Vui lòng nhập mã số thuế'),
  })
  .required();

export const schameCustomer = yup
  .object({
    codeClient: yup.string().default(''),
    gender: yup.number().default(1),
    name: yup.string().required('Vui lòng nhập họ tên'),
    dob: yup.number().required('Vui lòng chọn ngày tháng năm sinh'),
    phone: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegex, 'Số điện thoại không hợp lệ'),
    email: yup
      .string()
      .required('Vui lòng nhập email')
      .matches(emailRegex, 'Email không hợp lệ'),
    numberHouse: yup.string().required('Vui lòng nhập số nhà'),
    street: yup.string().required('Vui lòng nhập đường/ ấp'),
    licenseType: yup.number().default(1),
    license: yup.string().required('Vui lòng nhập mã định danh'),
    cityName: yup.string().required('Vui lòng chọn tỉnh/ thành phố'),
    districtName: yup.string().required('Vui lòng chọn quận/ huyện'),
    wardName: yup.string().required('Vui lòng chọn phường/ xã'),
    buyHelpRelationship: yup.number().default(5),
  })
  .required();

export const schameFilterInsurance = yup
  .object({
    gender: yup.number().default(1),
    dob: yup.number().required('Vui lòng chọn ngày tháng năm sinh'),
  })
  .required();

export const schameModalFilter = yup
  .object({
    orderBy: yup.number().default(0),
    bonus: yup.array(),
    gender: yup.number().default(1),
    dob: yup.number().required('Vui lòng chọn ngày tháng năm sinh'),
    amount: yup.array(),
    arrProvider: yup.array(),
  })
  .required();

export const schemaPayment = yup
  .object({
    startDate: yup.number(),
    redBillCompanyName: yup.string(),
    redBillCompanyAddress: yup.string(),
    redBillCompanyTaxNumber: yup.string(),
  })
  .required();

export const schamePersonalInformation = yup
  .object({
    gender: yup.number().default(1),
    name: yup.string(),
    dob: yup.number(),
    phone: yup.string(),
    email: yup.string(),
    numberHouse: yup.string(),
    street: yup.string(),
    licenseType: yup.number().default(1),
    license: yup.string(),
    cityName: yup.string(),
    districtName: yup.string(),
    wardName: yup.string(),
  })
  .required();

export const schameFilterIncome = yup
  .object({
    fromDate: yup.number().required('Vui lòng chọn ngày bắt đầu'),
    toDate: yup.number().required('Vui lòng chọn ngày kết thúc'),
    providerId: yup.array(),
    programType: yup.array(),
    cityName: yup.string(),
  })
  .required();
