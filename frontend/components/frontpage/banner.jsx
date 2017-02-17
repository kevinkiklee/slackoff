import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { login } from '../../actions/session_actions';

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.guestLogin = this.guestLogin.bind(this);
    this.buildButtons = this.buildButtons.bind(this);
  }

  guestLogin() {
    const user = {
      "username": "guest",
      "password": "guestlogin",
    };

    this.props.login(user).then(() => this.props.router.push('/chat'));
  }

  buildButtons() {
    if (this.props.currentUser) {
      return (
        <div>
          <Link className='banner-btn shadow' to='/chat'>Return to the Chat</Link><br /><br /><br />
        </div>
      );
    } else {
      return (
        <div>
          <Link className='banner-btn shadow' to='/signup'>Join SlackOff</Link><br /><br /><br />
          <button className='guest-btn shadow' onClick={ this.guestLogin }>Guest Login</button>
        </div>
      );
    }
  }

  render() {
    return (
      <section className='banner-container'>
        <img className='banner-logo' src={ window.assets.bannerLogo }/>

        <div className='banner-title'>
          <h1>Where work happens</h1>
        </div>

        <div className='banner-subtitle'>
          <h2>...sometimes</h2>
        </div>

        { this.buildButtons() }
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { currentUser: state.session.currentUser };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (user) => dispatch(login(user))
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Banner));
