import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  render() {
    return (
      <section className='message-input-container'>
        <input type='text' placeholder='Message #westeros'></input>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MessageInput));
