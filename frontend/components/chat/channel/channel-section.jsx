import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import moment from 'moment';
import AlertContainer from 'react-alert';

import { deleteSubscription, getUser } from '../../../actions/session_actions';
import { fetchChannel, deleteChannel, fetchPublicChannels } from '../../../actions/channel_actions';
import { setChannel } from '../../../actions/current_channel_actions';
import { openChannelFormModal } from '../../../actions/modal_actions';
import { openDirectMessageModal } from '../../../actions/modal_actions';

import ChannelForm from '../channel/channel-form.jsx';
import DirectMessage from '../channel/direct-message.jsx';

class ChannelSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      givenUser: []
    };

    this.buildMemberList = this.buildMemberList.bind(this);

    this.openUserActionMenu = this.openUserActionMenu.bind(this);
    this.openDirectMessageForm = this.openDirectMessageForm.bind(this);

    this.buildGeneralChatError = this.buildGeneralChatError.bind(this);

    this.createChannel = this.createChannel.bind(this);
    this.deleteChannel = this.deleteChannel.bind(this);
    this.editChannel = this.editChannel.bind(this);
    this.leaveChannel = this.leaveChannel.bind(this);
  }

  createChannel() {
    this.props.openChannelFormModal('create');
  }

  editChannel() {
    if (this.props.channel.private === true) {
      this.showEditDisableAlert();
    } else {
      this.props.openChannelFormModal('edit');
    }
  }

  deleteChannel() {
    if (this.props.channel.name === 'general') {
      this.showAlert();
    } else {
      this.props.deleteChannel(this.props.channel.id)
        .then(() => this.props.fetchPublicChannels())
        .then(() => this.props.getUser(this.props.user.id))
        .then(() => this.props.fetchChannel(this.props.user.id, this.props.user.current_channel));
    }
  }

  leaveChannel() {
    const fetch = this.props.fetchChannel;

    if (this.props.channel.name === 'general') {
      this.showAlert();

    } else {
      this.props.deleteSubscription(this.props.channel.id)
          .then((user) => this.props.fetchChannel(user.id, user.current_channel));
    }
  }

  openDirectMessageForm(user) {
    return (e) => {
      this.props.openDirectMessageModal([user]);
    };
  }

  openUserActionMenu(user) {
    return (e) => {
      e.preventDefault();
    };
  }

  buildMemberList() {
    if (this.props.channel.users) {
      return this.props.channel.users.map((user, i) => (
        <button className='user-action-btn' key={i}
                onClick={ this.openDirectMessageForm(user) }>
          <li className='user-action-item'>
            <img src={ user.photo_url }/>
            <p>{ user.username }</p>
          </li>
        </button>
      ));
    }
  }

  showAlert(){
    msg.show('You cannot remove #general channel', {
      time: 2000,
      type: 'info',
      icon: <img src={ window.assets.logoSq35 } />
    });
  }

  showEditDisableAlert(){
    msg.show('You cannot edit direct message information', {
      time: 2000,
      type: 'info',
      icon: <img src={ window.assets.logoSq35 } />
    });
  }

  buildGeneralChatError() {
    const alertOptions = {
      offset: 20,
      position: 'top right',
      theme: 'light',
      time: 2000,
      transition: 'scale'
    };

    return(
      <div>
        <AlertContainer ref={(a) => global.msg = a} {...alertOptions} />
      </div>
    );
  }

  render() {
    let channelName = this.props.channel.name;

    if (this.props.channel.private === true) {
      let channelNameFiltered = this.props.channel.users
            .sort((a, b) => {
              let nameA = a.username.toUpperCase();
              let nameB = b.username.toUpperCase();

              if (nameA < nameB) {
                return -1;
              }

              if (nameA > nameB) {
                return 1;
              }

              return 0;
            }).map((user) => {
                if (user.id !== this.props.user.id) {
                  return user.username;
                }
              });

      let filtered = channelNameFiltered.filter((el) => (el !== undefined));
      channelName = filtered.join(', ');
    }

    return (
      <section className='channel-section'>
        <ChannelForm />
        <DirectMessage givenUser={ this.state.givenUser }/>

        <section className='channel-action-container'>
          <div className='channel-action-warning'>
            { this.buildGeneralChatError() }
          </div>
          <div className='channel-action-buttons'>
            <button className='channel-action-create-btn'
                    onClick={ this.createChannel }>
              Create Channel
            </button>
            <button className='channel-action-leave-btn'
                    onClick={ this.deleteChannel }>
              Delete Channel
            </button>
          </div>
          <div className='channel-action-buttons'>
            <button className='channel-action-create-btn'
                    onClick={ this.editChannel }>
              Edit Channel
            </button>
            <button className='channel-action-leave-btn'
                    onClick={ this.leaveChannel }>
              Leave Channel
            </button>
          </div>
        </section>

        <section className='channel-container'>
          <section className='channel-name'>
            <h2>About #{ channelName }</h2>
          </section>

          <section className='channel-details'>
            <h3>Channel Details</h3>
            <div className='channel-description'>
              <h4>Description</h4>
              <p>{ this.props.channel.description }</p>
            </div>
            <div className='channel-information'>
              Created on { moment(this.props.channel.createdAt).format('MMMM Do YYYY') }
            </div>
          </section>

          <section className='channel-members'>
            <h3>{ this.props.channel.userCount } Members</h3>
            <ul className='channel-members-list'>
              { this.buildMemberList() }
            </ul>
          </section>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.session.currentUser,
  channel: state.channel
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  openDirectMessageModal: (user) => dispatch(openDirectMessageModal(user)),
  openChannelFormModal: (formType) => dispatch(openChannelFormModal(formType)),
  deleteSubscription: (channelId) => dispatch(deleteSubscription(channelId)),
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  deleteChannel: (channelId) => dispatch(deleteChannel(channelId)),
  setChannel: (channel) => dispatch(setChannel(channel)),
  fetchPublicChannels: () => dispatch(fetchPublicChannels()),
  getUser: (id) => dispatch(getUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChannelSection));
