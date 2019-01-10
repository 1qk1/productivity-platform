import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";

import "./Dropdown.scss";

class Dropdown extends Component {
  state = {
    show: false,
    buttonCoords: {
      x: 0,
      y: 0
    }
  };

  toggleHandler = event => {
    const { x, y, height } = event.currentTarget.getBoundingClientRect();
    this.setState(() => ({
      show: !this.state.show,
      buttonCoords: {
        x,
        y: y + height + 4
      }
    }));
  };

  closeHandler = () => {
    this.setState(() => ({ show: false }));
  };

  handleClickOutside = () => {
    this.closeHandler();
  };

  render() {
    return (
      <div
        className={
          "Dropdown" +
          (this.props.dropdownClasses ? ` ${this.props.dropdownClasses}` : "")
        }
        style={this.state.show ? { opacity: 1 } : null}
      >
        <button
          onClick={this.toggleHandler}
          className={"Dropdown--Button " + (this.props.buttonClasses || "")}
        >
          {this.props.title}
          {this.props.iconClasses ? (
            <i className={this.props.iconClasses} />
          ) : null}
        </button>
        {this.state.show ? (
          <div
            className="Dropdown-Body"
            onClick={this.closeHandler}
            style={{
              left: this.state.buttonCoords.x,
              top: this.state.buttonCoords.y
            }}
          >
            {this.props.children}
          </div>
        ) : null}
      </div>
    );
  }
}

Dropdown.PropTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  iconClasses: PropTypes.string,
  dropdownClasses: PropTypes.string,
  buttonClasses: PropTypes.string
};

export default onClickOutside(Dropdown);
