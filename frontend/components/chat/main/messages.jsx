import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import moment from 'moment';
import merge from 'lodash/merge';

import { getUser } from '../../../actions/session_actions';
import { removeMessage,
         editMessage} from '../../../actions/message_actions.js';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { fetchChannel,
         receiveMessage } from '../../../actions/channel_actions';

import MessageItem from './message-item';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.channel;

    this.pusher = new Pusher('d46870f8b7c4c1636fca', {
      encrypted: true
    });

    const channelId = this.props.user.current_channel.toString();
    this.channel = this.pusher.subscribe(channelId);

    this.channel.bind('message', (message) => {
      this.props.receiveMessage(message);
    }, this);

    this.channel.bind('editMessage', (data) => {
      this.props.editMessage(data);
    }, this);

    this.channel.bind('deleteMessage', (data) => {
      this.props.removeMessage(data.id);
    }, this);

    this.buildMessageItems = this.buildMessageItems.bind(this);
  }

  componentWillUnmount() {
    this.pusher.disconnect();
  }

  componentWillReceiveProps(newProps) {
    const channelLoaded = this.props.channel.name !== undefined;

    if(channelLoaded && this.props.channel.name !== newProps.channel.name){
      // this.pusher.unsubscribe(this.props.channel.id.toString());
      this.pusher.disconnect();

      this.pusher = new Pusher('d46870f8b7c4c1636fca', {
        encrypted: true
      });

      this.channel = this.pusher.subscribe(newProps.channel.id.toString());

      this.channel.bind('message', (message) => {
        this.props.receiveMessage(message);
        this.props.getUser(this.props.user.id);
      }, this);

      this.channel.bind('editMessage', (data) => {
        this.props.editMessage(data);
      }, this);

      this.channel.bind('deleteMessage', (data) => {
        this.props.removeMessage(data.id);
      }, this);
    }

    this.setState(newProps.channel);
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
  getUser: (userId) => dispatch(getUser(userId)),
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  receiveMessage: (message) => dispatch(receiveMessage(message)),
  removeMessage: (id) => dispatch(removeMessage(id)),
  editMessage: (message) => dispatch(editMessage(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Messages));
