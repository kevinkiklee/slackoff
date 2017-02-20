import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

// import { login, logout, signup } from '../../actions/session_actions';

class ChannelIndex extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.props.state;
  }

  render() {
    return (
      <h1>ChannelIndex</h1>
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
)(withRouter(ChannelIndex));
