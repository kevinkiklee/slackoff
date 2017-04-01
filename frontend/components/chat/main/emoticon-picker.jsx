import React from 'react';
import { connect } from 'react-redux';

import merge from 'lodash/merge';
import { Picker } from 'emoji-mart';

import { addEmoticon } from '../../../actions/message_actions';

class EmoticonPicker extends React.Component {
  constructor(props) {
    super(props);

    this.addEmoticon = this.addEmoticon.bind(this);
  }

  addEmoticon(event) {
    const emoticon = {
      user_id: this.props.userId,
      message_id: this.props.messageId,
      icon: event.id
    }
    this.props.addEmoticon(emoticon);
  }

  render() {
    return (
      <div className='emojiPickerContainer'>
        <Picker onClick={ this.addEmoticon }/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  messageId: ownProps.message.id,
  userId: state.session.currentUser.id
});

const mapDispatchToProps = (dispatch) => ({
  addEmoticon: (icon) => dispatch(addEmoticon(icon))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmoticonPicker);
