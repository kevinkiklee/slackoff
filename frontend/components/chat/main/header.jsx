import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.channel;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.channel);
  }

  render() {
    let channelName = this.props.channel.name;

    if (this.props.channel.private === true) {
      let channelNameFiltered = this.props.channel.users
      .sort((a, b) => {
        let nameA = a.username.toUpperCase();
        let nameB = b.username.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      }).map((user) => {
        if (user.id !== this.props.user.id) {
          return user.username;
        }
      });

      let filtered = channelNameFiltered.filter((el) => (el !== undefined));
      channelName = filtered.join(', ');
    }


    return (
      <section className='header-container'>
        <div className='channel-info-container'>

          <div className='channel-info-name'>
            <button>
              <h2>#{ channelName }</h2>
            </button>
          </div>

          <div className='channel-info-details-container'>
              <div className='channel-info-details-count'>
                <button>
                  <img src={ window.assets.iconMemberCount } />
                  <span>{ this.props.userCount }</span>
                </button>
              </div>

              <div className='channel-info-details-description'>
                <button>
                  <p>{ this.props.channel.description }</p>
                </button>
              </div>
          </div>
        </div>

        <div className='header-icons-container'>
          <div className='channel-settings-icon'>
            <button>
              <i className="fa fa-cog fa-4" aria-hidden="true"></i>
            </button>
          </div>
          <div className='sidebar-toggle-icon'>
            <button>
              <i className="fa fa-columns fa-4" aria-hidden="true"></i>
            </button>
          </div>
        </div>

      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  channel: state.channel,
  user: state.session.currentUser,
  userCount: state.channel.userCount
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
