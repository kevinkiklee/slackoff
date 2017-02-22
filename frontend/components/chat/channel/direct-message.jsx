import React from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { createChannel } from '../../../actions/channel_actions';
import { fetchUsers } from '../../../actions/user_actions';

import { setChannel } from '../../../actions/current_channel_actions';
import { getUser } from '../../../actions/session_actions';

import { openDirectMessageModal,
         closeDirectMessageModal } from '../../../actions/modal_actions';

class DirectMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUsers: [],
      searchInput: ''
    };

    this.buildUserItems = this.buildUserItems.bind(this);
    this.joinChannel = this.joinChannel.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.matches = this.matches.bind(this);
    this.buildUserList = this.buildUserList.bind(this);

    this.createDirectMessage = this.createDirectMessage.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers().then((data) => {
      this.setState({ users: data.users });
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({ searchInput: '', selectedUsers: [] });
    }
  }

  createDirectMessage() {
    //////////////////////////
    // TODO check if the message exists
    //////////////////////////

    const currentUser = {
      id: this.props.currentUser.id,
      username: this.props.currentUser.username,
      photo_url: this.props.currentUser.photo_url
    };

    let selectedUsers = [currentUser, ...this.state.selectedUsers];

    //////////////////////////
    // TODO sort the name
    //////////////////////////

    const channelName = selectedUsers
                              .map((user) => (user.username))
                              .join('').replace(/\./g, '');

    const channel = {
      name: channelName,
      description: 'Direct Message~',
      private: true,
      users: selectedUsers
    };

    this.props.createChannel(channel)
              .then(() => (this.props.getUser(currentUser.id)));
  }

  joinChannel(channel) {
    return (e) => {
      e.preventDefault();

      this.props.createPublicSubscription({ channel_id: channel.id })
      .then((newChannel) => {

        const channel = {
          id: newChannel.channel.id,
          name: newChannel.channel.name,
          description: newChannel.channel.description,
          users: newChannel.channel.users
        };

        this.props.setChannel(channel);
        return channel;
      }).then((channel) => {
        if (!this.props.subscriptionIds.includes(channel.id)) {
          this.props.updateSubscription(channel);
        }
      }).then(() => {
        this.props.closeDirectMessageModal();
      });
    };
  }

  handleInput(e) {
    this.setState({ searchInput: e.target.value });
  }

  matches() {
    return this.state.users.filter((user) => user.username.includes(this.state.searchInput));
  }

  selectUser(user) {
    return (e) => {
      if (user.id !== this.props.currentUser.id) {
        let users = [...this.state.selectedUsers];
        users.push(user);
        this.setState({ selectedUsers: users });
      }
    };
  }

  buildUserList() {
    if (this.state.selectedUsers.length === 0) {
      return '';
    } else {
      return this.state.selectedUsers.map((user) => {
        return (
          <span className='dm-user-list-item' key={ user.id }>
            { user.username }
          </span>
        );
      });
    }
  }

  buildUserItems() {
    const matches = this.matches();

    if (matches.length === 0) {
      return (
        <div className='dm-no-match'>
          <img src={ window.assets.logoSq } />
          <h4>No matches</h4>
        </div>
      );
    } else {
      return matches.map((user, i) => {
        if (user.id !== this.props.currentUser.id) {
          return (
            <li className='dm-item-container' key={ i }>
              <button className='dm-item-btn' onClick={ this.selectUser(user) }>
                <img src={ user.photo_url } />
                <h2>@{ user.username }</h2>
              </button>
            </li>
          );
        }
      });
    }
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
      <Modal isOpen={ this.props.directMessageForm }
             onRequestClose={ this.props.closeDirectMessageModal }
             contentLabel='DirectMessage'
             style={ style }>
        <section className='dm-container'>
          <h1>Direct Message</h1>

          <form className='dm-search-form'>
            <input className='dm-search-input'
                   placeholder='Search users'
                   onChange={ this.handleInput } type='text'>
            </input>
            <button onClick={ this.createDirectMessage }>
              GO
            </button>
          </form>

          <section className='dm-user-list'>
            <ReactCSSTransitionGroup
              transitionName='list'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>

              { this.buildUserList() }

            </ReactCSSTransitionGroup>
          </section>

          <ul className='dm-list'>
            <ReactCSSTransitionGroup
              transitionName='list'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>

              { this.buildUserItems() }

            </ReactCSSTransitionGroup>
          </ul>
        </section>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({

  allChannels: state.allChannels,
  directMessageForm: state.modal.directMessageForm,
  currentUser: state.session.currentUser,
  subscriptionIds: Object.keys(state.session.currentUser.subscriptions)
                         .map((i) => (state.session.currentUser.subscriptions[i].id))
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  getUser: (userId) => dispatch(getUser(userId)),

  createChannel: (channel) => dispatch(createChannel(channel)),
  setChannel: (channel) => dispatch(setChannel(channel)),

  openDirectMessageModal: () => dispatch(openDirectMessageModal()),
  closeDirectMessageModal: () => dispatch(closeDirectMessageModal()),

  updateSubscription: (channel) => dispatch(updateSubscription(channel)),
  createPublicSubscription: (channelId) => dispatch(createPublicSubscription(channelId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DirectMessage));
