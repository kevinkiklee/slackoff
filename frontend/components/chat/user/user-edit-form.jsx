import React from 'react';
import { connect } from 'react-redux';

import Modal from 'react-modal';

import { updateUser } from '../../../actions/session_actions';
import { closeEditUserFormModal } from '../../../actions/modal_actions';

class UserEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.user.username,
      userEmail: this.props.user.email,
      userAvatar: this.props.user.photo_url,
    };
  }

  handleEditInput() {

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
        top             : '200px',
        bottom          : '200px',
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
    // debugger
    return (
      <Modal isOpen={ this.props.editUserForm }
             onRequestClose={ this.props.closeEditUserFormModal }
             contentLabel='EditProfileForm'
             style={ style }>
        <div className='editUserFormWrapper'>
          <h1>Edit Profile</h1>
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
