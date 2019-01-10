import React from "react";
import "./NewCard.scss";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";

const newCard = props => {
  return (
    <div className="Card-New">
      <form onSubmit={props.onSubmitHandler}>
        <input
          autoFocus
          value={props.value}
          type="text"
          rows={2}
          className="New-Card-Input"
          onChange={props.onChange}
        />
        <button type="submit" className="btn btn-small">
          Add
        </button>
      </form>
    </div>
  );
};

newCard.PropTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleClickOutside: PropTypes.func
};

export default onClickOutside(newCard);
