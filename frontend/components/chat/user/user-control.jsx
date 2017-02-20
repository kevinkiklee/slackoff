import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import Modal from 'react-modal';

import { logout } from '../../../actions/session_actions';

class UserControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMenu: false
    };

    this.logout = this.logout.bind(this);

    this.editProfile = this.editProfile.bind(this);

    this.openUserMenu = this.openUserMenu.bind(this);
    this.closeUserMenu = this.closeUserMenu.bind(this);
    this.userMenu = this.userMenu.bind(this);
  }

  logout() {
    console.log('logout button clicked');
    // debugger

    this.props.logout().then(() => {

      this.props.router.push('/')
    });
  }

  editProfile() {
    console.log('edit profile button clicked');
  }

  openUserMenu() {
    console.log('open usermenu');
    this.setState({ userMenu: true });
  }

  closeUserMenu() {
    console.log('close usermenu');
    this.setState({ userMenu: false });
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

    if(this.props.user) {
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
                      onClick={ this.editProfile }>
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
    } else {
      this.props.router.push('/');
    }
  }

  render() {
    return (
      <section className='user-control-container'>
        { this.userMenu() }
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
