import React from "react";
import "./Card.scss";
import Dropdown from "../../Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

const Card = (props) => {

  return (
    <Draggable draggableId={props.card._id} index={props.index}>
      {(provided) => (
        <div className={`link-trans ${props.dragging ? "Dragging" : ""}`} id={`card${props.id}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className="Card" >
            <Link className="Card-Text py-1 pl-1" to={`/boards/${props.card.boardId}/${props.card._id}/`}>{props.card.text}</Link>
            <Dropdown
              dropdownClasses="Card-Controls Board-Controls"
              buttonClasses="btn-invisible Card-Controls--Button"
              iconClasses="fas fa-ellipsis-h"
            >
              <ul className="Card-Controls--Menu list-unstyled">
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
        </div>
      )}
    </Draggable>
  )
};

export default Card;
