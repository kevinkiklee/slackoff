import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { fetchPublicChannels } from '../../../actions/channel_actions';

class ChannelsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: []
    };

    this.buildChannelItems = this.buildChannelItems.bind(this);
    this.setCurrentChannel = this.setCurrentChannel.bind(this);
  }

  componentDidMount() {
    this.props.fetchPublicChannels().then((data) => {
      // debugger
      this.setState({ channels: data.channels });
    });
  }

  setCurrentChannel(channel) {

  };

  buildChannelItems() {
    // debugger
    return this.state.channels.map((channel, i) => {
      // debugger
      return (
        <li className='channels-view-item-container' key={ i }>
          <button className='channels-view-item-btn' onClick={ this.setCurrentChannel }>
            <div className='channels-view-item-name'>
              <h2># { channel.name }</h2>
              <h3>Created on { channel.created_at }</h3>
              <h4>{ channel.description }</h4>
            </div>
            <div className='channels-view-item-user-count'>
              <img src={ window.assets.iconMemberCount } />
              <h4>{ channel.userCount }</h4>
            </div>
          </button>
        </li>
      )
    });
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="session-form"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={true}
        transitionEnterTimeout={500}
        transitionLeave={true}
        transitionLeaveTimeout={500}>

        <section className='channels-view-container'>
          <h1>Browse all channels</h1>

          <form className='channels-view-search-form'>
            <input className='channels-view-search-input'
                   placeholder='Search channels' type='text' />
          </form>

          <ul className='channels-view-list'>
            { this.buildChannelItems() }
          </ul>
        </section>

      </ReactCSSTransitionGroup>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // channels: state.allChannels
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchPublicChannels: () => dispatch(fetchPublicChannels())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChannelsView));
