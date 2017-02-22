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
    // debugger
    if (this.props.currentMessage.id == this.props.directMessage.id) {
      return (
        <li className='selected-direct-message'>
          <div className='user-dm-friend-container'>
            <span className='user-dm-tag'>@ </span>
            <p>{ this.props.directMessage.name }</p>
          </div>
        </li>
      );
    } else {
      return (
        <li className='user-dm-friend'>
          <div className='user-dm-friend-container'>
            <span className='user-dm-tag'>@ </span>
            <p>{ this.props.directMessage.name }</p>
          </div>
        </li>
      );
    }
  }
}
// <img src={ window.assets.iconOnline } />

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserDMItem));
