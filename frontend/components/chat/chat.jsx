import { connect } from 'react-redux';
import React from 'react';
import { Link, withRouter } from 'react-router';

// import SessionControl from '../authentication/session_control';
import UserSection from './user/user-section';
import MainSection from './main/main-section';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='chat-container'>
        <UserSection />
        <MainSection />
        <section className='channel-section'>
          <section className='search-container'>
            <h4>Search</h4>
          </section>

          <section className='channel-container'>
            <section className='channel-name'>
              <h4>Channel Name</h4>
            </section>

            <section className='channel-details'>
              <div className='channel-description'>
                <h4>Description</h4>
              </div>
              <div className='channel-information'>
                <h4>Information</h4>
              </div>
            </section>

            <section className='channel-members'>
              <h4>Channel Members</h4>
                <ul>
                  <li>* member 1</li>
                  <li>* member 2</li>
                  <li>* member 3</li>
                  <li>* member 4</li>
                </ul>
            </section>
          </section>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Chat));
