import React from "react";
import { DragSource } from "react-dnd";
import "./Card.scss";

const cardSource = {
  beginDrag(props) {
    console.log(props, "cardsource props");
    return { id: props.id };
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const card = props => {
  console.log(props, "card props");
  return props.connectDragSource(
    <div className="Card">
      <p className="Card-Text">{props.text}</p>
    </div>
  );
};

export default DragSource("CARD", cardSource, collect)(card);
