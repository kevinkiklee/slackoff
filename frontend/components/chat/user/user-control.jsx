import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import Modal from 'react-modal';

import { logout } from '../../../actions/session_actions';

class UserControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMenu: false,
      editProfileForm: false
    };

    this.logout = this.logout.bind(this);

    this.openEditProfileForm = this.openEditProfileForm.bind(this);
    this.closeEditProfileForm = this.closeEditProfileForm.bind(this);

    this.openUserMenu = this.openUserMenu.bind(this);
    this.closeUserMenu = this.closeUserMenu.bind(this);
    this.userMenu = this.userMenu.bind(this);
  }

  logout() {
    this.props.logout().then(() => {
      this.props.router.push('/')
    });
  }

  openEditProfileForm() {
    this.setState({ userMenu: false,
                    editProfileForm: true });
  }

  closeEditProfileForm() {
    this.setState({ userMenu: false,
                    editProfileForm: false });
  }

  openUserMenu() {
    this.setState({ userMenu: true });
  }

  closeUserMenu() {
    this.setState({ userMenu: false });
  }

  editProfileForm() {
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

    return (
      <Modal isOpen={ this.state.editProfileForm }
             onRequestClose={ this.closeEditProfileForm }
             contentLabel='EditProfileForm'
             style={ style }>
          <div className='editProfileFormWrapper'>
            <h1>Edit Profile</h1>
          </div>
      </Modal>
    )
  }

  userMenu() {
    const style = {
      overlay : {
        backgroundColor : 'rgba(255, 255, 255, 0)',
        zIndex          : 10
      },
      content : {
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
      <Modal isOpen={ this.state.userMenu }
             onRequestClose={ this.closeUserMenu }
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
                    onClick={ this.openEditProfileForm }>
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
    );
  }

  render() {
    if (this.props.user) {
      return (
        <section className='user-control-container'>
          { this.userMenu() }
          { this.editProfileForm() }

          <button onClick={ this.openUserMenu }>

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
    } else {
      return (
        <div></div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.session.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserControl));
