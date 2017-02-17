import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { fetchChannel } from '../../../actions/channel_actions';

import UserControl from './user-control';
import UserChannels from './user-channels';
import UserDMs from './user-dms';

class UserSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentWillMount() {
    // debugger
    this.props.fetchChannel(this.props.user.id, this.props.user.current_channel);
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
  // debugger
  return { user: state.session.currentUser };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserSection));
