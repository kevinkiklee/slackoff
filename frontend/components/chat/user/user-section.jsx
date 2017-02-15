import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import UserControl from './user-control';
import UserChannels from './user-channels';
import UserDMs from './user-dms';
// import { login, logout, signup } from '../../actions/session_actions';

class UserSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  render() {
    return (
      <section className='user-section'>

        <UserControl />
        <UserChannels />
        <UserDMs />

      </section>
    );
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
)(withRouter(UserSection));
