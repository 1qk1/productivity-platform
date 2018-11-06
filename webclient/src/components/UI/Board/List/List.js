import React from "react";
import Card from "../Card/Card";
import { DropTarget } from "react-dnd";

import "./List.scss";

const listTarget = {
  drop(props, monitor) {
    console.log("drop", monitor);
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
          onClick={() => props.addCard(props.index)}
        >
          <i className="fas fa-plus" />
        </button>
      </div>

      <div className="List-Cards">
        {props.list.map(card => (
          <Card key={`card-${Math.random()}`} {...card} />
        ))}
      </div>
    </div>
  );
};

export default DropTarget("CARD", listTarget, collect)(list);
