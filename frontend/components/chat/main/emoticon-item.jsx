import React from 'react';
import { connect } from 'react-redux';
import { Emoji } from 'emoji-mart';

import ReactTooltip from 'react-tooltip'
import find from 'lodash/find';

class EmoticonItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // showAuthors: false
    }

    this.handleClick = this.handleClick.bind(this);
    // this.showAuthors = this.showAuthors.bind(this);
    // this.hideAuthors = this.hideAuthors.bind(this);
    this.getUsernames = this.getUsernames.bind(this);
    this.authorsTooltip = this.authorsTooltip.bind(this);
  }

  // Onclick:
    // If authors contain currentuser, destroy
    // If authors do not contain currentuser, create

  // Onhover:
    // Show the authors

  getUsernames(userIds) {
    const usernames = [];

    userIds.forEach((id) => {
      if (id === this.props.userId) {
        usernames.unshift('@you');
      } else {
        let username = find(this.props.users, { 'id': id }).username
        usernames.push('@' + username);
      }
    });

    return usernames;
  }

  authorsTooltip() {
    const usernames = this.getUsernames(this.props.authors);
    const authors = usernames.join(', ');
    const emoticon = ' reacted with ' + this.props.emoticon;

    const tooltipString = authors + emoticon;

    return tooltipString;
  }

  handleClick(e) {
    
  }

  render() {
    const emojiSize = 16;
    const tooltip = this.authorsTooltip();

    return (
      <p className='emoticonToolip' data-tip={ tooltip }>
        <button className='emoticonItem'
                onClick={ this.handleClick }>
          <ReactTooltip place="top" type="dark" effect="solid"/>
          <Emoji emoji={ this.props.emoticon }
                 size={ emojiSize } />
          <p>{ this.props.count }</p>
        </button>
      </p>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  userId: state.session.currentUser.id,
  channelId: state.channel.id,
  emoticon: ownProps.emoticon,
  authors: ownProps.authors,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  null
)(EmoticonItem);
