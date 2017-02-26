import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

class ComponentTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }

  render() {
    return (
      <h1>ComponentTemplate</h1>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ComponentTemplate));
