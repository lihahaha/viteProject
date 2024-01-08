import React, { useState, useEffect, useRef } from 'react';
import style from './index.module.less';
import VideoPlayer from '@/components/videoPlayer';

const Index = ({ history }) => {
  return (
    <div className={style.homePage}>
      <div className={style.header}>
        <div className={style.title}>中原城管H5</div>
      </div>
      <div className={style.content}>
        <VideoPlayer src={'https://vjs.zencdn.net/v/oceans.mp4'}></VideoPlayer>
      </div>
    </div>
  );
};
export default Index;
