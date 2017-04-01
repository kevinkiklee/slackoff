import React from 'react';
import { connect } from 'react-redux';
import { Emoji } from 'emoji-mart';

class EmoticonItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const emojiSize = 14;

    return (
      <button className='emoticonItem'>
        <Emoji emoji={ this.props.icon.id }
               size={ emojiSize } />
        <p>1</p>
      </button>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.session.currentUser,
  icon: ownProps.icon
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  null
)(EmoticonItem);
