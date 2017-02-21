import React from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { fetchPublicChannels,
         createPublicSubscription } from '../../../actions/channel_actions';

import { setChannel } from '../../../actions/current_channel_actions';
import { updateSubscription } from '../../../actions/session_actions';
import { openChannelsViewModal,
         closeChannelsViewModal } from '../../../actions/modal_actions';

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
    // debugger

    return (e) => {
      e.preventDefault();

      this.props.createPublicSubscription({ channel_id: channel.id })
      .then((newChannel) => {

        const channel = {
          id: newChannel.channel.id,
          name: newChannel.channel.name,
          description: newChannel.channel.description
        };

        this.props.setChannel(channel);
        return channel;
      }).then((channel) => {
        if (!this.props.subscriptionIds.includes(channel.id)) {
          this.props.updateSubscription(channel);
        }
      }).then(() => {
        this.props.closeChannelsViewModal();
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

    return (
      <Modal isOpen={ this.props.channelsView }
             onRequestClose={ this.props.closeChannelsViewModal }
             contentLabel='ChannelsView'
             style={ style }>
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
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  channelsView: state.modal.channelsView,
  userId: state.session.currentUser.id,
  subscriptionIds: Object.keys(state.session.currentUser.subscriptions)
                         .map((i) => (state.session.currentUser.subscriptions[i].id))
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPublicChannels: () => dispatch(fetchPublicChannels()),
  setChannel: (channel) => dispatch(setChannel(channel)),

  closeChannelsViewModal: () => dispatch(closeChannelsViewModal()),
  openChannelsViewModal: () => dispatch(openChannelsViewModal()),

  updateSubscription: (channel) => dispatch(updateSubscription(channel)),
  createPublicSubscription: (channelId) => dispatch(createPublicSubscription(channelId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChannelsView));
