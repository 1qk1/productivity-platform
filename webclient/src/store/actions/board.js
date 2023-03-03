import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { toast } from "react-toastify";
import { validateBoards } from "../../shared/utilities";
import { redirect } from 'react-router-dom'

export const addList = boardId => {
  return dispatch => {
    axios
      .post("/boards/list", { boardId })
      .then(res => {
        dispatch({ type: actionTypes.ADD_LIST, list: res.data.newList });
      })
      .catch(error => {
        toast.error(error.response.data.error.message);
      });
  };
};

export const moveCard = (boardId, cardId, toIndex, fromList, toList) => {
  return {
    queue: actionTypes.MOVE_CARD,
    callback: (next, dispatch, getState) => {
      dispatch({
        type: actionTypes.MOVE_CARD, boardId, cardId, toIndex, fromList, toList
      });
      axios
        .put("/boards/card/moveCard", {
          boardId, cardId, toIndex, fromList, toList
        })
        .then(next)
        .catch(error => {
          dispatch({
            type: actionTypes.MOVE_CARD,
            boardId,
            cardId,
            toIndex,
            toList,
            fromList
          });
          toast.error(error.response.data.error.message);
        });
    }
  };
};

export const getBoard = (boardId, history) => {
  return dispatch => {
    axios
      .get(`/boards/${boardId}`)
      .then(res => {
        dispatch({ type: actionTypes.SET_BOARD, board: res.data.board });
      })
      .catch(error => {
        redirect("/boards");
        toast.error(error.response.data.error.message);
      });
  };
};

export const changeListTitle = (boardId, listId, newTitle) => {
  return dispatch => {
    if (!validateBoards(newTitle)) {
      return toast.error("List title can't be empty.");
    }
    axios
      .put("/boards/list", {
        // id of the board
        boardId,
        // id of the list
        listId,
        newTitle
      })
      .then(res => {
        dispatch({ type: actionTypes.UPDATE_LIST, list: res.data.updatedList });
      })
      .catch(error => {
        toast.error(error.response.data.error.message);
      });
  };
};

export const changeCardText = (listId, cardId, newText) => {
  return dispatch => {
    if (!validateBoards(newText)) {
      return toast.error("Card text can't be empty.");
    }
    axios
      .put("/boards/card", {
        cardId,
        text: newText
      })
      .then(res => {
        dispatch({
          type: actionTypes.CHANGE_CARD_TEXT,
          listId,
          cardId,
          updatedCard: res.data.updatedCard
        });
      })
      .catch(error => {
        toast.error(error.response.data.error.message);
      });
  };
};

export const changeCardDescription = (listId, cardId, newText) => {
  return dispatch => {
    axios
      .put("/boards/card", {
        cardId,
        description: newText
      })
      .then(res => {
        dispatch({
          type: actionTypes.CHANGE_CARD_DESCRIPTION,
          listId,
          cardId,
          updatedCard: res.data.updatedCard
        });
      })
      .catch(error => {
        toast.error(error.response.data.error.message);
      });
  };
};

export const addCard = (boardId, listId, text) => {
  return dispatch => {
    if (!validateBoards(text)) {
      return toast.error("Card text can't be empty.");
    }
    axios
      .post("/boards/card", { boardId, listId, text })
      .then(res => {
        const { newCard } = res.data;
        dispatch({ type: actionTypes.ADD_CARD, newCard, listId });
      })
      .catch(error => {
        toast.error(error.response.data.error.message);
      });
  };
};

export const deleteCard = (boardId, listId, cardId) => {
  return dispatch => {
    axios
      .delete(`/boards/card/${boardId}/${listId}/${cardId}`)
      .then(res => {
        dispatch({ type: actionTypes.DELETE_CARD, listId, cardId });
      })
      .catch(error => {
        toast.error(error.response.data.error.message);
      });
  };
};

export const deleteList = (listId, boardId) => {
  return dispatch => {
    axios
      .delete(`/boards/list/${boardId}/${listId}`)
      .then(() => {
        dispatch({ type: actionTypes.DELETE_LIST, listId });
      })
      .catch(error => {
        toast.error(error.response.data.error.message);
      });
  };
};

export const changeCardList = (boardId, fromList, toList, cardId) => {
  return dispatch => {
    axios
      .put("/boards/card/changeList", { boardId, fromList, toList, cardId })
      .then(() => {
        dispatch({
          type: actionTypes.CHANGE_LIST,
          boardId,
          fromList,
          toList,
          cardId
        });
      })
      .catch(error => toast.error(error.response.data.error.message));
  };
};
