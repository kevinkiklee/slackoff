import React from 'react';
import { Link, withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Navbar from './frontpage/navbar'
import Banner from './frontpage/banner';

const App = ({ children }) => (
  <div className='app-container'>
    <Navbar />

    <div className='video-container'>
      <video autoPlay muted loop poster="" id="banner-video">
        <source src={ window.assets.landingPageVideoMP4 } type="video/mp4" />
        <source src={ window.assets.landingPageVideoWEBM } type="video/webm" />
      </video>
    </div>

    <Banner />

    { children }

  </div>
);

export default App;
