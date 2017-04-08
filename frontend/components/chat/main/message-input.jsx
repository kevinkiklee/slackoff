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

    const msg = this.state.message;

    if (msg === '')
      return;

    // debugger

    if (msg.slice(0, 6) === '/giphy') {
      const query = msg.slice(7, msg.length).split(' ').join('+');;

      this.props.fetchGiphyUrl(query)
        .then((giphies) => {
          const idx = Math.floor(Math.random() * giphies.data.length);

          const message = {
            channel_id: this.props.channel.id,
            user_id: this.props.user.id,
            content: giphies.data[idx].images.original.url,
          };

          this.props.createMessage(message).then(
            () => (this.setState({ message: '' }))
          );
        });
    } else {
      const message = {
        channel_id: this.props.channel.id,
        user_id: this.props.user.id,
        content: msg,
      };

      this.props.createMessage(message).then(
        () => (this.setState({ message: '' }))
      );
    }
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
