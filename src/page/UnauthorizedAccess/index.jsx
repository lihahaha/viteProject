import React from "react";
import { ErrorBlock } from "antd-mobile";
import "./index.less";

const Index = () => {
  return (
    <div className="yl-notfound">
      <ErrorBlock
        status="default"
        fullPage
        title="无权限访问"
        description="暂无权限访问该页面，请联系相关负责人"
      />
    </div>
  );
};
export default Index;
