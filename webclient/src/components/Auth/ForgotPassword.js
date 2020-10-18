import React, { useState } from "react";
// import PropTypes from "prop-types";
import InputWithErrors from "../UI/InputWithErrors/InputWithErrors";
import { validate } from "../../shared/utilities";
import { cloneDeep } from "lodash";
import axios from "../../axios";
import { toast } from "react-toastify";

import "./Auth.scss";
import "./PasswordForms.scss";

const ForgotPassword = (props) => {
  const [inputData, setInputData] = useState({
    value: "",
    errors: [],
    valid: false,
    touched: false,
    required: true,
    rules: {
      required: true,
      isEmail: true,
    },
  });
  const onChangeHandler = (e) => {
    const value = e.target.value;
    let newInputData = cloneDeep(inputData);
    newInputData.value = value;
    newInputData.touched = true;

    const validationErrors = validate(value, inputData.rules);
    newInputData = {
      ...newInputData,
      errors: validationErrors,
      valid: validationErrors.length === 0,
    };
    setInputData(newInputData);
  };
  const makeAuthRequest = (data) => {
    axios
      .post(`/auth/forgot-password`, data)
      .then((res) => {
        toast.success(
          "Success! You have been send an email to reset your password."
        );
      })
      .catch((error) => {
        if (error.response === undefined) return;
        const errors = error.response.data.error.message;
        const newInputData = cloneDeep(inputData);
        if (typeof errors === "string") {
          newInputData.error = errors;
          setInputData(newInputData);
        } else {
          newInputData.errors = [];
          errors.forEach((err) => newInputData.errors.push(err.msg));
          setInputData(newInputData);
        }
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!inputData.valid) return;
    const data = { email: inputData.value };
    makeAuthRequest(data);
  };

  return (
    <div className="Container ForgotForm AuthForm">
      <div>
        <h5>Enter your email to reset your password</h5>
        <h6>Am email will be sent to you to the email specified.</h6>
        <form id="forgot" onSubmit={submitHandler}>
          <InputWithErrors
            label="Email"
            data={inputData}
            onChange={onChangeHandler}
            type="email"
            name="email"
            formId="forgot"
          />
          <div className="text-center">
            <button className="btn btn-green" type="submit" name="action">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// forgot.propTypes = {
//   submitHandler: PropTypes.func.isRequired,
//   onChangeHandler: PropTypes.func.isRequired,
//   fieldData: PropTypes.object.isRequired,
// };

export default ForgotPassword;
