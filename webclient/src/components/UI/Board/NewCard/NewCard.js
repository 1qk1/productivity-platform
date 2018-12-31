import React from "react";
import "./NewCard.scss";
import onClickOutside from "react-onclickoutside";

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

export default onClickOutside(newCard);
