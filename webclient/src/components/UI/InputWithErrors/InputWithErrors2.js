import React from "react";
import PropTypes from "prop-types";

const InputWithErrors = ({ label, type, name, register, error = {} }) => {
  return (
    <label>
      {label}
      <input
        className={error.message ? "Input-Invalid" : ""}
        type={type}
        name={name}
        {...register}
      />
      {
        error.message &&
        <p
          className="Error-Message Error-red"
        >
          {error.message}
        </p>
      }
    </label>

  );
};

InputWithErrors.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.object,
  ref: PropTypes.any
};

export default InputWithErrors;
