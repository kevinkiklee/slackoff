import { connect } from 'react-redux';
import React from 'react';
import { Link, withRouter } from 'react-router';

import { fetchChannel } from '../../actions/channel_actions';
import { setChannel } from '../../actions/current_channel_actions';

import UserSection from './user/user-section';
import MainSection from './main/main-section';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchChannel(this.props.user.id, this.props.user.current_channel)
              .then(() => {
                // debugger
                const channel = {
                  id: this.props.channel.id,
                  name: this.props.channel.name,
                  description: this.props.channel.description
                };

                this.props.setChannel(channel);
              });
  }

  render() {
    return (
      <div className='chat-container'>
        <UserSection />
        <MainSection />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.session.currentUser,
           channel: state.channel };
};


const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchChannel: (userId, channelId) => dispatch(fetchChannel(userId, channelId)),
  setChannel: (channel) => dispatch(setChannel(channel))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Chat));



//
//
// <section className='channel-section'>
//   <section className='search-container'>
//     <h4>Search</h4>
//   </section>
//
//   <section className='channel-container'>
//     <section className='channel-name'>
//       <h4>Channel Name</h4>
//     </section>
//
//     <section className='channel-details'>
//       <div className='channel-description'>
//         <h4>Description</h4>
//       </div>
//       <div className='channel-information'>
//         <h4>Information</h4>
//       </div>
//     </section>
//
//     <section className='channel-members'>
//       <h4>Channel Members</h4>
//         <ul>
//           <li>* member 1</li>
//           <li>* member 2</li>
//           <li>* member 3</li>
//           <li>* member 4</li>
//         </ul>
//     </section>
//   </section>
// </section>
