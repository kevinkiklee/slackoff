import React from 'react';
import { Link } from 'react-router';

import SessionControl from '../authentication/session_control';

const Navbar = () => {
  return (
    <nav className='landing-page-nav'>
      <div className='landing-page-logo'>
        <Link to='/'>
          <img src={ window.assets.logoSq } />
          <h1>
            <span className='green'>Slack</span>
            <span className='yellow'>Off</span>
          </h1>
        </Link>
      </div>
      <div className='session-control-container'>
        <SessionControl />
      </div>
    </nav>
  );
}

export default Navbar;
