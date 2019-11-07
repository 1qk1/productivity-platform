import React from "react";
import PropTypes from "prop-types";

import "./Modal.scss";

const Modal = props => {
  if (!Boolean(props.show)) return null;
  return (
    <div className={`Modal-Wrapper ${props.wrapperClasses || ""}`}>
      <div
        onClick={props.close}
        className={`Backdrop ${props.backdropClasses || ""}`}
      />
      <div className={`Modal ${props.modalClasses || ""}`}>
        {props.children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  show: PropTypes.bool.isRequired,
  backdropClasses: PropTypes.string,
  modalClasses: PropTypes.string,
  wrapperClasses: PropTypes.string,
  close: PropTypes.func
};

export default Modal;
