import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./Modal.scss";

const modal = props => {
  if (!Boolean(props.show)) return null;
  return (
    <Fragment>
      <div
        onClick={props.close}
        className={`Backdrop ${props.backdropClasses || ""}`}
      />
      <div className={`Modal ${props.modalClasses || ""}`}>
        {props.children}
      </div>
    </Fragment>
  );
};

modal.propTypes = {
  show: PropTypes.bool.isRequired,
  backdropClasses: PropTypes.string,
  modalClasses: PropTypes.string,
  close: PropTypes.func
};

export default modal;
