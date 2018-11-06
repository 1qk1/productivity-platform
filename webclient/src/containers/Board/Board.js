import React, { Component, Fragment } from "react";
import List from "../../components/UI/Board/List/List";
import uuidv4 from "uuid/v4";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import "./Board.scss";

export const itemTypes = {
  CARD: "card"
};

class Board extends Component {
  state = {
    board: []
  };

  newCard = index => {
    if (this.state.board.length === 0) return;
    const newBoard = [...this.state.board];
    newBoard[index].push({ id: uuidv4(), text: "new card" });
    this.setState({ board: newBoard });
  };

  newList = () => {
    const newBoard = [...this.state.board, []];
    this.setState({ board: newBoard });
  };

  render() {
    return (
      <Fragment>
        <div className="Board scrollbar">
          {/* render list */}
          {this.state.board.map((list, index) => (
            <List
              addCard={this.newCard}
              key={`list-${Math.random()}`}
              list={list}
              index={index}
            />
          ))}
          <button className="btn btn-small Add-List-Btn" onClick={this.newList}>
            Add a List
          </button>
        </div>
      </Fragment>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
