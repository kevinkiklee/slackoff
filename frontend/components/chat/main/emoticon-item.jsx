import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import { Emoji } from 'emoji-mart';
import ReactTooltip from 'react-tooltip';
import find from 'lodash/find';

import { addEmoticon,
         removeEmoticon } from '../../../actions/message_actions';

class EmoticonItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.getUsernames = this.getUsernames.bind(this);
    this.authorsTooltip = this.authorsTooltip.bind(this);

    this.removeAuthor = this.removeAuthor.bind(this);
    this.addAuthor = this.addAuthor.bind(this);
    this.checkAuthor = this.checkAuthor.bind(this);
    this.findEmoticonId = this.findEmoticonId.bind(this);
  }

  componentWillUnmount() {
    ReactTooltip.hide(findDOMNode(this.refs.tooltip));
  }

  getUsernames(userIds) {
    const usernames = [];

    if (this.props.users[0]) {
      userIds.forEach((id) => {
        if (id === this.props.userId) {
          usernames.unshift('@you');
        } else {
          const username = find(this.props.users, { 'id': id }).username;
          usernames.push('@' + username);
        }
      });
    }

    return usernames;
  }

  authorsTooltip() {
    const usernames = this.getUsernames(this.props.authors);
    const authors = usernames.join(', ');
    const emoticon = ' reacted with ' + this.props.emoticon;

    const tooltipString = authors + emoticon;

    return tooltipString;
  }

  removeAuthor() {
    const emoticonId = this.findEmoticonId();
    this.props.removeEmoticon(emoticonId);
  }

  addAuthor() {
    const emoticon = {
      user_id: this.props.userId,
      message_id: this.props.messageId,
      icon: this.props.emoticon
    };

    this.props.addEmoticon(emoticon);
  }

  checkAuthor() {
    return this.props.authors.includes(this.props.userId);
  }

  findEmoticonId() {
    return find(this.props.allEmoticons,
                { 'user_id': this.props.userId,
                  'icon': this.props.emoticon }).id;
  }

  handleClick(e) {
    if (this.checkAuthor()) {
      this.removeAuthor();
    } else {
      this.addAuthor();
    }
  }

  render() {
    const emojiSize = 16;
    const tooltip = this.authorsTooltip();

    return (
      <p ref='tooltip' className='emoticonToolip' data-tip={ tooltip }>
        <button className='emoticonItem'
                onClick={ this.handleClick }>
          <ReactTooltip place="top" type="dark" effect="solid"/>
          <Emoji emoji={ this.props.emoticon }
                 size={ emojiSize } />
          <p>{ this.props.count }</p>
        </button>
      </p>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userId: state.session.currentUser.id,
  channelId: state.channel.id,
  messageId: ownProps.messageId,
  emoticon: ownProps.emoticon,
  allEmoticons: ownProps.allEmoticons,
  authors: ownProps.authors,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  addEmoticon: (icon) => dispatch(addEmoticon(icon)),
  removeEmoticon: (id) => dispatch(removeEmoticon(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmoticonItem);
