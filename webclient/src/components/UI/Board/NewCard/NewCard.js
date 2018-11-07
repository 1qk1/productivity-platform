import React from "react";
import "./NewCard.scss";

const newCard = props => {
  return (
    <div className="Card-New">
      <form onSubmit={props.onSubmit}>
        <input type="text" name="" id="" />
        <button type="submit" className="btn btn-small">
          Add
        </button>
      </form>
    </div>
  );
};

export default newCard;
