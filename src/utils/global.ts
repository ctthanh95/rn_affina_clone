import moment from 'moment';
import {isEmpty} from 'lodash';
import md5 from 'md5';
import * as JSEncrypt from '@assets/rsa';
import Config from 'react-native-config';
import {KEY_VALUE} from './constants';
import {WHITE} from './colors';

export const formatPhoneNumber = (phone: string) => phone.padStart(10, '0');

export const formatTime = (
  date: any = new Date(),
  type: string = 'date',
): any => {
  switch (type) {
    case 'date':
      return moment(date).format('DD/MM/YYYY');
    case 'datetime':
      return moment(date).format('HH:mm - DD/MM/YYYY');
    case 'time':
      return moment(date).format('HH:mm');
    case 'value':
      return moment(date).valueOf();
  }
};

export const getTime = (date: any = new Date(), type: string): number => {
  switch (type) {
    case 'month':
      return moment(date).month() + 1;
    case 'year':
      return moment(date).year();
    default:
      return 0;
  }
};
export const hashRSA = (value: string | null): string => {
  const hashMD5 = md5(value);
  const encrypt = new JSEncrypt.JSEncrypt();
  encrypt.setPublicKey(Config.RSA_KEY);
  return encrypt.encrypt(hashMD5);
};

export const numberWithCommas = (value: number): string | number => {
  if (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return 0;
};

export const convertObjectToArray = (obj: any) => {
  let result = Object.keys(obj).map(key => {
    const label = KEY_VALUE.get(key) || key;
    return {label, value: obj[key]};
  });
  return result;
};

export const getAddress = (
  numberHouse: string,
  street: string,
  wardName: string,
  districtName: string,
  cityName: string,
) => {
  const arr = [numberHouse, street, wardName, districtName, cityName];
  const filter = arr.filter(item => !isEmpty(item));
  const address = filter.join(', ');
  return address;
};

export const spreadAddress = (address: string) => {
  if (address) {
    let result = address.trim().split(', ');
    return result;
  }
  return ['', '', '', '', ''];
};

export const getLink = (host: any, link: string) => {
  return `${host}${link}`;
};

export const removeVietnameseTones = (text: string) => {
  let str = text.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  // str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  // str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  // str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  // str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  // str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  // str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  // str = str.replace(
  //   /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
  //   ' ',
  // );
  return str;
};

export const getColorBonus = (bonus: number) => {
  if (bonus) {
    const opacity = bonus / 30;
    // 30 is max opacity =1
    return `rgba(255,228,133,${opacity})`;
  }
  return WHITE;
};

export const removeTagHtml = (value: string) => {
  const regex = /(<([^>]+)>)/gi;
  const result = value.replace(regex, '');
  return result;
};

export const getTimeFromNow = (time: number) => {
  const seconds = moment().diff(moment(time), 'seconds');
  const minutes = moment().diff(moment(time), 'minutes');
  const hours = moment().diff(moment(time), 'hours');

  if (seconds < 60) {
    return `${seconds} giây trước`;
  }
  if (minutes < 60) {
    return `${minutes} phút trước`;
  }
  if (hours < 24) {
    return `${hours} giờ trước`;
  }

  return formatTime(time);
};

export const keyExtractor = (item: any, index: number) => `${item?.id}${index}`;

export const getMonth = (date: Date): string => {
  const month = getTime(date, 'month').toString().padStart(2, '0');
  const year = getTime(date, 'year');
  if (year !== getTime(moment(), 'year')) {
    return `${month}/${year}`;
  }
  return month;
};
