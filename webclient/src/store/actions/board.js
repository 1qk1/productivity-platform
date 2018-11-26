import * as actionTypes from "./actionTypes";

export const addCard = (listId, text) => {
  return dispatch => {
    dispatch({ type: actionTypes.ADD_CARD, listId, text });
  };
};

export const addList = () => {
  return dispatch => {
    dispatch({ type: actionTypes.ADD_LIST });
  };
};

export const changeListTitle = (listIndex, newTitle) => {
  return dispatch => {
    dispatch({ type: actionTypes.CHANGE_LIST_TITLE, listIndex, newTitle });
  };
};

export const changeCardText = (listIndex, cardId, text) => {
  return dispatch => {
    dispatch({
      type: actionTypes.CHANGE_CARD_TEXT,
      listIndex,
      cardId,
      text
    });
  };
};

export const changeCardList = (prevList, listToMoveTo, cardId) => {
  return dispatch => {
    dispatch({ type: actionTypes.CHANGE_LIST, prevList, listToMoveTo, cardId });
  };
};
