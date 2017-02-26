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



    //
    // <div className='video-container'>
    //   <video autoPlay muted loop poster="" id="banner-video">
    //     <source src={ window.assets.landingPageVideoMP4 } type="video/mp4" />
    //     <source src={ window.assets.landingPageVideoWEBM } type="video/webm" />
    //   </video>
    // </div>






//
// <section className='info-container'>
//   <div className='info-columns-wrapper'>
//     <div className='info-text-container col-1-2'>
//       <h4>About SlackOff</h4>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales metus vitae tellus mattis, a sodales metus commodo. Nam ac magna nec dui placerat faucibus id at velit. Fusce sapien massa, accumsan sit amet enim at, convallis hendrerit nibh. Phasellus sagittis elit ut felis maximus, vel imperdiet justo ultrices. Nam faucibus diam quis condimentum imperdiet. Pellentesque volutpat velit ac eros scelerisque, pharetra venenatis eros rutrum.</p><br />
//       <p>Curabitur magna eros, congue quis dui id, lobortis vulputate urna. Duis eu purus vestibulum, fringilla risus nec, dictum mi. Quisque justo libero, efficitur non auctor ut, efficitur vitae nulla. Donec pulvinar leo hendrerit mollis vestibulum. Morbi quis interdum nulla. Integer risus ligula, finibus sed tincidunt id pellentesque eget felis. Nunc commodo lorem vel erat convallis blandit.</p>
//     </div>
//     <div className='info-links-internal-container col-1-4'>
//       <h4>Navigation</h4>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales metus vitae tellus mattis, a sodales metus commodo. Nam ac magna nec dui placerat faucibus id at velit. Fusce sapien massa, accumsan sit amet enim at, convallis hendrerit nibh. Phasellus sagittis elit ut felis maximus, vel imperdiet justo ultrices.</p><br />
//     </div>
//     <div className='info-links-external-container col-1-4'>
//       <h4>Resources</h4>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales metus vitae tellus mattis, a sodales metus commodo. Nam ac magna nec dui placerat faucibus id at velit. Fusce sapien massa, accumsan sit amet enim at, convallis hendrerit nibh. Phasellus sagittis elit ut felis maximus, vel imperdiet justo ultrices.</p><br />
//     </div>
//   </div>
// </section>
