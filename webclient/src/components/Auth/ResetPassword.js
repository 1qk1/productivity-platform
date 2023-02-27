import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import InputWithErrors from "../UI/InputWithErrors/InputWithErrors2";
import axios from "../../axios";
import { toast } from "react-toastify";
import { withRouter } from 'react-router-dom'
import Loader from './../UI/Loader/Loader';
import { useForm } from "react-hook-form";

import "./Auth.scss";
import "./PasswordForms.scss";

const ResetPassword = (props) => {
  const resetToken = props.match.params.resetToken
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  // check if reset token is valid
  // if it's not
  // display a message and redirect to the main page after 5 seconds
  const [resetTokenValid, setResetTokenValid] = useState(null)
  useEffect(() => {
    axios.get('/auth/reset-password/' + resetToken).then(res => {
      if (res.data.success === true) {
        setResetTokenValid(true)
      }
    }).catch(error => {
      toast.error(error.response.data.error.message)
      setResetTokenValid(false)
    })
  }, [resetToken])

  const onSubmit = (data) => {
    console.log('submit')
    axios
      .post(`/auth/reset-password/${resetToken}`, data)
      .then((res) => {
        toast.success(
          "Success! Your password has been changed. You will be redirected in 5 seconds.");
        redirectIn5()
      })
      .catch((error) => {
        const errorMessage = error.response.data.error.message
        setError('password', {
          type: "manual",
          message: errorMessage
        })
      });
  };
  const redirectIn5 = () => {
    console.log('redirect')
    setTimeout(() => {
      props.history.push('/')
    }, 5000);
  }

  let html = <Loader />

  if (resetTokenValid === true) {
    html = (
      <>
        <h5>Enter your new password</h5>
        <form id="forgot" onSubmit={handleSubmit(onSubmit)}>
          <InputWithErrors
            label="New Password"
            type="password"
            register={register("password", { required: true, minLength: { value: 5, message: "Password should be longer than 5 characters." } })}
            error={errors.password}

          />
          <InputWithErrors
            label="Confirm New Password"
            type="password"
            register={register("confirmPassword", { required: true, minLength: { value: 5, message: "Password should be longer than 5 characters." }, validate: (value) => value === watch('password') || "Passwords don't match." })}
            error={errors.confirmPassword}

          />
          <div className="text-center">
            <button className="btn btn-green" type="submit">
              Reset Password
            </button>
          </div>
        </form>
      </>
    )
  } else if (resetTokenValid === false) {
    html = (
      <>
        <h5>The reset token has expired or it doesn't exist.</h5>
        <h6>You will be redirected in 5 seconds.</h6>
      </>
    )
    redirectIn5()
  }

  return (
    <div className="Container ForgotForm AuthForm">
      <div>
        {html}
      </div>
    </div>
  );
};

// forgot.propTypes = {
//   submitHandler: PropTypes.func.isRequired,
//   onChangeHandler: PropTypes.func.isRequired,
//   fieldData: PropTypes.object.isRequired,
// };

export default withRouter(ResetPassword);
