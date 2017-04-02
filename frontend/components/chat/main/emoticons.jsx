import React from 'react';
import { connect } from 'react-redux';

import EmoticonItem from './emoticon-item';

class Emoticons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icons: this.props.icons,
      isOpened: true
    }

    this.buildIcons = this.buildIcons.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ icons: newProps.icons });
  }

  buildIcons() {
    return this.state.icons.map((icon, i) => (
      <li key={ i } ><EmoticonItem icon={ icon } /></li>
    ));
  }

  render() {
    if (this.state.isOpened) {
      return (
        <div className='emoticonsContainer'>
          <ul className='emoticonsList'>
            { this.buildIcons() }
          </ul>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
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
