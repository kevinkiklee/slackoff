import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import UserChannelItem from './user-channel-item';

// import { login, logout, signup } from '../../actions/session_actions';

class UserChannels extends React.Component {
  constructor(props) {
    super(props);
    const channels = ['westeros',
                      'the-wall',
                      'winterfell',
                      'winter-is-coming'];

    this.state = {
      channels
    };

    // this.state = this.props.state;
    this.buildChannelItems = this.buildChannelItems.bind(this);
  }

  buildChannelItems() {
    return this.state.channels.map((channel, i) => <UserChannelItem key={ i }
                                                                    channel={ channel }
                                                    />);
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
