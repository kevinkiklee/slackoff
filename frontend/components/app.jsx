import React from 'react';
import SessionControl from './authentication/session_control';

const App = ({ children }) => (
  <div className='app-container'>
    <nav className='landing-page-nav'>
      <div className='landing-page-logo'>
        SlackOff
      </div>
      <div className='session-control-container'>
        <SessionControl />
      </div>


    </nav>

    <section className='session-form-container'>
      { children }
    </section>

  </div>
);

export default App;
// <img src={ window.assets.landingPage } />

    //



        // <div className="homepage-hero-module">
        //   <div className="video-container">
        //     <div className="filter"></div>
        //     <video autoPlay loop className="fillWidth">
        //       <source src={ window.assets.landingPageVideoMP4 } type="video/mp4" />
        //       <source src={ window.assets.landingPageVideoWEBM } type="video/webm" />
        //     </video>
        //     <div className="poster hidden">
        //       <img src={ window.assets.landingPageImage } alt="" />
        //     </div>
        //   </div>
        // </div>
