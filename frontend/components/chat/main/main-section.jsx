import React from 'react';
import { connect } from 'react-redux';

import Header from './header';
import Messages from './message/messages';
import MessageInput from './message/message-input';

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

export default MainSection;
