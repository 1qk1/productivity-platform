import React from "react";
import { DragSource } from "react-dnd";
import "./Card.scss";
import EditableText from "../../EditableText/EditableText";
import Dropdown from "../../Dropdown/Dropdown";

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
  return props.connectDragSource(
    <div className={`Card ${props.isDragging ? "Dragging" : ""}`}>
      <EditableText
        textClasses="Card-Text"
        onSubmitHandler={text =>
          props.changeCardText(props.inList, props.id, text)
        }
        text={props.text}
      />
      <Dropdown
        classes="Card-Controls Board-Controls"
        buttonClasses="btn-invisible Card-Controls--Button"
        iconClasses="fas fa-ellipsis-h"
      >
        <ul className="Card-Controls--Menu">
          <li className="Board-Controls--Item">
            <button
              className="Board-Controls--Action btn-invisible"
              onClick={() => props.deleteCard(props.listId, props._id)}
            >
              Delete Card
            </button>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
};

export default DragSource("CARD", cardSource, collect)(card);
