import React from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { setChannel } from '../../../actions/current_channel_actions';
import { fetchChannel } from '../../../actions/channel_actions';

import { openChannelsViewModal } from '../../../actions/modal_actions';

import UserChannelItem from './user-channel-item';
import ChannelsView from '../channels/channels-view.jsx';

class UserChannels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userChannels: this.props.userChannels,
      currentChannel: this.props.currentChannel
    };

    this.buildChannelItems = this.buildChannelItems.bind(this);
    this.changeChannel = this.changeChannel.bind(this);
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

  buildChannelItems() {
    return this.props.userChannels.map((channel, i) => (
      <button key={i} onClick={ this.changeChannel(channel).bind(this) }>
        <UserChannelItem key={ i }
          channel={ channel }
          currentChannel={ this.props.currentChannel }
        />
      </button>
    ));
  }

  render() {
    const channelCount = this.props.user.subscriptions.length;

    return (
      <section className='user-channels-container'>
        <ChannelsView />

        <button onClick={ this.props.openChannelsViewModal }>
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
  return {
    user: state.session.currentUser,
    userChannels: state.session.currentUser.subscriptions,
    currentChannel: state.channel,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  openChannelsViewModal: () => dispatch(openChannelsViewModal()),
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  setChannel: (channel) => dispatch(setChannel(channel))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserChannels));
