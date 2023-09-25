import React, {useState} from 'react';
import View from './view';

const Link = () => {
  const [code, setCode] = useState('15454555');
  const [link, setLink] = useState('https://affina.com.vn/invite/ma_moi');
  const [introduceCode, setIntroduceCode] = useState('');

  return (
    <View
      code={code}
      link={link}
      introduceCode={introduceCode}
      setIntroduceCode={setIntroduceCode}
    />
  );
};

export default Link;
