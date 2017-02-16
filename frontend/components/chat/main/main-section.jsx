import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import Header from './header';
import Messages from './messages';
import MessageInput from './message-input';

// import { login, logout, signup } from '../../actions/session_actions';

class MainSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  render() {
    return (
      <section className='main-section'>

        <Header />
        <Messages />
        <MessageInput />

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
)(withRouter(MainSection));
