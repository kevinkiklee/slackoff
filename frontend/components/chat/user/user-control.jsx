import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

// import { login, logout, signup } from '../../actions/session_actions';

class UserControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
    this.displayUserMenu = this.displayUserMenu.bind(this);
  }

  displayUserMenu() {
    console.log('Display User Menu');
  }

  render() {
    return (
      <section className='user-control-container'>
        <button onClick={ this.displayUserMenu }>
          <div className='user-control-title'>
            <h2>SlackOff</h2>
          </div>

          <div className='user-control-name'>
            <img src={ window.assets.iconOnline } />
            <p>{ this.props.user.username }</p>
          </div>
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.session.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserControl));
