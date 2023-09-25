import React from 'react';
import View from './view';
import {navigate} from '@navigation/RootNavigation';
import {SECURITY} from '@navigation/screens';

const ReferralCode = () => {
  const handleSubmit = () => {
    navigate(SECURITY);
  };
  return <View onSubmit={handleSubmit} />;
};

export default ReferralCode;
