import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { fetchChannel } from '../../../actions/channel_actions';

// import { login, logout, signup } from '../../actions/session_actions';

import MessageItem from './message-item';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.channel;
    // debugger
    this.buildMessageItems = this.buildMessageItems.bind(this);
  }

  // componentWillMount() {
  //   this.props.fetchChannel(this.props.user.id, this.props.user.current_channel);
  // }

  buildMessageItems() {
    if (this.props.channel.messages) {
      return this.props.channel.messages.map((message, i) => {
        return (
          <MessageItem key={ i } message={ message } />
        );
      });
    }
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
  // debugger
  return {
    // messages: state.channel.messages
    user: state.session.currentUser,
    channel: state.channel
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Messages));
