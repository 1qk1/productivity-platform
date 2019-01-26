import React, { Component } from "react";
import { connect } from "react-redux";
import extensionMap from "./extensionMap";
import * as actions from "../../store/actions/index";
import "./Store.scss";

class Store extends Component {
  extensionBlock = (extension, index) => {
    const userHasExtension = this.props.extensions.includes(extension);
    return (
      <div className="Store-Extension" key={`ext-${index}`}>
        <h6>{extension}</h6>
        {!userHasExtension ? (
          <button
            onClick={() => this.props.addExtension(extension)}
            className="btn-small"
          >
            Add
          </button>
        ) : (
          <button
            onClick={() => this.props.removeExtension(extension)}
            className="btn-small red"
          >
            Remove
          </button>
        )}
      </div>
    );
  };

  render() {
    const extensions = Object.keys(extensionMap);
    return (
      <div className="Store">
        {/* loop through the available extensions */}
        {/* and render an element for each of them */}
        {extensions.map(this.extensionBlock)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  extensions: state.auth.user.extensions
});

const mapDispatchToProps = dispatch => ({
  addExtension: extensionName => dispatch(actions.addExtension(extensionName)),
  removeExtension: extensionName =>
    dispatch(actions.removeExtension(extensionName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Store);
