import React, { PureComponent, Fragment } from "react";
import List from "../../components/UI/Board/List/List";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

import "./Board.scss";

export const itemTypes = {
  CARD: "card"
};

class Board extends PureComponent {
  changeListTitleHandler = (newTitle, index) => {
    console.log(newTitle);
  };
  render() {
    return (
      <Fragment>
        <div className="Board scrollbar">
          {/* render list */}
          {this.props.board.lists.map((list, index) => (
            <List
              changeListTitle={this.props.changeListTitle}
              changeListTitleHandler={this.changeListTitleHandler}
              newCardHandler={this.props.addCard}
              toggleAdding={this.props.toggleAdding}
              changeList={this.props.changeList}
              addCard={this.props.addCard}
              key={`list-${Math.random()}`}
              list={list}
              index={index}
            />
          ))}
          <button
            className="btn btn-small Add-List-Btn"
            onClick={this.props.addList}
          >
            Add a List
          </button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board.board
});
const mapDispatchToProps = dispatch => ({
  toggleAdding: listId => dispatch({ type: actionTypes.TOGGLE_ADDING, listId }),
  addCard: (listId, text) =>
    dispatch({ type: actionTypes.ADD_CARD, listId, text }),
  addList: () => dispatch({ type: actionTypes.ADD_LIST }),
  changeListTitle: (listIndex, newTitle) =>
    dispatch({ type: actionTypes.CHANGE_LIST_TITLE, listIndex, newTitle }),
  changeList: (prevList, listToMoveTo, cardId) =>
    dispatch({ type: actionTypes.CHANGE_LIST, prevList, listToMoveTo, cardId })
});

export default DragDropContext(HTML5Backend)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Board)
);
