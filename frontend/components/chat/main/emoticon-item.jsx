import React from 'react';
import { connect } from 'react-redux';
import { Emoji } from 'emoji-mart';

class EmoticonItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const emojiSize = 16;

    return (
      <button className='emoticonItem'>
        <Emoji emoji={ this.props.emoticon }
               size={ emojiSize } />
        <p>{ this.props.count }</p>
      </button>
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
