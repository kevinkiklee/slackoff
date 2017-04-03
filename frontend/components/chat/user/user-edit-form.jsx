import React from 'react';
import { connect } from 'react-redux';

import Modal from 'react-modal';

import { updateUser } from '../../../actions/session_actions';
import { closeEditUserFormModal } from '../../../actions/modal_actions';

class UserEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      email: this.props.user.email,
      photo_url: this.props.user.photo_url,
    };

    this.handleInput = this.handleInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateFile = this.updateFile.bind(this);
  }

  updateFile(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({
        photo_url: fileReader.result
      });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleInput(field) {
    return (e) => {
      e.preventDefault();
      this.setState({ [field]: e.target.value });
    };
  }

  submitForm(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('user[id]', this.props.user.id);
    formData.append('user[email]', this.state.email);
    formData.append('user[photo_url]', this.state.photo_url);

    this.props.updateUser(formData).then(() =>
      this.props.closeEditUserFormModal()
    );
  }

  render() {
    const style = {
      overlay : {
        backgroundColor : 'rgba(255, 255, 255, 0.9)',
        zIndex          : 10
      },

      content : {
        position        : 'fixed',
        boxSizing       : 'border-box',
        boxShadow       : '1px 1px 5px 0px rgba(50, 50, 50, 0.3)',
        top             : '150px',
        bottom          : '150px',
        left            : '200px',
        right           : '200px',
        border          : '1px solid #ccc',
        borderRadius    : '5px',
        paddingTop      : '50px',
        paddingBottom   : '50px',
        transition      : 'all 0.3s ease 0s',
        zIndex          : 11
      }
    };

    return (
      <Modal isOpen={ this.props.editUserForm }
             onRequestClose={ this.props.closeEditUserFormModal }
             contentLabel='EditProfileForm'
             style={ style }>
        <div className='editUserFormWrapper'>
          <h1>Edit Profile</h1>
          <form className='editUserForm' onSubmit={ this.submitForm }>
            <h4>Current E-mail Address</h4>
            <input type='text'
              value={ this.state.email }
              onChange={ this.handleInput('email')} />

            <h4>Current Avatar</h4>
            <div className='editAvatarForm'>
              <img src={ this.state.photo_url }></img>
              <input type='file' onChange={ this.updateFile } />
            </div>

            <input type='submit' value='Save' />
          </form>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.session.currentUser,
  editUserForm: state.modal.editUserForm
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateUser: (formData) => dispatch(updateUser(formData)),
  closeEditUserFormModal: () => dispatch(closeEditUserFormModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEditForm);
