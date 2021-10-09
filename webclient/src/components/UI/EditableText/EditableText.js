import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";
import TextareaAutosize from "react-textarea-autosize";

class EditableText extends Component {
  state = {
    editing: false,
    newText: this.props.text,
  };

  onChangeHandler = (event) => {
    this.setState({ newText: event.target.value });
  };

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
    if (this.props.text !== this.state.newText) {
      this.props.onSubmitHandler(this.state.newText);
    }
  };

  closeEditing = () => {
    this.setState({ editing: false });
    if (this.props.text !== this.state.newText) {
      this.props.onSubmitHandler(this.state.newText);
    }
  };

  handleClickOutside = () => {
    this.closeEditing();
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({ editing: false });
    if (this.props.text !== this.state.newText) {
      this.props.onSubmitHandler(this.state.newText);
    }
  };

  render() {
    let editingElement = (
      <input
        type="text"
        autoFocus
        value={this.state.newText}
        onChange={this.onChangeHandler}
        className={this.props.textClassesEditing || ""}
      />
    );
    if (this.state.editing && this.props.inputType === "textarea") {
      editingElement = (
        <TextareaAutosize
          value={this.state.newText}
          onChange={this.onChangeHandler}
          maxRows="50"
          minRows="2"
          autoFocus
          className={this.props.textClassesEditing || ""}
        />
      );
    }
    return this.state.editing ? (
      <form onSubmit={this.onSubmitHandler}>{editingElement}</form>
    ) : (
      <p
        onClick={this.toggleEditing}
        style={{ minWidth: "20%" }}
        className={this.props.textClasses}
      >
        {this.props.text}
      </p>
    );
  }
}

EditableText.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  textClasses: PropTypes.string,
  textClassesEditing: PropTypes.string,
  inputType: PropTypes.oneOf(["text", "textarea"]),
};

export default onClickOutside(EditableText);
