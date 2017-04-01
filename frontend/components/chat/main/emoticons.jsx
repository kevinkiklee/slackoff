import React from 'react';
import { connect } from 'react-redux';

import EmoticonItem from './emoticon-item';
import { Emoji } from 'emoji-mart';

class Emoticons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icons: this.props.icons
    }

    this.buildIcons = this.buildIcons.bind(this);
  }

  buildIcons() {
    return this.state.icons.map((icon, i) => (
      <li><EmoticonItem key={ i } icon={ icon } /></li>
    ));
  }

  render() {
    const emojiSize = 18;

    return (
      <div className='emoticonsContainer'>
        <ul className='emoticonsList'>
          { this.buildIcons() }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.session.currentUser,
  icons: ownProps.icons
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  null
)(Emoticons);
