import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import AlertContainer from 'react-alert';

import EmoticonPicker from './emoticon-picker';
import Emoticons from './emoticons';

import moment from 'moment';
import merge from 'lodash/merge';

import { updateMessage, deleteMessage } from '../../../actions/message_actions';

class MessageItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.message,
      content: this.props.message.content,
      contentAction: 'show',
      emoticonPicker: 'hide',
      icons: this.props.message.emoticons
    };

    this.editMessage = this.editMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);

    this.toggleEmoticonPicker = this.toggleEmoticonPicker.bind(this);

    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.buildEditMessageForm = this.buildEditMessageForm.bind(this);
    this.buildShowMessage = this.buildShowMessage.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.showAuthorAlert = this.showAuthorAlert.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({ message: newProps.message,
                      content: newProps.message.content,
                      contentAction: 'show',
                      icons: newProps.message.emoticons });
    }
  }

  componentWillUnmount() {
    this.setState({ contentAction: 'show' });
  }

  showAuthorAlert(){
    msg.show('You are not the author of this message', {
      time: 2000,
      type: 'info',
      icon: <img src={ window.assets.logoSq35 } />
    });
  }

  deleteMessage(e) {
    e.preventDefault();

    if (this.state.message.author.id === this.props.user.id) {
      this.props.deleteMessage(this.state.message.id);
    } else {
      this.showAuthorAlert();
    }
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  toggleEditForm(e) {
    if (this.state.message.author.id === this.props.user.id) {
      if (this.state.contentAction === 'show') {
        this.setState({ contentAction: 'edit' });
      } else {
        this.setState({ contentAction: 'show' });
      }
    } else {
      this.showAuthorAlert();
    }
  }

  toggleEmoticonPicker(e) {
    if (this.state.emoticonPicker === 'show') {
      this.setState({ emoticonPicker: 'hide' });
    } else {
      this.setState({ emoticonPicker: 'show' });
    }
  }

  editMessage(e) {
    e.preventDefault();

    let editedMessage = merge({}, this.state.message, { content: this.state.content});

    this.props.updateMessage(editedMessage)
      .then((data) => {
        let copiedData = merge({}, data);
        copiedData.message.author = { id: data.message.user_id };

        this.setState({
          message: copiedData.message,
          content: copiedData.message.content,
          contentAction: 'show'
        });
      });
  }

  buildEditMessageForm() {
    return (
      <form className='message-edit-form' onSubmit={ this.editMessage }>
        <input className='message-edit-input' type='text' onChange={ this.handleInput } value={ this.state.content }/>
      </form>
    );
  }

  buildShowMessage() {
    return (
      <div className='message-content'>
        { this.state.message.content }
      </div>
    );
  }

  render() {
    let content = '';
    let emoticonPicker = '';

    if (this.state.contentAction === 'show') {
      content = this.buildShowMessage();
    } else {
      content = this.buildEditMessageForm();
    }

    if (this.state.emoticonPicker === 'show') {
      emoticonPicker = <EmoticonPicker />
    }

    return (
      <li key={ this.state.message.id } className=''>
        <div className='message-container'>
          <div className='message-avatar-container'>
            <img src={ this.props.message.author.photo_url } />
          </div>
          <div className='message-main-container'>
            <div className='message-info-container'>
              <div className='message-username'>
                { this.props.message.author.username }
              </div>
              <div className='message-timestamp'>
                { moment(this.props.message.updated_at).format('LT') }
                <span> | </span>{ moment(this.props.message.updated_at).fromNow() }
                </div>
                <div className='message-btn-container'>
                  <button className='emoticonPicker-btn' onClick={ this.toggleEmoticonPicker }>
                    <i className="fa fa-smile-o fa-6" aria-hidden="true"></i>
                  </button>
                  <button className='message-edit-btn' onClick={ this.toggleEditForm }>
                    <i className="fa fa-pencil-square-o fa-6" aria-hidden="true"></i>
                  </button>
                  <button className='message-delete-btn' onClick={ this.deleteMessage }>
                    <i className="fa fa-times-circle-o fa-6" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              { content }
              <Emoticons icons={ this.state.icons }/>
              { emoticonPicker }
            </div>
          </div>
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  message: ownProps.message,
  user: state.session.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateMessage: (message) => dispatch(updateMessage(message)),
  deleteMessage: (id) => dispatch(deleteMessage(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MessageItem));
