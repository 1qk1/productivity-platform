import React, { PureComponent, Fragment } from "react";
import List from "../../components/UI/Board/List/List";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Loader from "../../components/UI/Loader/Loader";

import "./Board.scss";

export const itemTypes = {
  CARD: "card"
};

class Board extends PureComponent {
  componentDidMount() {
    this.props.getLists();
  }

  render() {
    if (this.props.board.lists === null) {
      return <Loader />;
    }
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
              deleteCard={this.props.deleteCard}
              deleteList={this.props.deleteList}
              key={"list-" + list._id}
              list={list}
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
  deleteCard: (listId, cardId) => dispatch(actions.deleteCard(listId, cardId)),
  deleteList: listId => dispatch(actions.deleteList(listId)),
  addList: () => dispatch(actions.addList()),
  changeListTitle: (listId, newTitle) =>
    dispatch(actions.changeListTitle(listId, newTitle)),
  changeCardText: (listIndex, cardId, text) =>
    dispatch(actions.changeCardText(listIndex, cardId, text)),
  changeCardList: (prevList, listToMoveTo, cardId) =>
    dispatch(actions.changeCardList(prevList, listToMoveTo, cardId)),
  getLists: () => dispatch(actions.getLists())
});

export default DragDropContext(HTML5Backend)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Board)
);
