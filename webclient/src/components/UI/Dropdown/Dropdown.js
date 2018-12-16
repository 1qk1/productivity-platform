import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

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
          "Dropdown" + (this.props.classes ? ` ${this.props.classes}` : "")
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

// props will finally be
// button title
// button classes
// icon classes (add an i tag with those classes if they are inputted)
// children

export default onClickOutside(Dropdown);
