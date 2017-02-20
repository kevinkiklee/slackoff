import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { login, signup, clearErrors } from '../../actions/session_actions';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.guest) {
      const user = {
        username: 'guest',
        password: 'guestlogin',
        email: 'guest@guest.com'
      };

      this.props.processForm(user).then(() => this.redirect());
    }

    this.state = this.props.user;

    this.submitForm = this.submitForm.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.errorItems = this.errorItems.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  updateInput(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  submitForm(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    // debugger
    this.props.processForm(user).then(() => this.redirect());
  }

  redirect() {
    this.props.router.push('/chat');
  }

  emailField() {
    return (
      <div>
        <input className='session-form-input' placeholder='E-mail Address' type='text' onChange={ this.updateInput('email') } /><br />
      </div>
    );
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formType !== newProps.formType) {
      this.props.clearErrors();
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  errorItems() {
    if(this.props.errors.length > 0) {
      const errors = this.props.errors.map((error, i) => <li className='session-form-error' key={i}>{ error }</li>);

      return (
        <ul className='session-form-error-container'>
          { errors }
        </ul>
      );
    }
  }

  guestButton() {
    return (
      <button className='guest-btn shadow' onClick={ this.guestLogin }>Guest Login</button>
    );
  }

  render() {
    let titleText = 'Login to SlackOff';
    let directionText = <span>Enter your <b>username</b> and <b>password</b></span>;
    let buttonText = 'Login';

    let email = '';

    if(this.props.formType === 'signup') {
      titleText = 'Join SlackOff';
      directionText = <span>Enter your <b>username</b>, <b>e-mail</b> and <b>password</b></span>;
      buttonText = 'Join';
      email = this.emailField();
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="session-form"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={true}
        transitionEnterTimeout={500}
        transitionLeave={true}
        transitionLeaveTimeout={500}>

        <div className='modal' onClick={ () => this.props.router.push('/') }/>

        <section className='session-form-container fade'>
          <div className='session-form shadow fade'>
            <h3 className='session-form-title'>{ titleText }</h3>
            <div className='session-form-direction'>
              { directionText }
            </div>

            { this.errorItems.call(this) }

            <form onSubmit={ this.submitForm }>
              <input className='session-form-input' placeholder='Username' type='text' onChange={ this.updateInput('username') } /><br />

              { email }

              <input className='session-form-input' placeholder='Password' type='password' onChange={ this.updateInput('password') } /><br />

              <div className='session-form-submit-button'>
                <input className='shadow-sm' type='submit' value={ buttonText } />
              </div>
            </form>
          </div>
        </section>

      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let user = {
    username: '',
    password: '',
    email: '',
    photo_url: window.assetsUrl.logoSq
  };

  let formType = 'login';

  const loggedIn = state.session.currentUser === null ? false: true;
  const errors = state.session.errors || [];

  if (ownProps.location.pathname === '/signup') {
    formType = 'signup';
  }

  return { user, loggedIn, errors, formType };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.location.pathname === '/signup' ? signup : login;

  return {
    processForm: (user) => dispatch(action(user)),
    clearErrors: () => dispatch(clearErrors()),
    login: (user) => dispatch(login(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SessionForm));
