import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { fetchChannel } from '../../../actions/channel_actions';
import { setChannel } from '../../../actions/current_channel_actions';

import UserControl from './user-control';
import UserChannels from './user-channels';
import UserDMs from './user-dms';

class UserSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className='user-section'>

        <UserControl />
        <UserChannels />
        <UserDMs />

      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.session.currentUser,
           channel: state.channel };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  setChannel: (channel) => dispatch(setChannel(channel))
});

export default connect(
  null, null
)(withRouter(UserSection));
