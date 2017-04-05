import React from 'react';
import MDSpinner from "react-md-spinner";

const Spinner = () => {
  return (
    <div className='spinnerContainer'>
      <img className='spinnerLogo' src={ window.assets.bannerLogo }/>
      <h1>Loading SlackOff...</h1>
      <MDSpinner size={60} />
    </div>
  );
};

export default Spinner;
