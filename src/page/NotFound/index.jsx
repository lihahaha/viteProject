import React from 'react';
import { ErrorBlock } from 'antd-mobile-v5';
import './index.less';

const Index = () => {
  return (
    <div className="yl-notfound">
      <ErrorBlock status="empty" fullPage />
    </div>
  );
};
export default Index;
