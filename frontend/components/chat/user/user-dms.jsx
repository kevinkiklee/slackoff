import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import UserDMItem from './user-dm-item';
import DirectMessage from '../channel/direct-message.jsx';

import { openDirectMessageModal } from '../../../actions/modal_actions';
import { setChannel } from '../../../actions/current_channel_actions';
import { fetchChannel } from '../../../actions/channel_actions';


class UserDMs extends React.Component {
  constructor(props) {
    super(props);

    this.buildDMItems = this.buildDMItems.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.openDirectMessageForm = this.openDirectMessageForm.bind(this);
  }

  sendMessage(channel) {
    return (e) => {
      this.props.fetchChannel(this.props.user.id, channel.id)
                .then((newChannel) => {
                  const channel = {
                    id: newChannel.channel.id,
                    name: newChannel.channel.name,
                    description: newChannel.channel.description
                  };

                  this.props.setChannel(channel);
                  this.setState({ currentMessage: channel });
                });
    };
  }

  openDirectMessageForm() {
    this.props.openDirectMessageModal([]);
  }

  buildDMItems() {
    return this.props.directMessages.map((directMessage, i) => (
      <button key={ i } onClick={ this.sendMessage(directMessage) }>
        <UserDMItem
          key={ i }
          directMessage={ directMessage }
          currentMessage={ this.props.currentMessage }
        />
      </button>
    ));
  }

  render() {
    return (
      <section className='user-dms-container'>
        <DirectMessage givenUser={ [] }/>
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
  user: state.session.currentUser,
  directMessages: state.session.currentUser.directMessages,
  currentMessage: state.channel
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  openDirectMessageModal: () => dispatch(openDirectMessageModal()),
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  setChannel: (channel) => dispatch(setChannel(channel))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserDMs));
