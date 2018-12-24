import React from "react";
import { DragSource } from "react-dnd";
import "./Card.scss";
import EditableText from "../../EditableText/EditableText";
import Dropdown from "../../Dropdown/Dropdown";

const cardSource = {
  beginDrag(props) {
    // return the dragged card "description" upon start dragging
    // this data will go to the list's drop() dnd function
    return { fromList: props.listId, cardId: props._id };
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
        onSubmitHandler={newText =>
          props.changeCardText(props.listId, props._id.toString(), newText)
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
