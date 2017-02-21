import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { fetchPublicChannels,
         createPublicSubscription } from '../../../actions/channel_actions';

import { setChannel } from '../../../actions/current_channel_actions';
import { updateSubscription } from '../../../actions/session_actions';
import { closeChannelViewModal } from '../../../actions/modal_actions';

class ChannelsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: []
    };

    this.buildChannelItems = this.buildChannelItems.bind(this);
    this.joinChannel = this.joinChannel.bind(this);
  }

  componentDidMount() {
    this.props.fetchPublicChannels().then((data) => {
      this.setState({ channels: data.channels });
    });
  }

  joinChannel(channel) {
    return (e) => {
      e.preventDefault();

      console.log(channel);
      // debugger
      this.props.createPublicSubscription({ channel_id: channel.id })
          .then((newChannel) => {
            // debugger
            const channel = {
              id: newChannel.channel.id,
              name: newChannel.channel.name,
              description: newChannel.channel.description
            };

            this.props.setChannel(channel);
            return channel;
          }).then((channel) => {
            this.props.updateSubscription(channel);
          }).then(() => {
            this.props.closeChannelViewModal();
          });
    };
  }

  buildChannelItems() {
    return this.state.channels.map((channel, i) => {
      return (
        <li className='channels-view-item-container' key={ i }>
          <button className='channels-view-item-btn' onClick={ this.joinChannel(channel) }>
            <div className='channels-view-item-name'>
              <h2># { channel.name }</h2>
              <h3>Created on { channel.created_at }</h3>
              <h4>{ channel.description }</h4>
            </div>
            <div className='channels-view-item-user-count'>
              <img src={ window.assets.iconMemberCount } />
              <h4>{ channel.userCount }</h4>
            </div>
          </button>
        </li>
      );
    });
  }

  render() {
    return (
      <section className='channels-view-container'>
        <h1>Browse all channels</h1>

        <form className='channels-view-search-form'>
          <input className='channels-view-search-input'
                 placeholder='Search channels' type='text' />
        </form>

        <ul className='channels-view-list'>
          { this.buildChannelItems() }
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userId: state.session.currentUser.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeChannelViewModal: () => dispatch(closeChannelViewModal()),
  fetchPublicChannels: () => dispatch(fetchPublicChannels()),
  updateSubscription: (channel) => dispatch(updateSubscription(channel)),
  setChannel: (channel) => dispatch(setChannel(channel)),
  createPublicSubscription: (channelId) => dispatch(createPublicSubscription(channelId))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChannelsView));
