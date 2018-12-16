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
      .put("/board/list", {
        // id of the list
        id: listId,
        // fields to edit
        edit: { title: newTitle }
      })
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
    axios
      .post("/board/card", { listId, text })
      .then(res => {
        const { newCard } = res.data;
        dispatch({ type: actionTypes.ADD_CARD, newCard });
      })
      .catch(error => {
        toast.error("Unknown error when getting the lists");
      });
  };
};

export const deleteCard = (listId, cardId) => {
  return dispatch => {
    axios
      .delete(`/board/card/${listId}/${cardId}`)
      .then(res => {
        dispatch({ type: actionTypes.DELETE_CARD, listId, cardId });
      })
      .catch(error => {
        toast.error("Unknown error when deleting the card");
      });
  };
};

export const deleteList = listId => {
  return dispatch => {
    axios
      .delete(`/board/list/${listId}`)
      .then(res => {
        dispatch({ type: actionTypes.DELETE_LIST, listId });
      })
      .catch(error => {
        toast.error("Unknown error when deleting the list");
      });
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
