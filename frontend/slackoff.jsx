import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  console.log('%cYour surveillance activity has been recorded.', 'background: #ff0000; color: #ffffff');
  console.log('%cYour IP has been submitted to FBI/NSA for further investigation.', 'background: #ffffff; color: #ff0000');

  const root = document.getElementById('root');
  let store = configureStore();

  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
  }

  ReactDOM.render(<Root store={ store } />, root);
});
