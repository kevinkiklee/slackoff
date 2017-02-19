import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

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
                { this.props.message.timestamp }
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

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MessageItem));
