import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import moment from 'moment';
import AlertContainer from 'react-alert';

import { deleteSubscription } from '../../../actions/session_actions';
import { fetchChannel } from '../../../actions/channel_actions';

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
    this.leaveChannel = this.leaveChannel.bind(this);
  }

  createChannel() {
    console.log('create channel button clicked');
    this.props.openChannelFormModal();
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
      // this.setState({ givenUser: [user] });
      // debugger
      this.props.openDirectMessageModal([user]);
    };
  }

  openUserActionMenu(user) {
    return (e) => {
      e.preventDefault();
      console.log(user);
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
    msg.show('You cannot remove the #general channel', {
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
    const channelName = this.props.channel.displayName || this.props.channel.name;

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
                    onClick={ this.leaveChannel }>
              Delete Channel
            </button>
          </div>
          <div className='channel-action-buttons'>
            <button className='channel-action-create-btn'
                    onClick={ this.createChannel }>
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
  openChannelFormModal: () => dispatch(openChannelFormModal()),
  deleteSubscription: (channelId) => dispatch(deleteSubscription(channelId)),
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChannelSection));
