import React, { useEffect, useState } from 'react';
import { microsoftTranslate } from '../../api/microsoftTranslate';

const ApiTranslate: React.FC = () => {
  const [translated, setTranslated] = useState('');

  useEffect(() => {
    const translate = async () => {
      const result = await microsoftTranslate('Hello, friend!', 'hi');
      setTranslated(result);
    };
    translate();
  }, []);

  return <div style={{color: "white"}}>{translated || 'Translating...'}</div>;
};

export default ApiTranslate;
