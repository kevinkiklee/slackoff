import { connect } from 'react-redux';
import React from 'react';
import { Link, withRouter } from 'react-router';

import { login, logout, signup } from '../../actions/session_actions';

class SessionControl extends React.Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  signout() {
    this.props.logout().then(() => this.props.router.push('/login'));
  }

  render() {
    if (this.props.currentUser === null) {
      return (
        <section className='session-control'>
          <Link className='session-control-btn' to='/signup'>SIGNUP</Link>
          <Link className='session-control-btn' to='/login'>LOGIN</Link>
        </section>
      );
    }

    return (
      <section>
        <button className='logout-button' onClick={ this.signout }>Logout</button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout()),
  signup: (user) => dispatch(signup(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SessionControl));
