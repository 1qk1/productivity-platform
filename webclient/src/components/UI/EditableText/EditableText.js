import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";

class EditableText extends Component {
  state = {
    editing: false,
    newText: ""
  };

  onChangeHandler = event => {
    this.setState({ newText: event.target.value });
  };

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  };

  closeEditing = () => {
    this.setState({ editing: false });
  };

  handleClickOutside = () => {
    this.closeEditing();
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.setState({ editing: false });
    this.props.onSubmitHandler(this.state.newText);
  };

  render() {
    return this.state.editing ? (
      <form onSubmit={this.onSubmitHandler}>
        <input
          type="text"
          autoFocus
          value={this.state.newText}
          onChange={this.onChangeHandler}
        />
      </form>
    ) : (
      <p onClick={this.toggleEditing} className={this.props.textClasses}>
        {this.props.text}
      </p>
    );
  }
}

EditableText.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  textClasses: PropTypes.string,
  inputType: PropTypes.oneOf(["text", "textarea"])
};

export default onClickOutside(EditableText);
