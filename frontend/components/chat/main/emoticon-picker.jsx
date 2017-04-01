import React from 'react';
import { connect } from 'react-redux';

import merge from 'lodash/merge';
import { Picker } from 'emoji-mart';

import { updateMessage } from '../../../actions/message_actions';

class EmoticonPicker extends React.Component {
  constructor(props) {
    super(props);

    this.addEmoticon = this.addEmoticon.bind(this);
  }

  addEmoticon(event) {
    let message = merge({}, this.state.message);
    message.emoticons.push();
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
  message: ownProps.message,
  user: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  updateMessage: (message) => dispatch(updateMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmoticonPicker);
