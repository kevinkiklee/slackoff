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
  }

  updateInput(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  submitForm(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => this.redirect());
  }

  redirect() {
    this.props.router.push('/chat');
  }

  emailField() {
    return (
      <div>
        <label className='session-form-label'>Email</label><br />
        <input className='session-form-input' type='text' onChange={ this.updateInput('email') } /><br />
      </div>
    );
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formType !== newProps.formType) {
      this.props.clearErrors();
    }
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
    let text = 'LOGIN';
    let email = '';

    if(this.props.formType === 'signup') {
      text = 'SIGNUP';
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
            <h3 className='session-form-title'>{ text }</h3>

            { this.errorItems.call(this) }

            <form onSubmit={ this.submitForm }>
              <label className='session-form-label'>Username</label><br />
              <input className='session-form-input' type='text' onChange={ this.updateInput('username') } /><br />

              { email }

              <label className='session-form-label'>Password</label><br />
              <input className='session-form-input' type='password' onChange={ this.updateInput('password') } /><br />

              <div className='session-form-submit-button'>
                <input className='shadow-sm' type='submit' value={ text } />
              </div>
            </form>
          </div>
        </section>

      </ReactCSSTransitionGroup>
    );
  }
}

// <i className="fa fa-2 fa-arrow-circle-right" aria-hidden="true" />

const mapStateToProps = (state, ownProps) => {
  let user = {
    username: '',
    password: '',
    email: ''
  };

  const loggedIn = state.session.currentUser === null ? false: true;
  const errors = state.session.errors || [];
  let formType = 'login';

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
