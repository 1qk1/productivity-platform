import React from "react";
import Login from "./Login";
import Register from "./Register";
import Modal from "../UI/Modal/Modal";
import PropTypes from "prop-types";

const Auth = ({
  showForms,
  formData,
  submitHandler,
  onChangeHandler,
  toggleModal
}) => (
  <Modal show={showForms} modalClasses="AuthModal" close={toggleModal}>
    <div className="Modal-Container">
      <button onClick={toggleModal} className="btn-invisible Modal-Button">
        <i
          className="far fa-times-circle"
          style={{
            fontSize: "2rem",
            color: "#555"
          }}
        />
      </button>
      <Login
        submitHandler={submitHandler}
        onChangeHandler={onChangeHandler}
        fieldData={formData.login}
      />
      {formData.error ? (
        <p className="Error-Message Error-red">{formData.error}</p>
      ) : null}
      <Register
        submitHandler={submitHandler}
        onChangeHandler={onChangeHandler}
        fieldData={formData.register}
      />
    </div>
  </Modal>
);

Auth.propTypes = {
  showForms: PropTypes.bool.isRequired,
  formData: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Auth;
