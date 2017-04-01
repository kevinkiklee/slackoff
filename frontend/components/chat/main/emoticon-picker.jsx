import React from 'react';
import { connect } from 'react-redux';

import { Picker } from 'emoji-mart'

class EmoticonPicker extends React.Component {
  constructor(props) {
    super(props);

    this.addEmoji = this.addEmoji.bind(this);
  }

  addEmoji(event) {
    console.log(event);
    console.log(event.currentTarget);
  }

  render() {
    return (
      <div className='emojiPickerContainer'>
        <Picker set='emojione'
                onClick={ this.addEmoji }/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
  mapStateToProps,
  null
)(EmoticonPicker);
