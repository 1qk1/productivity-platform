import React, { useState } from "react";
import Card from "../Card/Card";
import NewCard from "../NewCard/NewCard";
import EditableText from "../../EditableText/EditableText";
import Dropdown from "../../Dropdown/Dropdown";

import { Droppable } from "react-beautiful-dnd";

import "./List.scss";

const List = (props) => {
  const [adding, setAdding] = useState(false);
  const [newCardText, setNewCardText] = useState("");

  const toggleAdding = () => {
    setAdding(!adding)
    setNewCardText("")
  };

  const closeAdding = () => {
    setAdding(false)
    setNewCardText("")
  };

  const onCardChangeHandler = e => {
    setNewCardText(e.target.value)
  };

  const onSubmitCardHandler = event => {
    event.preventDefault();
    props.addCard(
      props.boardId,
      props.list._id,
      newCardText
    );
    setNewCardText("")
  };

  const onSubmitTitleHandler = text => {
    props.changeListTitle(props.boardId, props.list._id, text);
  };

  return (
    <Droppable droppableId={props.list._id}>
      {(provided) => (
        <div className="List" ref={provided.innerRef} {...provided.droppableProps}>
          <div className="List-Header">
            <EditableText
              text={props.list.title}
              onSubmitHandler={onSubmitTitleHandler}
              textClasses="List-Title"
            />
            <Dropdown
              dropdownClasses="List-Controls Board-Controls"
              buttonClasses="btn-invisible List-Controls--Button"
              iconClasses="fas fa-ellipsis-h"
            >
              <ul className="List-Controls--Menu list-unstyled">
                <li className="Board-Controls--Item">
                  <button
                    className="Board-Controls--Action btn-invisible"
                    onClick={toggleAdding}
                  >
                    Add Card
                  </button>
                </li>
                <li className="Board-Controls--Item">
                  <button
                    className="Board-Controls--Action btn-invisible"
                    onClick={props.deleteList}
                  >
                    Delete List
                  </button>
                </li>
              </ul>
            </Dropdown>
            {/*  */}
          </div>
          <div className="List-Cards scrollbar-vertical">
            {adding ? (
              <NewCard
                value={newCardText}
                onChange={onCardChangeHandler}
                onSubmitHandler={onSubmitCardHandler}
                handleClickOutside={closeAdding}
              />
            ) : null}
            {props.list.cards.map((card, i) => (
              <Card
                // dragging={
                //   props.draggingItem !== null
                //     ? props.draggingItem.cardId === card._id
                //     : false
                // }
                changeCardText={props.changeCardText}
                id={card._id}
                key={`card-${card._id}`}
                index={i}
                listIndex={props.index}
                deleteCard={props.deleteCard}
                card={{
                  ...card,
                  listId: props.list._id,
                  boardId: props.boardId
                }}
              />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default List;
