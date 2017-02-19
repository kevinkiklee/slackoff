import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import merge from 'lodash/merge';

import { fetchChannel,
         receiveMessage } from '../../../actions/channel_actions';

import MessageItem from './message-item';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.channel;

    this.buildMessageItems = this.buildMessageItems.bind(this);
  }

  componentWillMount() {
    // debugger
  }

  componentDidMount() {
    var pusher = new Pusher('5f7c22c0e58bdb98abba', {
      encrypted: true
    });

    var channel = pusher.subscribe(this.props.channel.name);
    console.log('inside pusher set');
    channelSet = true;
    // channel.bind('new_message', (data) => {
    //   this.setState(data.messages);
    // }, this);

    channel.bind('message', (message) => {
      this.props.receiveMessage(message);
    }, this);
  }

  componentWillReceiveProps(newProps) {
    // let channelSet = false;

    // if (!channelSet) {
    //   var pusher = new Pusher('d46870f8b7c4c1636fca', {
    //     encrypted: true
    //   });
    //
    //   var channel = pusher.subscribe(newProps.channel.name);
    //   console.log('inside pusher set');
    //   channelSet = true;
    //   // channel.bind('new_message', (data) => {
    //   //   this.setState(data.messages);
    //   // }, this);
    //
    //   channel.bind('message', (message) => {
    //     this.props.receiveMessage(message);
    //   }, this);
    //
    //
    // }
    // debugger
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
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  receiveMessage: (message) => dispatch(receiveMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Messages));
