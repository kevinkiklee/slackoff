import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import moment from 'moment';

import { updateMessage, deleteMessage } from '../../../actions/message_actions';

class MessageItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.message
    };

    this.editMessage = this.editMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props !== newProps) {
      this.setState({ message: newProps.message });
    }
  }

  editMessage(e) {
    e.preventDefault();
    console.log('edit message');
  }

  deleteMessage(e) {
    e.preventDefault();
    console.log('delete message');
    // debugger
    this.props.deleteMessage(this.state.message.id);
  }

  render() {
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
                <button className='message-edit-btn' onClick={ this.editMessage }>
                  <i className="fa fa-pencil-square-o fa-6" aria-hidden="true"></i>
                </button>
                <button className='message-delete-btn' onClick={ this.deleteMessage }>
                  <i className="fa fa-times-circle-o fa-6" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className='message-content'>
              { this.state.message.content }
            </div>
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
