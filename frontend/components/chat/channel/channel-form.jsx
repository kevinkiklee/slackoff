import React from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import { fetchPublicChannels,
         createChannel,
         editChannel } from '../../../actions/channel_actions';
import { setChannel } from '../../../actions/current_channel_actions';
import { getUser } from '../../../actions/session_actions';
import { closeChannelFormModal } from '../../../actions/modal_actions';

class ChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: this.props.channelId,
      channelName: this.props.channelName,
      channelDescription: this.props.channelDescription
    };

    this.createChannel = this.createChannel.bind(this);
    this.editChannel = this.editChannel.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({
        channelId: newProps.channelId,
        channelName: newProps.channelName,
        channelDescription: newProps.channelDescription
      });
    }
  }

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

  editChannel(e) {
    e.preventDefault();
    const channel = {
      id: this.state.channelId,
      name: this.state.channelName,
      description: this.state.channelDescription
    };

    this.props.editChannel(channel)
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

    const formText = this.props.formType === 'create' ? 'Create a channel' : 'Edit a channel';
    const formAction = this.props.formType === 'create' ? this.createChannel : this.editChannel;

    return (
      <Modal isOpen={ this.props.channelForm }
             onRequestClose={ this.props.closeChannelFormModal }
             contentLabel='ChannelForm'
             style={ style }>
        <section className='channels-view-container'>
          <h1>{ formText }</h1>

          <form className='channels-view-search-form' onSubmit={ formAction }>
            <h4>CHANNEL NAME</h4>
            <input className='channels-view-search-input'
                   placeholder='Enter the channel name'
                   value={ this.state.channelName }
                   onChange={ this.handleInput('channelName') } type='text' />

            <h4>CHANEL DESCRIPTION</h4>
            <input className='channels-view-search-input'
                   placeholder='Describe the channel'
                   value={ this.state.channelDescription }
                   onChange={ this.handleInput('channelDescription') } type='text' />

            <input type='submit' value={ formText }/>
          </form>

        </section>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let channelName = '';
  let channelDescription = '';

  if (state.modal.channelFormType === 'edit') {
    channelName = state.channel.name;
    channelDescription = state.channel.description;
  }

  return {
    channelName: channelName,
    channelDescription: channelDescription,
    channelId: state.channel.id,
    formType: state.modal.channelFormType,
    channelForm: state.modal.channelForm,
    userId: state.session.currentUser.id,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPublicChannels: () => dispatch(fetchPublicChannels()),
  setChannel: (channel) => dispatch(setChannel(channel)),
  createChannel: (channel) => dispatch(createChannel(channel)),
  editChannel: (channel) => dispatch(editChannel(channel)),
  getUser: (id) => dispatch(getUser(id)),

  closeChannelFormModal: () => dispatch(closeChannelFormModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);
