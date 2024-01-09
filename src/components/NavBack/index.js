import React, { useState } from "react";
import { NavBar } from "antd-mobile";
import styles from "./index.module.less";
import { withRouter } from "react-router-dom";

const Index = ({ history, title, onBack, className }) => {
  const back = () => {
    if (onBack && typeof onBack === "function") {
      onBack();
    } else {
      history.goBack();
    }
  };

  return (
    <>
      <NavBar
        className={`${styles.gobackArea} ${className || ""}`}
        onBack={back}
        backArrow={<div className={styles.gobackBtn}></div>}
      >
        <span className={styles.title}>{title}</span>
      </NavBar>
    </>
  );
};

export default withRouter(Index);
