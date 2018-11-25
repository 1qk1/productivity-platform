import React, { PureComponent, Fragment } from "react";
import List from "../../components/UI/Board/List/List";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import * as actions from "../../store/actions/index";

import "./Board.scss";

export const itemTypes = {
  CARD: "card"
};

class Board extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="Board scrollbar">
          {/* render list */}
          {this.props.board.lists.map((list, index) => (
            <List
              changeCardText={this.props.changeCardText}
              changeListTitle={this.props.changeListTitle}
              newCardHandler={this.props.addCard}
              changeCardList={this.props.changeCardList}
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
  addCard: (listId, text) => dispatch(actions.addCard(listId, text)),
  addList: () => dispatch(actions.addList()),
  changeListTitle: (listIndex, newTitle) =>
    dispatch(actions.changeListTitle(listIndex, newTitle)),
  changeCardText: (listIndex, cardId, text) =>
    dispatch(actions.changeCardText(listIndex, cardId, text)),
  changeCardList: (prevList, listToMoveTo, cardId) =>
    dispatch(actions.changeCardList(prevList, listToMoveTo, cardId))
});

export default DragDropContext(HTML5Backend)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Board)
);
