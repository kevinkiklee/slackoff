import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './app';
import SessionForm from './authentication/session_form';

const Root = ({ store }) => {
  const redirectIfLoggedIn = (nextState, replace) => {
    if (store.getState().session.currentUser)
    replace('/');
  }

  const redirectUnlessLoggedIn = (nextState, replace) => {
    if (!store.getState().session.currentUser)
    replace('/session/new');
  }

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <Route path="/login" component={ SessionForm } onEnter={ redirectIfLoggedIn } />
          <Route path="/signup" component={ SessionForm } onEnter={ redirectIfLoggedIn } />
        </Route>
      </Router>
    </Provider>
  )
};

export default Root;
