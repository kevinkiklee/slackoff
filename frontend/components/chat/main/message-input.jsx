import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { createMessage } from '../../../actions/channel_actions';
import { fetchGiphyUrl } from '../../../actions/message_actions';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({ message: e.target.value });
  }

  submitMessage(e) {
    e.preventDefault();

    if (this.state.message === '')
      return;

    if (this.state.message.slice(0, 7) === '/giphy') {
      this.props.fetchGiphyUrl(this.buildGiphyQuery('a'))
        .then((giphy) => {
          debugger
        // debugger
        // console.log(giphy);
          const message = {
            channel_id: this.props.channel.id,
            user_id: this.props.user.id,
            content: this.state.message,
          };

          return (message) => this.props.createMessage(message).then(
            () => (this.setState({ message: '' }))
          );
        });
    } else {
      const message = {
        channel_id: this.props.channel.id,
        user_id: this.props.user.id,
        content: this.state.message,
      };

      this.props.createMessage(message).then(
        () => (this.setState({ message: '' }))
      );
    }
  }

  buildGiphyQuery(string) {
    return 'rick+and+morty'
  }

  render() {
    const channelName = this.props.channel.name;
    let placeholder = '';

    if (this.props.channel.private) {
      placeholder = `Send a direct message`;
    } else {
      placeholder = `Message #${channelName}`;
    }

    return (
      <section>
        <form className='message-input-container'
              onSubmit={ this.submitMessage }>
          <input type='text'
                 placeholder={ placeholder }
                 value={ this.state.message }
                 onChange={ this.handleInput }
                 />
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.session.currentUser,
  channel: state.channel,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createMessage: (message) => dispatch(createMessage(message)),
  fetchGiphyUrl: (query) => dispatch(fetchGiphyUrl(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MessageInput));
