import React from 'react';
import {useRoute} from '@react-navigation/native';
import View from './view';

const SystemInfomation = () => {
  const router = useRoute();
  const {title, url} = router.params as any;
  return <View title={title} url={url} />;
};

export default SystemInfomation;
