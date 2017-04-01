import React from 'react';
import { connect } from 'react-redux';
import { Emoji } from 'emoji-mart';

class EmoticonItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='emoticonItemContainer'>
        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.session.currentUser,
  icon: ownProps.icon
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(
  mapStateToProps,
  null
)(EmoticonItem);
