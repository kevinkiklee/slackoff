import React from 'react';

const VideoBackground = () => {
  return (
    <div className='video-container'>
      <video autoPlay muted loop poster="" id="banner-video">
        <source src={ window.assets.landingPageVideoMP4 } type="video/mp4" />
        <source src={ window.assets.landingPageVideoWEBM } type="video/webm" />
      </video>
    </div>
  );
}

export default VideoBackground;
