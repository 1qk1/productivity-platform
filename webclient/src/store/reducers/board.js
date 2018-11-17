import * as actionTypes from "../actions/actionTypes";
import uuidv4 from "uuid/v4";

const initialState = {
  board: {
    settings: {},
    lists: []
  }
};

export default (state = initialState, action) => {
  let newBoard = { ...state.board };
  switch (action.type) {
    case actionTypes.ADD_LIST:
      newBoard.lists.push({
        title: "New List",
        listIndex: state.board.lists.length,
        cards: []
      });
      return { ...state, board: newBoard };
    case actionTypes.ADD_CARD:
      newBoard.lists[action.listId].cards.push({
        id: uuidv4(),
        text: action.text,
        inList: action.listId
      });
      return { ...state, board: newBoard };
    case actionTypes.CHANGE_LIST_TITLE:
      newBoard.lists[action.listIndex].title = action.newTitle;
      return { ...state, board: newBoard };
    case actionTypes.CHANGE_CARD_TEXT:
      // inList, cardId, text
      const cardIndex = state.board.lists[action.listIndex].cards.findIndex(
        card => card.id === action.cardId
      );
      newBoard.lists[action.listIndex].cards[cardIndex].text = action.text;
      return { ...state, board: newBoard };
    case actionTypes.CHANGE_LIST:
      const indexToSplice = newBoard.lists[action.prevList].cards.findIndex(
        el => el.id === action.cardId
      );
      const todo = {
        ...newBoard.lists[action.prevList].cards[indexToSplice],
        inList: action.listToMoveTo
      };
      newBoard.lists[action.prevList].cards.splice(indexToSplice, 1);
      newBoard.lists[action.listToMoveTo].cards.push(todo);
      return { ...state, board: newBoard };
    default:
      return state;
  }
};
