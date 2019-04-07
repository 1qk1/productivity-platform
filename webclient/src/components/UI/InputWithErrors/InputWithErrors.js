import React from "react";
import PropTypes from "prop-types";

const InputWithErrors = ({ data, label, onChange, type, name, formId }) => {
  return (
    <label>
      {label}
      <input
        className={data.errors.length !== 0 ? "Input-Invalid" : ""}
        value={data.value}
        onChange={onChange}
        type={type}
        name={name}
      />
      {data.errors.map((error, index) => (
        <p
          class="Error-Message Error-red"
          key={`${formId}-${name}-error-${index}`}
        >
          {error}
        </p>
      ))}
    </label>
  );
};

InputWithErrors.propTypes = {
  data: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired
};

export default InputWithErrors;
