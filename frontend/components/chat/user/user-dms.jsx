import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import UserDMItem from './user-dm-item';

import { openDirectMessageModal } from '../../../actions/modal_actions';

import DirectMessage from '../channel/direct-message.jsx';

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

    this.buildDMItems = this.buildDMItems.bind(this);
    this.messageFriend = this.messageFriend.bind(this);
    this.openDirectMessageForm = this.openDirectMessageForm.bind(this);
  }

  messageFriend(friend) {
    return (e) => {
      console.log('Friend: ' + friend);
    };
  }

  openDirectMessageForm() {
    this.props.openDirectMessageModal();
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
        <DirectMessage />
        <button onClick={ this.openDirectMessageForm }>
          <h4>DIRECT MESSAGES</h4>
        </button>

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
  openDirectMessageModal: () => dispatch(openDirectMessageModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserDMs));
