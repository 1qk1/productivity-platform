import React from "react";
import { DragSource } from "react-dnd";
import "./Card.scss";
import EditableText from "../../EditableText/EditableText";

const cardSource = {
  beginDrag(props) {
    console.log(props, "cardsource props");
    return { id: props.id, inList: props.inList };
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const card = props => {
  console.log(props, "card props");
  return props.connectDragSource(
    <div className={`Card ${props.isDragging ? "Dragging" : ""}`}>
      <EditableText
        textClasses="Card-Text"
        onSubmitHandler={text =>
          props.changeCardText(props.inList, props.id, text)
        }
        text={props.text}
      />
    </div>
  );
};

export default DragSource("CARD", cardSource, collect)(card);
