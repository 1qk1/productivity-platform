import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { toast } from "react-toastify";

export const addList = () => {
  return dispatch => {
    axios
      .post("/board/list")
      .then(res => {
        dispatch({ type: actionTypes.ADD_LIST, list: res.data.newList });
      })
      .catch(error => {
        toast.error("Unknown error when adding list");
      });
  };
};

export const getLists = () => {
  return dispatch => {
    axios
      .get("/board/list")
      .then(res => {
        dispatch({ type: actionTypes.SET_LISTS, lists: res.data.lists });
      })
      .catch(error => {
        toast.error("Unknown error when getting the lists");
      });
  };
};

export const changeListTitle = (listId, newTitle) => {
  return dispatch => {
    axios
      .put("/board/list", { id: listId, edit: { title: newTitle } })
      .then(res => {
        dispatch({ type: actionTypes.UPDATE_LIST, list: res.data.updatedList });
      })
      .catch(error => {
        toast.error("Unknown error when changing title");
      });
  };
};

export const addCard = (listId, text) => {
  return dispatch => {
    dispatch({ type: actionTypes.ADD_CARD, listId, text });
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
