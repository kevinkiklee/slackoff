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
      <label>Email<br />
        <input type='text' onChange={ this.updateInput('email') } /><br />
      </label>
    );
  }

  render() {
    let text = 'Login';
    let email = '';

    if(this.props.formType === 'signup') {
      text = 'Signup';
      email = this.emailField();
    }

    const errors = this.props.errors.map((error, i) => <li key={i}>{ error }</li>);

    return (
      <div className='session-form'>
        <h3>{ text }</h3>
        <ul>{ errors }</ul>

        <form onSubmit={ this.submitForm.bind(this) }>
          <label>Username:<br />
            <input type='text' onChange={ this.updateInput('username') } />
          </label><br />

          { email }

          <label>Password:<br />
            <input type='password' onChange={ this.updateInput('password') } />
          </label><br />

          <input type='submit' value={ text } />
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
