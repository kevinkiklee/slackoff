import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import merge from 'lodash/merge';
import { Picker } from 'emoji-mart';

import { addEmoticon } from '../../../actions/message_actions';
import { closeEmoticonPicker } from '../../../actions/modal_actions';

class EmoticonPicker extends React.Component {
  constructor(props) {
    super(props);

    this.addEmoticon = this.addEmoticon.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick(e) {
    if(!ReactDOM.findDOMNode(this).contains(e.target)
        && e.target.className !== "emoji-mart-search") {
      this.props.closeEmoticonPicker();
    }
  }

  addEmoticon(event) {
    const emoticon = {
      user_id: this.props.userId,
      message_id: this.props.messageId,
      icon: event.id
    };

    this.props.addEmoticon(emoticon);
  }

  render() {
    if (this.props.emoticonPicker
        && this.props.messageId === this.props.pickerMsgId) {
      return (
        <div className='emojiPickerContainer'>
          <Picker onClick={ this.addEmoticon }/>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  messageId: ownProps.message.id,
  userId: state.session.currentUser.id,
  emoticonPicker: state.modal.emoticonPicker,
  pickerMsgId: state.modal.messageId,
});

const mapDispatchToProps = (dispatch) => ({
  addEmoticon: (icon) => dispatch(addEmoticon(icon)),
  closeEmoticonPicker: () => dispatch(closeEmoticonPicker()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmoticonPicker);
