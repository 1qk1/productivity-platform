import * as actionTypes from "../actions/actionTypes";
import uuidv4 from "uuid/v4";

const initialState = {
  board: {
    settings: {
      adding: []
    },
    lists: []
  }
};

export default (state = initialState, action) => {
  let newBoard = { ...state.board };
  switch (action.type) {
    case actionTypes.ADD_LIST:
      newBoard.lists.push([]);
      return { board: newBoard };
    case actionTypes.ADD_CARD:
      newBoard.lists[action.listId].push({
        id: uuidv4(),
        text: "new card",
        inList: action.listId
      });
      return { board: newBoard };
    case actionTypes.CHANGE_LIST:
      const toSplice = newBoard.lists[action.prevList].findIndex(
        el => el.id === action.cardId
      );
      const todo = {
        ...newBoard.lists[action.prevList][toSplice],
        inList: action.listToMoveTo
      };
      newBoard.lists[action.prevList].splice(toSplice, 1);
      newBoard.lists[action.listToMoveTo].push(todo);
      return { board: newBoard };
    case actionTypes.TOGGLE_ADDING:
      const index = newBoard.settings.adding.indexOf(action.listId);
      if (index !== -1) {
        newBoard.settings.adding.splice(index, 1);
      } else {
        newBoard.settings.adding.push(action.listId);
      }
      return { board: newBoard };
    default:
      return state;
  }
};
