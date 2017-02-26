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
          <Link className='banner-btn shadow' to='/chat'>Return to Chat</Link><br /><br /><br />
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
        <div className='banner-wrapper'>
          <img className='banner-logo' src={ window.assets.bannerLogo }/>

          <div className='banner-subtitle'>
            <h2>Why slack off tomorrow?</h2>
          </div>

          <div className='banner-title'>
            <h1>When you can <span className='green'>Slack</span><span className='yellow'>Off</span> Today!</h1>
          </div>

          { this.buildButtons() }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { currentUser: state.session.currentUser };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (user) => dispatch(login(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Banner));
