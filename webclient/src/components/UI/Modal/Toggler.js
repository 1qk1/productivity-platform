import React, { Component, Fragment } from "react";
import Modal from "./Modal";

class Toggler extends Component {
  state = {
    show: false
  };

  toggleHandler = () => {
    this.setState(() => ({ show: !this.state.show }));
  };

  render() {
    return (
      <Fragment>
        <button
          onClick={this.toggleHandler}
          className={this.props.buttonClasses || ""}
        >
          {this.props.title}
        </button>
        <Modal
          close={this.toggleHandler}
          backdropClasses={this.props.backdropClasses || ""}
          modalClasses={this.props.modalClasses || ""}
          show={this.state.show}
        >
          {this.props.children}
        </Modal>
      </Fragment>
    );
  }
}

export default Toggler;
