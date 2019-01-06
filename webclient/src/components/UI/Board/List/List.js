import React, { PureComponent } from "react";
import Card from "../Card/Card";
import { DropTarget } from "react-dnd";
import NewCard from "../NewCard/NewCard";
import EditableText from "../../EditableText/EditableText";
import Dropdown from "../../Dropdown/Dropdown";

import "./List.scss";

const listTarget = {
  hover(props, monitor, component) {
    const item = monitor.getItem();

    const dragIndex = item.index;

    const dragListIndex = item.listIndex;
    const hoverListIndex = props.index;

    if (dragListIndex === hoverListIndex) return;

    props.moveCard(dragIndex, dragIndex, dragListIndex, hoverListIndex);

    monitor.getItem().listIndex = hoverListIndex;
    monitor.getItem().listId = props.list._id;
    monitor.getItem().index =
      props.list.cards.length < dragIndex ? props.list.cards.length : dragIndex;
  },
  drop(props, monitor, component) {
    const {
      index,
      listIndex,
      initialListIndex,
      initialIndex,
      cardId,
      listId,
      initialListId
    } = monitor.getItem();

    if (initialIndex === index && listIndex === initialListIndex) return;
    console.log("inside drop", cardId, index, initialListId, listId);

    // console.log(props, monitor.getItem());
    props.dropCard(cardId, index, initialListId, listId);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    draggingItem: monitor.getItem()
  };
}

class List extends PureComponent {
  state = {
    adding: false,
    newCardText: ""
  };

  toggleProp = prop => {
    this.setState({
      [prop]: !this.state[prop],
      newCardText: ""
    });
  };

  closeProp = prop => {
    this.setState({
      [prop]: false,
      newCardText: ""
    });
  };

  onCardChangeHandler = e => {
    console.log(e.target.value);
    this.setState({ newCardText: e.target.value });
  };

  onSubmitCardHandler = event => {
    event.preventDefault();
    this.props.addCard(this.props.list._id, this.state.newCardText);
    this.setState({ newCardText: "" });
  };

  onSubmitTitleHandler = text => {
    this.props.changeListTitle(this.props.list._id, text);
  };

  render() {
    return this.props.connectDropTarget(
      <div className="List">
        <div className="List-Header">
          <EditableText
            text={this.props.list.title}
            onSubmitHandler={this.onSubmitTitleHandler}
            textClasses="List-Title"
          />
          <Dropdown
            classes="List-Controls Board-Controls"
            buttonClasses="btn-invisible List-Controls--Button"
            iconClasses="fas fa-ellipsis-h"
          >
            <ul className="List-Controls--Menu">
              <li className="Board-Controls--Item">
                <button
                  className="Board-Controls--Action btn-invisible"
                  onClick={() => this.toggleProp("adding")}
                >
                  Add Card
                </button>
              </li>
              <li className="Board-Controls--Item">
                <button
                  className="Board-Controls--Action btn-invisible"
                  onClick={() => this.props.deleteList(this.props.list._id)}
                >
                  Delete List
                </button>
              </li>
            </ul>
          </Dropdown>
          {/*  */}
        </div>
        <div className="List-Cards scrollbar-vertical">
          {this.state.adding ? (
            <NewCard
              value={this.state.newCardText}
              onChange={this.onCardChangeHandler}
              onSubmitHandler={this.onSubmitCardHandler}
              listIndex={this.props.index}
              handleClickOutside={() => this.closeProp("adding")}
            />
          ) : null}
          {this.props.list.cards.map((card, i) => (
            <Card
              dragging={
                this.props.draggingItem !== null
                  ? this.props.draggingItem.cardId === card._id
                  : false
              }
              changeCardText={this.props.changeCardText}
              key={`card-${card._id}`}
              index={i}
              moveCard={this.props.moveCard}
              dropCard={this.props.dropCard}
              listIndex={this.props.index}
              deleteCard={this.props.deleteCard}
              {...card}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default DropTarget("CARD", listTarget, collect)(List);
