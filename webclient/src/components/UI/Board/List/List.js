import React, { PureComponent } from "react";
import Card from "../Card/Card";
import { DropTarget } from "react-dnd";
import NewCard from "../NewCard/NewCard";
import EditableTitle from "./EditableTitle";

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

class List extends PureComponent {
  state = {
    adding: false,
    newCardText: "",
    editingTitle: false,
    newTitle: ""
  };

  toggleProp = prop => {
    this.setState(() => ({ [prop]: !this.state[prop] }));
  };

  onCardChangeHandler = e => {
    this.setState({ newCardText: e.target.value });
  };

  onSubmitCardHandler = event => {
    event.preventDefault();
    this.props.addCard(this.props.index, this.state.newCardText);
    this.setState({ adding: false, newCardText: "" });
  };

  onSubmitTitleHandler = event => {
    event.preventDefault();
    this.props.changeListTitleHandler(this.state.newTitle, this.props.index);
    this.props.changeListTitle(this.props.index, this.state.newTitle);
    this.setState({ editingTitle: false, newTitle: "" });
  };

  onChangeTitleHandler = event => {
    this.setState({ newTitle: event.target.value });
  };

  render() {
    return this.props.connectDropTarget(
      <div className="List scrollbar">
        <div className="List-Header">
          <EditableTitle
            editingTitle={this.state.editingTitle}
            title={this.props.list.title}
            newTitle={this.state.newTitle}
            toggleEditing={() => this.toggleProp("editingTitle")}
            onSubmitTitleHandler={this.onSubmitTitleHandler}
            onChangeTitleHandler={this.onChangeTitleHandler}
          />
          <button
            className="Add-Card-Button"
            onClick={() => this.toggleProp("adding")}
          >
            <i className="fas fa-plus" />
          </button>
        </div>
        <div className="List-Cards">
          {this.state.adding ? (
            <NewCard
              value={this.state.newCardText}
              onChange={this.onCardChangeHandler}
              onSubmitHandler={this.onSubmitCardHandler}
              listIndex={this.props.index}
            />
          ) : null}
          {this.props.list.cards.map(card => (
            <Card key={`card-${card.id}`} {...card} />
          ))}
          {this.props.isOver ? <div className="Card" /> : null}
        </div>
      </div>
    );
  }
}

export default DropTarget("CARD", listTarget, collect)(List);
