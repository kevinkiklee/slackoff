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

    if (this.props.guest2) {
      const user = {
        username: 'guest2',
        password: 'guest2login',
        email: 'guest2@guest2.com'
      };

      this.props.processForm(user).then(() => this.redirect());
    }

    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      password: this.props.user.password,
      photo_url: this.props.user.photo_url,
    }

    this.submitForm = this.submitForm.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.errorItems = this.errorItems.bind(this);
    this.redirect = this.redirect.bind(this);
    this.buildAvatarUpload = this.buildAvatarUpload.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  updateInput(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  updateFile(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({
        photo_url: fileReader.result
      });
    }

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  submitForm(e) {
    e.preventDefault();

    if (this.props.formType === 'signup') {
      let formData = new FormData();

      formData.append('user[username]', this.state.username);
      formData.append('user[email]', this.state.email);
      formData.append('user[password]', this.state.password);
      formData.append('user[photo_url]', this.state.photo_url);
      formData.append('user[avatarFile]', this.state.avatarFile);

      this.props.processForm(formData).then(() => this.redirect());
    } else {
      this.props.processForm(this.state).then(() => this.redirect());
    }
  }

  redirect() {
    this.props.router.push('/chat');
  }

  emailField() {
    return (
      <div>
        <input className='session-form-input'
               placeholder='E-mail Address'
               type='text'
               onChange={ this.updateInput('email') }
        /><br />
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
      const errors = this.props.errors.map((error, i) =>
        <li className='session-form-error' key={i}>{ error }</li>
      );

      return (
        <ul className='session-form-error-container'>
          { errors }
        </ul>
      );
    }
  }

  guestButton() {
    return (
      <button className='guest-btn shadow'
              onClick={ this.guestLogin }>
        Guest Login
      </button>
    );
  }

  buildAvatarUpload() {
    return (
      <div className='avatar-upload-container'>
        <h4>Upload your avatar (Optional)</h4>
        <div className='avatar-form'>
          <img src={ this.state.photo_url }></img>
          <input type='file' onChange={ this.updateFile } />
        </div>
      </div>
    );
  }

  render() {
    let titleText = 'Login to SlackOff';
    let directionText = <span>Enter your <b>username</b> and <b>password</b></span>;
    let buttonText = 'Login';
    let email = '';
    let avatarUpload = '';

    if(this.props.formType === 'signup') {
      titleText = 'Join SlackOff';
      directionText = <span>Enter your <b>username</b>, <b>e-mail</b> and <b>password</b></span>;
      buttonText = 'Join';
      email = this.emailField();
      avatarUpload = this.buildAvatarUpload();
    }

    return (
      <ReactCSSTransitionGroup transitionName="session-form"
        transitionAppear={true} transitionAppearTimeout={500}
        transitionEnter={true} transitionEnterTimeout={500}
        transitionLeave={true} transitionLeaveTimeout={500}>

        <div className='modal' onClick={ () => this.props.router.push('/') }/>

        <section className='session-form-container fade'>
          <div className='session-form shadow fade'>
            <h3 className='session-form-title'>{ titleText }</h3>
            <div className='session-form-direction'>
              { directionText }
            </div>

            { this.errorItems.call(this) }

            <form className='session-form-inputs' onSubmit={ this.submitForm }>
              <input className='session-form-input'
                     placeholder='Username'
                     type='text'
                     onChange={ this.updateInput('username') }
              /><br />

              { email }

              <input className='session-form-input'
                     placeholder='Password'
                     type='password'
                     onChange={ this.updateInput('password') }
              /><br />

            { avatarUpload }

              <div className='session-form-submit-button'>
                <input className='shadow-sm'
                       type='submit'
                       value={ buttonText }
                />
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
