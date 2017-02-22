import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

// import { login, logout, signup } from '../../actions/session_actions';

class UserDMItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  render() {
    let directMessageName = this.props.directMessage.users
        .map((user) => {
          if (user.id !== this.props.currentUserId) {
            return user.username;
          }
        }).join(', ');

    if (this.props.currentMessage.id == this.props.directMessage.id) {
      return (
        <li className='selected-direct-message'>
          <div className='user-dm-friend-container'>
            <span className='user-dm-tag'>@ </span>
            <p>{ directMessageName }</p>
          </div>
        </li>
      );
    } else {
      return (
        <li className='user-dm-friend'>
          <div className='user-dm-friend-container'>
            <span className='user-dm-tag'>@ </span>
            <p>{ directMessageName }</p>
          </div>
        </li>
      );
    }
  }
}
// <img src={ window.assets.iconOnline } />

const mapStateToProps = (state, ownProps) => ({
  currentUserId: state.session.currentUser.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserDMItem));
