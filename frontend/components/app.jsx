import React from 'react';
import { Link, withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SessionControl from './authentication/session_control';
import Banner from './frontpage/banner';

const App = ({ children }) => (
  <div className='app-container'>
    <nav className='landing-page-nav'>
      <div className='landing-page-logo'>
        <Link to='/'><img src={ window.assets.logoSq } /><h1><span className='green'>Slack</span><span className='yellow'>Off</span></h1></Link>
      </div>
      <div className='session-control-container'>
        <SessionControl />
      </div>
    </nav>

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
