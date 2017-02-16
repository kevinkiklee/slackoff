import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

// import { login, logout, signup } from '../../actions/session_actions';

import MessageItem from './message-item';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.channel;
    // debugger
    this.buildMessageItems = this.buildMessageItems.bind(this);
  }

  buildMessageItems() {
    return this.state.messages.map((message, i) => {
      return (
        <MessageItem key={ i } message={ message } />
      );
    });
  }

  render() {
    return (
      <section className='messages-container'>
        { this.buildMessageItems() }
      </section>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // messages: state.channel.messages
    channel: state.channel
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Messages));
