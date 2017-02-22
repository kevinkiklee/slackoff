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
    const channelName = this.props.channel.displayName || this.props.channel.name;

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
  userCount: state.channel.userCount
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
