import { connect } from 'react-redux';
import React from 'react';
import { Link, withRouter } from 'react-router';

import SessionControl from '../authentication/session_control';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='chat-container'>
        <nav className='landing-page-nav'>
          <div className='landing-page-logo'>
            <Link to='/'>SlackOff</Link>
          </div>
          <div className='session-control-container'>
            <SessionControl />
          </div>
        </nav>
        <h1>Main Chat</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Chat));
