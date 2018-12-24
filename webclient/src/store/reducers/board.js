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
    case actionTypes.UPDATE_LIST: {
      const listIndex = newBoard.lists.findIndex(
        list => list._id === action.list._id
      );
      newBoard.lists[listIndex] = {
        ...newBoard.lists[listIndex],
        ...action.list
      };
      return { ...state, board: newBoard };
    }
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

    case actionTypes.CHANGE_CARD_TEXT: {
      // find list index
      const listIndex = state.board.lists.findIndex(
        list => list._id.toString() === action.listId
      );
      // find card index
      const cardIndex = state.board.lists[listIndex].cards.findIndex(
        card => card._id.toString() === action.cardId
      );
      // replace card with the updated card
      newBoard.lists[listIndex].cards[cardIndex] = {
        ...action.updatedCard
      };
      return { ...state, board: newBoard };
    }
    case actionTypes.CHANGE_LIST: {
      // get the list indexes
      // this is used because we (I) can't (can't think of a way to)
      // modify arrays using just the fromList and toList ids
      const from = newBoard.lists.findIndex(
        list => list._id.toString() === action.fromList
      );
      const to = newBoard.lists.findIndex(
        list => list._id.toString() === action.toList
      );
      const cardIndex = newBoard.lists[from].cards.findIndex(
        card => card._id.toString() === action.cardId
      );
      // copy the card to insert it in the new list
      const card = { ...newBoard.lists[from].cards[cardIndex] };
      // change the listId of the card (probably unnecessary property, not sure)
      card.listId = action.toList;
      // remove the card from the old list
      newBoard.lists[from].cards.splice(cardIndex, 1);
      // add the card to the new list
      newBoard.lists[to].cards.push(card);
      // return new board
      return { ...state, board: newBoard };
    }
    default:
      return state;
  }
};
