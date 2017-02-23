import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import moment from 'moment';

class MessageItem extends React.Component {
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
            </div>
            <div className='message-content'>
              { this.props.message.content }
            </div>
          </div>
        </div>
      </li>
    );
  }
}

// { this.props.message.updated_at.format('LT') }

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MessageItem));
