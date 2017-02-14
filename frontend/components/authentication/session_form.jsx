import React from 'react';
import { connect } from 'react-redux';
import { login, signup } from '../../actions/session_actions';
import { withRouter } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: ''
    };

    this.submitForm = this.submitForm.bind(this);
    this.updateInput = this.updateInput.bind(this);
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
    this.props.router.push('/');
  }

  emailField() {
    return (
      <div>
      <label className='session-form-label'>Email</label><br />
      <input className='session-form-input' type='text' onChange={ this.updateInput('email') } /><br />
      </div>
    );
  }

  render() {
    let text = 'LOGIN';
    let email = '';

    if(this.props.formType === 'signup') {
      text = 'SIGNUP';
      email = this.emailField();
    }

    const errors = this.props.errors.map((error, i) => <li key={i}>{ error }</li>);

    return (
      <div className='session-form shadow'>
        <h3 className='session-form-title'>{ text }</h3>
        <ul>{ errors }</ul>

        <form onSubmit={ this.submitForm.bind(this) }>
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
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const loggedIn = state.session.currentUser === null ? false: true;
  const errors = state.session.errors || [];
  let formType = 'login';

  if (ownProps.location.pathname === '/signup') {
    formType = 'signup';
  }

  return { loggedIn, errors, formType };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const action = ownProps.location.pathname === '/signup' ? signup : login;

  return {
    processForm: (user) => dispatch(action(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SessionForm));
