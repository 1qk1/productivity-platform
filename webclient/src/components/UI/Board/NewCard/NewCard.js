import React from "react";
import "./NewCard.scss";

const newCard = props => {
  return (
    <div className="Card-New">
      <form onSubmit={props.onSubmitHandler}>
        <input
          autoFocus
          value={props.value}
          type="text"
          onChange={props.onChange}
        />
        <button type="submit" className="btn btn-small">
          Add
        </button>
      </form>
    </div>
  );
};

export default newCard;
