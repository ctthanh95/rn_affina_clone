import React, {useMemo} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {AppText, AppView, SearchInput} from '@components';
import CustomerChart from './CustomerChart';
import ListCustomer from './ListCustomer';
import TypeCustomer from './TypeCustomer';
import {CONTENT} from '@utils/fontStyle';
import {BLACK} from '@utils/colors';
import {ms} from '@utils/responsive';
import {Add} from '@utils/svg';

type Props = {
  status: number;
  customerReportData: any;
  customerListtData: any;
  onSetStatus: (status: number) => void;
  onCreateCustomer: () => void;
  onSearch: (key: string) => void;
  onDelete: () => void;
};

const View = ({
  status,
  customerReportData,
  customerListtData,
  onSetStatus,
  onCreateCustomer,
  onSearch,
  onDelete,
}: Props) => {
  const dataCustomer = useMemo(
    () => [
      {
        id: 1,
        title: 'Khách hàng mới',
        count: customerReportData?.newCustomer,
        isNew: customerReportData?.isNewCustomer,
      },
      {
        id: 2,
        title: 'Đồng ý tham gia',
        count: customerReportData?.accept,
        isNew: customerReportData?.isAccept,
      },
      {
        id: 3,
        title: 'Cần theo dõi',
        count: customerReportData?.watching,
        isNew: customerReportData?.isWatching,
      },
      {
        id: 4,
        title: 'Không có nhu cầu',
        count: customerReportData?.notDemand,
        isNew: customerReportData?.isNotDemand,
      },
    ],
    [customerReportData],
  );

  return (
    <AppView flex>
      <CustomerChart customerReportData={customerReportData} />
      <AppView row alignCenter justifySpaceBetween marginBottom={ms(12)}>
        <AppText style={CONTENT.bold_20} color={BLACK[100]}>
          Danh sách khách hàng
        </AppText>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.add}
          onPress={onCreateCustomer}>
          <Add />
        </TouchableOpacity>
      </AppView>
      <TypeCustomer
        data={dataCustomer}
        status={status}
        onSetStatus={onSetStatus}
      />
      <SearchInput onSearch={onSearch} onDelete={onDelete} />
      <AppView style={styles.list} flex>
        <ListCustomer data={customerListtData} />
      </AppView>
    </AppView>
  );
};

export default View;

const styles = StyleSheet.create({
  add: {
    paddingLeft: 50,
  },
  list: {
    minHeight: 50,
  },
});
