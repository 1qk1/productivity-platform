import * as actionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  board: {
    settings: {},
    lists: null
  }
};

export default (state = initialState, action) => {
  let newBoard = _.cloneDeep(state.board);
  switch (action.type) {
    case actionTypes.SET_LISTS:
      newBoard.lists = [...action.lists];
      return { ...state, board: newBoard };
    case actionTypes.ADD_LIST:
      newBoard.lists.push(action.list);
      return { ...state, board: newBoard };
    case actionTypes.UPDATE_LIST:
      newBoard.lists[action.list.index] = action.list;
      return { ...state, board: newBoard };
    case actionTypes.ADD_CARD: {
      const listIndex = newBoard.lists.findIndex(
        list => list._id === action.newCard.listId
      );
      newBoard.lists[listIndex].cards.push(action.newCard);
      return { ...state, board: newBoard };
    }
    case actionTypes.DELETE_CARD: {
      const listIndex = newBoard.lists.findIndex(
        list => list._id === action.listId
      );
      const cardIndex = newBoard.lists[listIndex].cards.findIndex(
        card => card._id === action.cardId
      );
      newBoard.lists[listIndex].cards.splice(cardIndex, 1);
      return { ...state, board: newBoard };
    }
    case actionTypes.DELETE_LIST:
      const listIndex = newBoard.lists.findIndex(
        list => list._id === action.listId
      );
      newBoard.lists.splice(listIndex, 1);
      return { ...state, board: newBoard };

    // uncompleted
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
