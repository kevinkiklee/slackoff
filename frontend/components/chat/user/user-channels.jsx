import React from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { setChannel } from '../../../actions/current_channel_actions';
import { fetchChannel } from '../../../actions/channel_actions';

import UserChannelItem from './user-channel-item';
import ChannelsView from '../channels/channels-view.jsx';

class UserChannels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userChannels: this.props.userChannels,
      currentChannel: this.props.currentChannel,
      channelsView: false
    };

    this.buildChannelItems = this.buildChannelItems.bind(this);
    this.changeChannel = this.changeChannel.bind(this);

    this.channelsView = this.channelsView.bind(this);
    this.openChannelsView = this.openChannelsView.bind(this);
    this.closeChannelsView = this.closeChannelsView.bind(this);
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

  openChannelsView() {
    this.setState({ channelsView: true });
  }

  closeChannelsView() {
    this.setState({ channelsView: false });
  }

  channelsView() {
    const style = {
      overlay : {
        backgroundColor : 'rgba(255, 255, 255, 0.9)',
        zIndex          : 10
      },
      content : {
        position        : 'fixed',
        boxSizing       : 'border-box',
        boxShadow       : '1px 1px 5px 0px rgba(50, 50, 50, 0.3)',
        top             : '100px',
        bottom          : '100px',
        left            : '100px',
        right           : '100px',
        border          : '1px solid #ccc',
        borderRadius    : '5px',
        paddingTop      : '50px',
        paddingBottom   : '50px',
        transition      : 'all 0.3s ease 0s',
        zIndex          : 11
      }
    };

    return(
      <Modal isOpen={ this.state.channelsView }
             onRequestClose={ this.closeChannelsView }
             contentLabel='ChannelsView'
             style={ style }>
        <ChannelsView />
      </Modal>
    );
  }

  allChannelItems() {
    return (
      <li>Channel</li>
    )
  }

  buildChannelItems() {
    return this.state.userChannels.map((channel, i) => (
      <button key={i} onClick={ this.changeChannel(channel).bind(this) }>
        <UserChannelItem key={ i }
          channel={ channel }
          currentChannel={ this.props.currentChannel }
        />
      </button>
    ));
  }

  render() {
    const channelCount = this.state.userChannels.length;

    return (
      <section className='user-channels-container'>
        { this.channelsView() }

        <button onClick={ this.openChannelsView }>
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
    userChannels: stateChannels,
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
