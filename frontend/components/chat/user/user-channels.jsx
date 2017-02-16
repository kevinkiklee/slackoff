import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import UserChannelItem from './user-channel-item';

class UserChannels extends React.Component {
  constructor(props) {
    super(props);
    const channels = ['westeros',
                      'the-wall',
                      'winterfell',
                      'winter-is-coming'];

    const currentChannel = 'westeros';

    this.state = {
      channels,
      currentChannel
    };

    this.buildChannelItems = this.buildChannelItems.bind(this);
    this.changeChannel = this.changeChannel.bind(this);
  }

  changeChannel(channel) {
    return (e) => (
      this.setState({ currentChannel: channel })
    );
  }

  buildChannelItems() {
    return this.state.channels.map((channel, i) => (
      <button key={i} onClick={ this.changeChannel(channel) }>
        <UserChannelItem key={ i }
          channel={ channel }
          currentChannel={ this.state.currentChannel }
        />
      </button>
    ));
  }

  render() {
    return (
      <section className='user-channels-container'>
        <h4>CHANNELS <span className='user-channels-count'>(47)</span></h4>
        <ul className='user-channels-list'>
          { this.buildChannelItems() }
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserChannels));
