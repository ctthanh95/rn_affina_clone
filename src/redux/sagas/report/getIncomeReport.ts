import {call, put} from 'redux-saga/effects';
import {createAction} from '@reduxjs/toolkit';
import handleSaga from '../handleSaga';
import {updateErrorSlice} from '@slices/errorSlice';
import {getIncomeReportApi} from '@api/report';

export const getIncomeReport = createAction('GET_INCOME_REPORT');

export function* getIncomeReportSaga(options: any) {
  const {
    type,
    payload: {dataPost, callbackSuccess},
  } = options;
  try {
    function* execution() {
      const {code, message, data} = yield call(getIncomeReportApi, dataPost);

      console.log(code, dataPost);
      switch (code) {
        case '200':
          const temp = {
            list: [
              {date: 1693501200000, total: 10},
              {date: 1693587600000, total: 70},
              {date: 1693674000000, total: 80},
              {date: 1693760400000, total: 40},
              {date: 1693846800000, total: 90},
              {date: 1693933200000, total: 60},
              {date: 1694019600000, total: 70},
              {date: 1694106000000, total: 40},
              {date: 1694192400000, total: 20},
              {date: 1694278800000, total: 50},
              {date: 1694365200000, total: 90},
              {date: 1694451600000, total: 80},
              {date: 1694538000000, total: 30},
              {date: 1694624400000, total: 60},
              {date: 1694710800000, total: 120},
              {date: 1694797200000, total: 50},
              {date: 1694883600000, total: 90},
              {date: 1694970000000, total: 40},
              {date: 1695056400000, total: 70},
              {date: 1695142800000, total: 70},
              {date: 1695229200000, total: 30},
              {date: 1695315600000, total: 40},
              {date: 1695402000000, total: 90},
              {date: 1695488400000, total: 80},
              {date: 1695574800000, total: 50},
              {date: 1695661200000, total: 50},
              {date: 1695747600000, total: 90},
              {date: 1695834000000, total: 90},
              {date: 1695920400000, total: 100},
              {date: 1696006800000, total: 80},
            ],
            totalBonus: 1930000000,
          };
          const result = dataPost?.cityCode ? temp : data;
          callbackSuccess(result);
          break;
        default:
          yield put(
            updateErrorSlice({
              title: 'Lỗi',
              content: message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau',
            }),
          );
          break;
      }
    }
    yield handleSaga(execution, type);
  } catch (error) {
    console.log('error,', error);
  }
}
