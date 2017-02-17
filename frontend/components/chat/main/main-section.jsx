import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { fetchChannel } from '../../../actions/channel_actions';

import Header from './header';
import Messages from './messages';
import MessageInput from './message-input';

// import { login, logout, signup } from '../../actions/session_actions';

class MainSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  componentWillMount() {
    // debugger
    this.props.fetchChannel(this.props.user.id, this.props.user.current_channel);
  }

  render() {
    return (
      <section className='main-section'>

        <Header />
        <Messages />
        <MessageInput />

      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.session.currentUser,
    channel: state.channel
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainSection));
