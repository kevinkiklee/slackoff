import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

import merge from 'lodash/merge';

const testState = {
  session: {
    currentUser: {
      id: '1',
      username: 'guest',
      email: 'i.know.nothing@gmail.com',
      photo_url: 'abc.com/abc.jpg',

      currentChannel: 1,

      subscriptions: [
        {
          id: 1,
          name: "westeros",
          description: 'description for westeros channel'
        },

        {
          id: 2,
          name: "the-wall",
          description: 'description for the-wall channel'
        },

        {
          id: 3,
          name: "winterfell",
          description: 'description for winterfell channel'
        },

        {
          id: 4,
          name: "winter-is-coming",
          description: 'description for winter-is-coming channel'
        }
      ]
    }
  },

  currentChannel: {
    id: 1,
    name: "westeros",
    description: 'description for westeros channel'
  },

  channel: {
    id: '1',
    name: 'westeros',
    description: 'description for westeros channel',

    messages: [
      {
        user: {
          id: '1',
          username: 'jon.snow',
          email: 'i.know.nothing@gmail.com',
          photo_url: 'abc.com/abc.jpg',
          timestamp: '1:57 PM'
        },

        content: 'first message in westeros channel from jon.snow',
        type: 'regular'
      },

      {
        user: {
          id: '2',
          username: 'tyrion',
          email: 'tyrion@lannister.com',
          photo_url: 'abc.com/abc.jpg',
          timestamp: '1:59 PM'
        },

        content: 'second message in westeros channel from tyrion',
        type: 'media'
      },

      {
        user: {
          id: '3',
          username: 'ned.stark',
          email: 'eddard@stark.com',
          photo_url: 'abc.com/abc.jpg',
          timestamp: '2:17 PM'
        },

        content: 'third message in westeros channel from ned',
        type: 'link'
      },

      {
        user: {
          id: '2',
          username: 'tyrion',
          email: 'tyrion@lannister.com',
          photo_url: 'abc.com/abc.jpg',
          timestamp: '2:31 PM'
        },

        content: 'fourth message in westeros channel from tyrion',
        type: 'regular'
      }
    ]
  },
};


document.addEventListener('DOMContentLoaded', () => {
  console.log('%cYour surveillance activity has been recorded.', 'background: #ff0000; color: #ffffff');
  console.log('%cYour IP has been submitted to FBI/NSA for further investigation.', 'background: #ffffff; color: #ff0000');

  const root = document.getElementById('root');

  let store = configureStore();

  if (window.currentUser) {
    // const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(testState);
  }


  // if (window.currentUser) {
  //   const preloadedState = { session: { currentUser: window.currentUser } };
  //   let store = configureStore(preloadedState);
  // } else {
  //   let store = configureStore();
  // }

  window.store = store;

  ReactDOM.render(<Root store={ store } />, root);
});
