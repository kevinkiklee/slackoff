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

        <section className='aboutWrapper'>
          <section className='aboutHeader'>
            <img src={ window.assets.bannerLogo } />
            <section className='aboutHeaderTitle'>
              <h4>About SlackOff</h4>
              <h4></h4>
            </section>
          </section>
          <section className='aboutDescription'>
            <p>This application is an App Academy portfolio project inspired by Slack</p><br />
            <p>Created by Kevin K. Lee.</p>
          </section>
          <section className='aboutLinks'>
            <a href='mailto:kevin.kik.lee@gmail.com' target='_blank'><i className="fa fa-envelope" aria-hidden="true"></i>E-Mail</a>
            <a href='http://kevinkiklee.com/' target='_blank'><i className="fa fa-globe" aria-hidden="true"></i>Portfolio</a>
            <a href='https://github.com/kevinkiklee' target='_blank'><i className="fa fa-github" aria-hidden="true"></i>GitHub</a>
          </section>
        </section>

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
