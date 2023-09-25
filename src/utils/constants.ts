import {
  EMPLOYEEPROFILE,
  PERSONAL_INFORMATION,
  SECURITY_SETTING,
} from '@navigation/screens';
import {
  User,
  Career,
  Link,
  Privacy,
  Product,
  Affina,
  Shield,
  Policy,
  Tax,
} from './svg';

export const OTP_LENGTH = 6;

export const GENDER = [
  {
    id: 1,
    title: 'Ông',
  },
  {
    id: 0,
    title: 'Bà',
  },
];

export const GENDER_2 = [
  {
    id: 1,
    title: 'Nam',
  },
  {
    id: 0,
    title: 'Nữ',
  },
];

export const IDENTIFICATION = [
  {
    id: 1,
    title: 'CCCD',
  },
  {
    id: 0,
    title: 'CMND',
  },
  {
    id: 2,
    title: 'Hộ chiếu',
  },
];

export const ACCOUNT_SETTING = [
  {
    id: 1,
    icon: User,
    title: 'Thông tin cá nhân',
    screen: PERSONAL_INFORMATION,
  },
  {
    id: 2,
    icon: Career,
    title: 'Hồ sơ công việc',
    screen: EMPLOYEEPROFILE,
  },
  {
    id: 3,
    icon: Privacy,
    title: 'Thiết lập bảo mật',
    screen: SECURITY_SETTING,
  },
  // {
  //   id: 4,
  //   icon: Link,
  //   title: 'Liên kết đồng nghiệp',
  //   screen: '-',
  // },
  // {
  //   id: 5,
  //   icon: Product,
  //   title: 'Hợp đồng CTV',
  //   screen: '-',
  // },
  // {
  //   id: 6,
  //   icon: Tax,
  //   title: 'Cam kết thuế',
  //   screen: '-',
  // },
];

export const SYSTEM_INFOMATION = [
  {
    id: 1,
    icon: Affina,
    title: 'Thông tin về Affina',
    url: 'https://affina.com.vn/ve-affina',
  },
  {
    id: 2,
    icon: Shield,
    title: 'Chính sách bảo mật',
    url: 'https://affina.com.vn/chinh-sach-bao-mat',
  },
  {
    id: 3,
    icon: Policy,
    title: 'Điều khoản sử dụng',
    url: 'https://affina.com.vn/dieu-khoan-kieu-kien',
  },
];

export const HOME_TAB_TYPE = [
  {
    title: 'Sản phẩm',
    code: 'product',
  },
  {
    title: 'Khách hàng',
    code: 'customer',
  },
];

export const CUSTOMER_TYPE = [
  {
    id: 1,
    title: 'Khách hàng mới',
    color: '#FB8BAC',
  },
  {
    id: 2,
    title: 'Đồng ý tham gia',
    color: '#ACF4C5',
  },
  {
    id: 3,
    title: 'Cần theo dõi',
    color: '#FFE27A',
  },
  {
    id: 4,
    title: 'Không có nhu cầu',
    color: '#0000001A',
  },
];

export const DATA_LICENSE_TYPE = ['CMND', 'CCCD', 'Passport'];

export const GENDER_TYPE = ['Nữ', 'Nam'];

export const KEY_VALUE = new Map([
  ['name', 'Họ tên'],
  ['license', 'License'],
  ['licenseType', 'LicenseTypeName'],
  ['dob', 'Ngày sinh'],
  ['phone', 'SĐT'],
  ['email', 'Email'],
  ['address', 'Địa chỉ'],
]);

export const DATA_SHORT = [
  {
    id: 0,
    title: 'Giảm dần',
  },
  {
    id: 1,
    title: 'Tăng dần',
  },
];

export const DATA_SHORT_TYPE = ['desc', 'asc'];

export const STEP_MONEY = 500000;

export const PERIOD_TYPE = ['Vĩnh viễn', 'năm', 'tháng', 'tuần', 'ngày'];

export const RELATIONSHIP_TYPE = [
  '',
  'Cha/Mẹ',
  'Vợ/Chồng',
  'Anh/Chị/Em',
  'Con',
  'Khác',
];

export const RELATIONSHIP = [
  {
    id: 1,
    title: 'Cha/Mẹ',
  },
  {
    id: 2,
    title: 'Vợ/Chồng',
  },
  {
    id: 3,
    title: 'Anh/Chị/Em',
  },
  {
    id: 4,
    title: 'Con',
  },
  {
    id: 5,
    title: 'Khác',
  },
];
