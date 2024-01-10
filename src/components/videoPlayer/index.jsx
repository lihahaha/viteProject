import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import EasyPlayer from '@easydarwin/easyplayer';

function Index(props) {
  const videoRef = useRef(null);
  useEffect(() => {
    console.log(videoRef);
    // videoRef.current.ondblclick = () => {
    //   console.log(1);
    // };
  }, []);
  return (
    <easy-player
      ref={videoRef}
      id="player"
      video-url={props.src}
      live={true}
      show-custom-button={false}></easy-player>
  );
}

export default Index;
