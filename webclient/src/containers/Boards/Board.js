import React, { PureComponent, Fragment } from "react";
import List from "../../components/UI/Board/List/List";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Loader from "../../components/UI/Loader/Loader";
import { withRouter } from "react-router-dom";

import "./Board.scss";

export const itemTypes = {
  CARD: "card"
};

class Board extends PureComponent {
  componentDidMount() {
    this.props.getBoard(this.props.match.params.boardId, this.props.history);
  }

  render() {
    if (
      this.props.board.lists === null ||
      this.props.board._id !== this.props.match.params.boardId
    ) {
      return <Loader />;
    }
    return (
      <Fragment>
        <div className="Board scrollbar-horizontal">
          {/* render board */}
          {this.props.board.lists.map((list, index) => (
            <List
              changeCardText={this.props.changeCardText}
              changeListTitle={this.props.changeListTitle}
              changeCardList={this.props.changeCardList}
              addCard={this.props.addCard}
              deleteCard={this.props.deleteCard}
              deleteList={() =>
                this.props.deleteList(list._id, this.props.board._id)
              }
              moveCard={this.props.moveCard}
              dropCard={this.props.dropCard}
              key={"list-" + list._id}
              list={list}
              index={index}
              boardId={this.props.board._id}
            />
          ))}
          <button
            className="btn btn-small Add-List-Btn"
            onClick={() => this.props.addList(this.props.board._id)}
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
  addCard: (boardId, listId, text) =>
    dispatch(actions.addCard(boardId, listId, text)),
  deleteCard: (boardId, listId, cardId) =>
    dispatch(actions.deleteCard(boardId, listId, cardId)),
  deleteList: (listId, boardId) =>
    dispatch(actions.deleteList(listId, boardId)),
  addList: boardId => dispatch(actions.addList(boardId)),
  moveCard: (dragIndex, hoverIndex, dragListIndex, hoverListIndex) =>
    dispatch(
      actions.moveCard(dragIndex, hoverIndex, dragListIndex, hoverListIndex)
    ),
  dropCard: (boardId, cardId, index, listId, newListId) =>
    dispatch(actions.dropCard(boardId, cardId, index, listId, newListId)),
  changeListTitle: (boardId, listId, newTitle) =>
    dispatch(actions.changeListTitle(boardId, listId, newTitle)),
  changeCardText: (listId, cardId, text) =>
    dispatch(actions.changeCardText(listId, cardId, text)),
  changeCardList: (prevList, listToMoveTo, cardId) =>
    dispatch(actions.changeCardList(prevList, listToMoveTo, cardId)),
  getBoard: (board, history) => dispatch(actions.getBoard(board, history))
});

export default DragDropContext(HTML5Backend)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Board)
  )
);
