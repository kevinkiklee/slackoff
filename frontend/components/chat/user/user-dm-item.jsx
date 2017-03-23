import React from 'react';
import { connect } from 'react-redux';

class UserDMItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  render() {
    let directMessageName = this.props.directMessage.users
          .sort((a, b) => {
            let nameA = a.username.toUpperCase();
            let nameB = b.username.toUpperCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;

            return 0;
          }).map((user) => {
              if (user.id !== this.props.currentUserId)
                return user.username;
            }).join(', ');

    let selected = 'user-dm-friend';

    if (this.props.currentMessage.id == this.props.directMessage.id) {
      selected = 'selected-direct-message';
    }

    return (
      <li className={ selected }>
        <div className='user-dm-friend-container'>
          <span className='user-dm-tag'>@ </span>
          <p>{ directMessageName }</p>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  directMessage: ownProps.directMessage,
  currentUserId: state.session.currentUser.id
});

export default connect(
  mapStateToProps,
  null
)(UserDMItem);
