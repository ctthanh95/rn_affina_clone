import React from 'react';
import View from './view';
import {navigate} from '@navigation/RootNavigation';
import {REFERRAL_CODE} from '@navigation/screens';

const CreateAccount = () => {
  const handleSubmit = (data: any) => {
    navigate(REFERRAL_CODE);
  };
  return <View onSubmit={handleSubmit} />;
};

export default CreateAccount;
