import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

// import { login, logout, signup } from '../../actions/session_actions';

class UserChannelItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  render() {
    // debugger
    if (this.props.currentChannel === this.props.channel) {
      return (
        <li className='user-channels-item selected-channel'>
          <span className='channel-tag'># </span>
          { this.props.channel }
        </li>
      );
    } else {
      return (
        <li className='user-channels-item'>
          <span className='channel-tag'># </span>
          { this.props.channel }
        </li>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserChannelItem));
