import React, { PureComponent } from "react";
import Card from "../Card/Card";
import { DropTarget } from "react-dnd";
import NewCard from "../NewCard/NewCard";
import EditableText from "../../EditableText/EditableText";

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
    newCardText: ""
  };

  toggleProp = prop => {
    this.setState({
      [prop]: !this.state[prop]
    });
  };

  closeProp = prop => {
    this.setState({
      [prop]: false
    });
  };

  onCardChangeHandler = e => {
    console.log(e.target.value);
    this.setState({ newCardText: e.target.value });
  };

  onSubmitCardHandler = event => {
    event.preventDefault();
    console.log(this.state.newCardText);
    this.props.addCard(this.props.index, this.state.newCardText);
    this.setState({ adding: false, newCardText: "" });
  };

  onSubmitTitleHandler = text => {
    this.props.changeListTitle(this.props.index, text);
  };

  render() {
    return this.props.connectDropTarget(
      <div className="List scrollbar">
        <div className="List-Header">
          <EditableText
            text={this.props.list.title}
            onSubmitHandler={this.onSubmitTitleHandler}
            textClasses="List-Title"
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
              handleClickOutside={() => this.closeProp("adding")}
            />
          ) : null}
          {this.props.list.cards.map(card => (
            <Card
              changeCardText={this.props.changeCardText}
              key={`card-${card.id}`}
              {...card}
            />
          ))}
          {this.props.isOver ? <div className="Card" /> : null}
        </div>
      </div>
    );
  }
}

export default DropTarget("CARD", listTarget, collect)(List);
