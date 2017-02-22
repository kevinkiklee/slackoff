import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import merge from 'lodash/merge';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { fetchChannel,
         receiveMessage } from '../../../actions/channel_actions';

import MessageItem from './message-item';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.channel;

    this.pusher = new Pusher('6dff216f2c5d022ed6ae', {
      encrypted: true
    });

    const channelId = this.props.user.current_channel.toString();
    this.channel = this.pusher.subscribe(channelId);
    // debugger

    this.channel.bind('message', (message) => {
      this.props.receiveMessage(message);
    }, this);

    this.buildMessageItems = this.buildMessageItems.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const channelLoaded = this.props.channel.name !== undefined;
    const notInitialChannel = newProps.channel.name !== 'general';
    // debugger

    if(channelLoaded && notInitialChannel && this.props.channel.name !== newProps.channel.name){
      // debugger
      this.pusher.disconnect();

      this.pusher = new Pusher('6dff216f2c5d022ed6ae', {
        encrypted: true
      });

      this.channel = this.pusher.subscribe(newProps.channel.id.toString());
      // debugger
      this.channel.bind('message', (message) => {
        // debugger
        this.props.receiveMessage(message);
      }, this);
    }

    this.setState(newProps.channel);
  }

  componentWillUnmount() {
    this.pusher.disconnect();
  }

  buildMessageItems() {
    if (this.state.messages) {
      return this.state.messages.map((message, i) => {
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
  return {
    user: state.session.currentUser,
    channel: state.channel
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  receiveMessage: (message) => dispatch(receiveMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Messages));
