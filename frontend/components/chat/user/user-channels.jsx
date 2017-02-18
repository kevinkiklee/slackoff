import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { setChannel } from '../../../actions/current_channel_actions';
import { fetchChannel } from '../../../actions/channel_actions';

import UserChannelItem from './user-channel-item';

class UserChannels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: this.props.channels,
      currentChannel: this.props.currentChannel
    };

    this.buildChannelItems = this.buildChannelItems.bind(this);
    this.changeChannel = this.changeChannel.bind(this);
    this.displayAllChannels = this.displayAllChannels.bind(this);
  }

  changeChannel(channel) {
    return (e) => {
      this.props.fetchChannel(this.props.user.id, channel.id)
                .then((newChannel) => {
                  const channel = {
                    id: newChannel.channel.id,
                    name: newChannel.channel.name,
                    description: newChannel.channel.description
                  };

                  this.props.setChannel(channel);
                  this.setState({ currentChannel: channel });
                });
    };
  }

  displayAllChannels() {
    console.log('All Channels: ' + this.state.channels);
  }

  buildChannelItems() {
    return this.state.channels.map((channel, i) => (
      <button key={i} onClick={ this.changeChannel(channel).bind(this) }>
        <UserChannelItem key={ i }
          channel={ channel }
          currentChannel={ this.props.currentChannel }
        />
      </button>
    ));
  }

  render() {
    const channelCount = this.state.channels.length;

    return (
      <section className='user-channels-container'>
        <button onClick={ this.displayAllChannels }>
          <h4>CHANNELS <span className='user-channels-count'>({ channelCount })</span></h4>
        </button>

        <ul className='user-channels-list'>
          { this.buildChannelItems() }
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const stateChannels = state.session.currentUser.subscriptions;

  return {
    user: state.session.currentUser,
    channels: stateChannels,
    currentChannel: state.currentChannel
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  setChannel: (channel) => dispatch(setChannel(channel))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserChannels));
