import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import Header from './header';
import Messages from './messages';
import MessageInput from './message-input';

class MainSection extends React.Component {
  render() {
    return (
      <section className='main-section'>
        <Header />
        <Messages />
        <MessageInput />
      </section>
    );
  }
}

export default withRouter(MainSection);
