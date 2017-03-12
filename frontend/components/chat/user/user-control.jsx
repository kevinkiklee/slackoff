import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import Modal from 'react-modal';
import { openEditUserFormModal,
         openUserMenuModal,
         closeUserMenuModal } from '../../../actions/modal_actions';

import UserEditForm from './user-edit-form';
import { logout } from '../../../actions/session_actions';

class UserControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEditForm: false
    };

    this.logout = this.logout.bind(this);
    this.userMenu = this.userMenu.bind(this);
  }

  logout() {
    this.props.closeUserMenuModal();

    this.props.logout().then(() => {
      this.props.router.push('/')
    });
  }

  userMenu() {
    const style = {
      overlay : {
        backgroundColor : 'rgba(255, 255, 255, 0)',
        zIndex          : 10
      },

      content: {
        position        : 'fixed',
        boxSizing       : 'border-box',
        boxShadow       : '1px 1px 5px 0px rgba(50, 50, 50, 0.3)',
        top             : '55px',
        left            : '15px',
        width           : '230px',
        height          : '167px',
        border          : '1px solid #ccc',
        borderRadius    : '5px',
        padding         : '0px',
        transition      : 'all 0.3s ease 0s',
        zIndex          : 11
      }
    };

    return(
      <div>
      <UserEditForm />
        <Modal isOpen={ this.props.userMenu }
               onRequestClose={ this.props.closeUserMenuModal }
               contentLabel='UserMenu'
               style={ style }>
          <section className='user-control-menu-container'>
            <section className='user-control-menu-info-container'>
              <img src={ this.props.user.photo_url } />

              <div className='user-name-container'>
                <div className='user-username'>
                  { this.props.user.username }
                </div>
                <div className='user-channelname'>
                  @{ this.props.user.username }
                </div>
              </div>
            </section>

            <section className='user-control-menu-profile-container'>
              <button className='user-control-menu-edit-profile-btn'
                      onClick={ this.props.openEditUserFormModal }>
                Edit Profile
              </button>
            </section>
            <section className='user-control-menu-logout-container'>
              <button className='user-menu-edit-logout-btn'
                      onClick={ this.logout }>
                Logout from SlackOff
              </button>
            </section>
          </section>
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <section className='user-control-container'>
        { this.userMenu() }

        <button onClick={ this.props.openUserMenuModal }>

          <div className='user-control-title'>
            <h2>SlackOff</h2>
          </div>

          <div className='user-control-name'>
            <img src={ window.assets.iconOnline } />
            <p>{ this.props.user.username }</p>
          </div>

          <i className="user-control-icon fa fa-bars fa-3" aria-hidden="true"></i>

        </button>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.session.currentUser,
  userMenu: state.modal.userMenu
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  openEditUserFormModal: () => dispatch(openEditUserFormModal()),
  openUserMenuModal: () => dispatch(openUserMenuModal()),
  closeUserMenuModal: () => dispatch(closeUserMenuModal()),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserControl));
