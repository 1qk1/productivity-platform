import React, { Component } from "react";
import { connect } from "react-redux";
import ExtensionCard from "../../components/UI/Store/ExtensionCard/ExtensionCard";
import extensionMap from "../../shared/extensionMap";
import * as actions from "../../store/actions/index";
import "./Store.scss";

class Store extends Component {
  render() {
    const extensions = Object.keys(extensionMap);
    return (
      <div className="Store">
        {/* loop through the available extensions */}
        {/* and render an element for each of them */}
        {extensions.map(extension => (
          <ExtensionCard
            extension={extension}
            userHasExtension={this.props.extensions.includes(extension)}
            key={`extension-${extension}`}
            addExtension={this.props.addExtension}
            removeExtension={this.props.removeExtension}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  extensions: state.user.user.extensions
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
