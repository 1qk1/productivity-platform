import React, { PureComponent, lazy } from "react";
import List from "../../components/UI/Board/List/List";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Loader from "../../components/UI/Loader/Loader";
import withRouter from '../../shared/withRouter'
import { DragDropContext } from "react-beautiful-dnd";

import CardModal from "../../components/UI/Board/CardModal/CardModal";

import "./Board.scss";

export const itemTypes = {
  CARD: "card"
};

class Board extends PureComponent {
  componentDidMount() {
    if (!this.props.board._id || this.props.board._id !== this.props.params.boardId) {
      this.props.getBoard(this.props.params.boardId, this.props.history);
    }
  }

  onDragEnd = (result) => {
    // boardId, cardId, toIndex, fromList, toList
    this.props.moveCard(this.props.board._id, result.draggableId, result.destination.index, result.source.droppableId, result.destination.droppableId);
  }

  render() {
    if (
      this.props.board.lists === null ||
      this.props.board._id !== this.props.params.boardId
    ) {
      return <Loader />;
    }
    document.title = this.props.board.title + " | Productivity Platform";
    const hasCard = this.props.params.cardId !== undefined
    return (
      <DragDropContext
        // onDragStart={ }
        // onDragUpdate={ }
        onDragEnd={this.onDragEnd}>
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
              key={"list-" + list._id}
              list={list}
              index={index}
              boardId={this.props.board._id}
            />
          ))}
          <button
            className="btn btn-green Add-List-Btn"
            onClick={() => this.props.addList(this.props.board._id)}
          >
            Add a List
          </button>
        </div>
        {hasCard ? (
          <CardModal
            show={hasCard}
            close={() => this.props.navigate(`/boards/${this.props.params.boardId}`)}
            cardId={this.props.params.cardId}
            changeTitle={this.props.changeCardText}
            changeDescription={this.props.changeCardDescription}
          />
        ) : null}
      </DragDropContext>
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
  moveCard: (boardId, cardId, toIndex, fromList, toList) =>
    dispatch(
      actions.moveCard(boardId, cardId, toIndex, fromList, toList)
    ),
  changeListTitle: (boardId, listId, newTitle) =>
    dispatch(actions.changeListTitle(boardId, listId, newTitle)),
  changeCardText: (listId, cardId, text) =>
    dispatch(actions.changeCardText(listId, cardId, text)),
  changeCardDescription: (listId, cardId, description) =>
    dispatch(actions.changeCardDescription(listId, cardId, description)),
  changeCardList: (prevList, listToMoveTo, cardId) =>
    dispatch(actions.changeCardList(prevList, listToMoveTo, cardId)),
  getBoard: (board, history) => dispatch(actions.getBoard(board, history))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));
