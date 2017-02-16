import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import UserDMItem from './user-dm-item';

// import { login, logout, signup } from '../../actions/session_actions';

class UserDMs extends React.Component {
  constructor(props) {
    super(props);
    const dms = ['jon.snow (you)',
                 'ned.stark',
                 'daenerys',
                 'tyrion'];

    this.state = {
      dms
    };

    // this.state = this.props.state;
    this.buildDMItems = this.buildDMItems.bind(this);
    this.messageFriend = this.messageFriend.bind(this);
  }

  messageFriend(friend) {
    return (e) => {
      console.log('Friend: ' + friend);
    };
  }

  buildDMItems() {
    return this.state.dms.map((friend, i) => (
      <button key={ i } onClick={ this.messageFriend(friend) }>
        <UserDMItem key={ i } friend={ friend } />
      </button>
    ));
  }

  render() {
    return (
      <section className='user-dms-container'>
        <h4>DIRECT MESSAGES</h4>
        <ul className='user-dms-list'>
          { this.buildDMItems() }
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
)(withRouter(UserDMs));
