import React from 'react';
import SessionControl from './authentication/session_control';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link, withRouter } from 'react-router';

const App = ({ children }) => (
  <div className='app-container'>
    <nav className='landing-page-nav'>
      <div className='landing-page-logo'>
        <Link to='/'>SlackOff</Link>
      </div>
      <div className='session-control-container'>
        <SessionControl />
      </div>
    </nav>

    <div className="homepage-hero-module">
      <div className="video-container">
        <div className="filter"></div>
        <video autoPlay loop className="fillWidth">
          <source src={ window.assets.landingPageVideoMP4 } type="video/mp4" />
          <source src={ window.assets.landingPageVideoWEBM } type="video/webm" />
        </video>
      </div>
    </div>

    <section className='banner-container'>
      <img className='banner-logo' src={ window.assets.bannerLogo }/>
      <div className='banner-title'>
        <h1>Where work happens</h1>
      </div>
      <div className='banner-subtitle'>
        <h2>...sometimes</h2>
      </div>
      <Link className='banner-btn' to='/signup'>SlackOff Today!</Link>
    </section>

    <section className='session-form-container fade'>
      { children }
    </section>
  </div>
);

export default App;
// <img src={ window.assets.landingPage } />

    //
    // <div className="poster hidden">
    //   <img src={ window.assets.landingPageImage } alt="" />
    // </div>
