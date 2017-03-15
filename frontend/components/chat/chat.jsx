import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { fetchChannel } from '../../actions/channel_actions';
import { setChannel } from '../../actions/current_channel_actions';

import UserSection from './user/user-section';
import MainSection from './main/main-section';
import ChannelSection from './channel/channel-section';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.pusher = new Pusher('d46870f8b7c4c1636fca', {
      encrypted: true
    });

    this.channel = this.pusher.subscribe('application');

    this.channel.bind('notify', (data) => {
      if(this.props.user
        && data.private === true
        && data.receivers.includes(this.props.user.id)
        && data.authorId  !== this.props.user.id
        && data.channelId !== this.props.channel.id)
      {
        this.showDirectMessageAlert(data.author);
      }
    }, this);

    this.channel.bind('updateChat', () => {
      this.props.fetchChannel(this.props.user.id, this.props.channel.id);
    }, this);
  }

  showDirectMessageAlert(author){
    msg.show(`You have a message from ${author}!`, {
      time: 3000,
      type: 'info',
      icon: <img src={ window.assets.logoSq35 } />
    });
  }

  componentWillMount() {
    this.props.fetchChannel(this.props.user.id, this.props.user.current_channel)
              .then(() => {
                const channel = {
                  id: this.props.channel.id,
                  name: this.props.channel.name,
                  description: this.props.channel.description
                };

                this.props.setChannel(channel);
              });
  }

  render() {
    if (this.props.user) {
      return (
        <div className='chat-container'>
          <UserSection />
          <MainSection />
          <ChannelSection />
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.session.currentUser,
           channel: state.channel };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  setChannel: (channel) => dispatch(setChannel(channel))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Chat));
