import React, { Component } from "react";
import { connect } from "react-redux";
import SettingsComponent from "../../components/UI/Settings/Settings";

class Settings extends Component {
  render() {
    document.title = "Settings | Productivity Platform";
    return <SettingsComponent
      extensions={this.props.extensions}
      user={this.props.user}
    />
  }
}

const mapStateToProps = state => ({
  extensions: state.user.user.extensions,
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
