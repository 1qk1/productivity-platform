import React from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import "./Card.scss";
import EditableText from "../../EditableText/EditableText";
import Dropdown from "../../Dropdown/Dropdown";

const cardSource = {
  beginDrag(props) {
    // return the dragged card "description" upon start dragging
    // this data will go to the list's drop() dnd function
    return {
      listId: props.card.listId,
      cardId: props.card._id,
      index: props.index,
      listIndex: props.listIndex,
      initialListIndex: props.listIndex,
      initialListId: props.card.listId,
      initialIndex: props.index,
      boardId: props.card.boardId,
    };
  },
  endDrag(props, monitor, component) {
    if (monitor.didDrop()) return;
    const {
      index,
      listIndex,
      initialListIndex,
      initialIndex,
      cardId,
      listId,
      initialListId,
      boardId,
    } = monitor.getItem();

    if (initialIndex === index && listIndex === initialListIndex) return;

    props.dropCard(boardId, cardId, index, initialListId, listId);
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    // this is all pretty much taken from the example on
    // react dnd's page with some minor changes
    if (!component) {
      return null;
    }
    const dragIndex = monitor.getItem().index;
    const listIndex = monitor.getItem().listIndex;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex, listIndex, listIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const card = (props) => {
  return props.connectDragSource(
    props.connectDropTarget(
      <div className={`Card ${props.dragging ? "Dragging" : ""}`}>
        <EditableText
          textClasses="Card-Text"
          textClassesEditing="Card-Text-Edit"
          onSubmitHandler={(newText) =>
            props.changeCardText(
              props.card.listId,
              props.card._id.toString(),
              newText
            )
          }
          text={props.card.text}
          inputType="textarea"
        />
        <Dropdown
          dropdownClasses="Card-Controls Board-Controls"
          buttonClasses="btn-invisible Card-Controls--Button"
          iconClasses="fas fa-ellipsis-h"
        >
          <ul className="Card-Controls--Menu">
            <li className="Board-Controls--Item">
              <button
                className="Board-Controls--Action btn-invisible"
                onClick={() =>
                  props.deleteCard(
                    props.card.boardId,
                    props.card.listId,
                    props.card._id
                  )
                }
              >
                Delete Card
              </button>
            </li>
          </ul>
        </Dropdown>
      </div>
    )
  );
};

export default DropTarget("CARD", cardTarget, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(DragSource("CARD", cardSource, collect)(card));
