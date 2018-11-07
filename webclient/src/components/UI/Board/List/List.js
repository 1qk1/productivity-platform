import React from "react";
import Card from "../Card/Card";
import { DropTarget } from "react-dnd";
import NewCard from "../NewCard/NewCard";

import "./List.scss";

const listTarget = {
  drop(props, monitor) {
    // props.moveCard();
    const id = monitor.getItem().id;
    const inList = monitor.getItem().inList;
    console.log(props);
    props.changeList(inList, props.index, id);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const list = props => {
  return props.connectDropTarget(
    <div className="List scrollbar">
      <div className="List-Header">
        <p className="List-Title">title</p>
        <button
          className="Add-Card-Button"
          onClick={() => props.toggleAdding(props.index)}
        >
          <i className="fas fa-plus" />
        </button>
      </div>
      <div className="List-Cards">
        {props.isAdding ? (
          <NewCard onSubmit={props.newCardHandler} listIndex={props.index} />
        ) : null}
        {props.list.map(card => (
          <Card key={`card-${card.id}`} {...card} />
        ))}
        {props.isOver ? <div className="Card" /> : null}
      </div>
    </div>
  );
};

export default DropTarget("CARD", listTarget, collect)(list);
