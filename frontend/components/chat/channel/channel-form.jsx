import React from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { fetchPublicChannels,
         createPublicSubscription,
         createChannel } from '../../../actions/channel_actions';

import { setChannel } from '../../../actions/current_channel_actions';
import { updateSubscription, getUser } from '../../../actions/session_actions';
import { openChannelFormModal,
         closeChannelFormModal } from '../../../actions/modal_actions';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      channelName: '',
      channelDescription: ''
    };

    this.createChannel = this.createChannel.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({channelName: ''});
    }
  }

  // joinChannel(channel) {
  //   return (e) => {
  //     e.preventDefault();
  //
  //     this.props.createPublicSubscription({ channel_id: channel.id })
  //     .then((newChannel) => {
  //
  //       const channel = {
  //         id: newChannel.channel.id,
  //         name: newChannel.channel.name,
  //         description: newChannel.channel.description,
  //         users: newChannel.channel.users,
  //         displayName: newChannel.channel.display_name
  //       };
  //
  //       this.props.setChannel(channel);
  //       return channel;
  //     }).then((channel) => {
  //       if (!this.props.subscriptionIds.includes(channel.id)) {
  //         this.props.updateSubscription(channel);
  //       }
  //     }).then(() => {
  //       this.props.closeChannelFormModal();
  //     });
  //   };
  // }

  createChannel(e) {
    e.preventDefault();

    const channel = {
      name: this.state.channelName,
      display_name: this.state.chanelName,
      description: this.state.channelDescription,
      private: false,
      users: [this.props.currentUser]
    };

    this.props.createChannel(channel)
      .then((channel) => this.props.setChannel(channel))
      .then(() => this.props.fetchPublicChannels())
      .then(() => this.props.getUser(this.props.currentUser.id))
      .then(() => this.props.closeChannelFormModal());
  }

  handleInput(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
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
        top             : '250px',
        bottom          : '250px',
        left            : '200px',
        right           : '200px',
        border          : '1px solid #ccc',
        borderRadius    : '5px',
        paddingTop      : '50px',
        paddingBottom   : '50px',
        transition      : 'all 0.3s ease 0s',
        zIndex          : 11
      }
    };

    return (
      <Modal isOpen={ this.props.channelForm }
             onRequestClose={ this.props.closeChannelFormModal }
             contentLabel='ChannelForm'
             style={ style }>
        <section className='channels-view-container'>
          <h1>Create a channel</h1>

          <form className='channels-view-search-form' onSubmit={ this.createChannel }>
            <h4>Channel Name</h4>
            <input className='channels-view-search-input'
                   placeholder='Enter the channel name'
                   onChange={ this.handleInput('channelName') } type='text' />

            <h4>Channel Description</h4>
            <input className='channels-view-search-input'
                   placeholder='Describe the channel'
                   onChange={ this.handleInput('channelDescription') } type='text' />

            <input type='submit' value='Create Channel'/>
          </form>

        </section>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.session.currentUser) {
    return {
      channelForm: state.modal.channelForm,
      userId: state.session.currentUser.id,
      currentUser: state.session.currentUser
    };
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPublicChannels: () => dispatch(fetchPublicChannels()),
  setChannel: (channel) => dispatch(setChannel(channel)),
  createChannel: (channel) => dispatch(createChannel(channel)),
  getUser: (id) => dispatch(getUser(id)),

  closeChannelFormModal: () => dispatch(closeChannelFormModal()),
  openChannelFormModal: () => dispatch(openChannelFormModal()),

  updateSubscription: (channel) => dispatch(updateSubscription(channel)),
  createPublicSubscription: (channelId) => dispatch(createPublicSubscription(channelId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChannelForm));
