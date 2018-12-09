import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

import "./Dropdown.scss";

class Dropdown extends Component {
  state = {
    show: false
  };

  toggleHandler = () => {
    this.setState(() => ({ show: !this.state.show }));
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
          className={this.props.buttonClasses || ""}
        >
          {this.props.title}
          {this.props.iconClasses ? (
            <i className={this.props.iconClasses} />
          ) : null}
        </button>
        {this.state.show ? (
          <div className="Dropdown-Body">{this.props.children}</div>
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
