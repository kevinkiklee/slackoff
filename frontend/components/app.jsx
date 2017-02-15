import React from 'react';
import SessionControl from './authentication/session_control';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link, withRouter } from 'react-router';

const App = ({ children }) => (
  <div className='app-container'>
    <nav className='landing-page-nav'>
      <div className='landing-page-logo'>
        <Link to='/'><img src={ window.assets.logo } /></Link>
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

      <Link className='banner-btn shadow' to='/signup'>Join SlackOff</Link><br /><br /><br /><br />
      <Link className='guest-btn shadow' to='/login?guest=true'>Guest Login</Link>
    </section>

    <section className='info-container'>
      <div className='info-columns-wrapper'>
        <div className='info-text-container col-1-2'>
          <h4>About SlackOff</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales metus vitae tellus mattis, a sodales metus commodo. Nam ac magna nec dui placerat faucibus id at velit. Fusce sapien massa, accumsan sit amet enim at, convallis hendrerit nibh. Phasellus sagittis elit ut felis maximus, vel imperdiet justo ultrices. Nam faucibus diam quis condimentum imperdiet. Pellentesque volutpat velit ac eros scelerisque, pharetra venenatis eros rutrum.</p><br />
          <p>Curabitur magna eros, congue quis dui id, lobortis vulputate urna. Duis eu purus vestibulum, fringilla risus nec, dictum mi. Quisque justo libero, efficitur non auctor ut, efficitur vitae nulla. Donec pulvinar leo hendrerit mollis vestibulum. Morbi quis interdum nulla. Integer risus ligula, finibus sed tincidunt id pellentesque eget felis. Nunc commodo lorem vel erat convallis blandit.</p>
        </div>
        <div className='info-links-internal-container col-1-4'>
          <h4>Navigation</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales metus vitae tellus mattis, a sodales metus commodo. Nam ac magna nec dui placerat faucibus id at velit. Fusce sapien massa, accumsan sit amet enim at, convallis hendrerit nibh. Phasellus sagittis elit ut felis maximus, vel imperdiet justo ultrices.</p><br />
        </div>
        <div className='info-links-external-container col-1-4'>
          <h4>Resources</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales metus vitae tellus mattis, a sodales metus commodo. Nam ac magna nec dui placerat faucibus id at velit. Fusce sapien massa, accumsan sit amet enim at, convallis hendrerit nibh. Phasellus sagittis elit ut felis maximus, vel imperdiet justo ultrices.</p><br />
        </div>
      </div>
    </section>

    { children }

  </div>
);

export default App;
// <img src={ window.assets.landingPage } />

    //
    // <div className="poster hidden">
    //   <img src={ window.assets.landingPageImage } alt="" />
    // </div>
