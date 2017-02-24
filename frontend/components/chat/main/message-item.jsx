import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import moment from 'moment';
import merge from 'lodash/merge';

import { updateMessage, deleteMessage } from '../../../actions/message_actions';

class MessageItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.message,
      content: this.props.message.content,
      contentAction: 'show'
    };

    this.editMessage = this.editMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);

    this.showEditForm = this.showEditForm.bind(this);
    this.buildEditMessageForm = this.buildEditMessageForm.bind(this);
    this.buildShowMessage = this.buildShowMessage.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({ message: newProps.message });
    }
  }

  deleteMessage(e) {
    e.preventDefault();
    this.props.deleteMessage(this.state.message.id);
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ content: e.target.value });
  }

  showEditForm(e) {
    e.preventDefault();
    this.setState({ contentAction: 'edit' });
  }

  editMessage(e) {
    e.preventDefault();
    let editedMessage = merge({}, this.state.message, { content: this.state.content});

    this.props.updateMessage(editedMessage)
      .then((data) => {
        this.setState({
          message: data.message,
          content: data.message.content,
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

    if (this.state.contentAction === 'show') {
      content = this.buildShowMessage();
    } else {
      content = this.buildEditMessageForm();
    }

    return (
      <li className=''>
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
                  <button className='message-edit-btn' onClick={ this.showEditForm }>
                    <i className="fa fa-pencil-square-o fa-6" aria-hidden="true"></i>
                  </button>
                  <button className='message-delete-btn' onClick={ this.deleteMessage }>
                    <i className="fa fa-times-circle-o fa-6" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              { content }

            </div>
          </div>

      </li>
    );

  }
}

const mapStateToProps = (state, ownProps) => ({
  message: ownProps.message
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateMessage: (message) => dispatch(updateMessage(message)),
  deleteMessage: (id) => dispatch(deleteMessage(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MessageItem));
