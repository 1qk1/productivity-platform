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
        toast.error(error.response.data.error.message);
      });
  };
};

export const moveCard = (
  dragIndex,
  hoverIndex,
  dragListIndex,
  hoverListIndex
) => {
  return dispatch => {
    dispatch({
      type: actionTypes.MOVE_CARD,
      dragIndex,
      hoverIndex,
      dragListIndex,
      hoverListIndex
    });
  };
};

export const dropCard = (cardId, toIndex, fromList, toList) => {
  return {
    queue: actionTypes.MOVE_CARD,
    callback: (next, dispatch, getState) => {
      axios
        .put("/board/card/moveCard", {
          fromList,
          toList,
          cardId,
          toIndex
        })
        .then(() => {
          next();
        })
        .catch(error => {
          dispatch({
            type: actionTypes.DROP_FAIL,
            cardId,
            toIndex,
            fromList,
            toList
          });
          toast.error(error.response.data.error.message);
        });
    }
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
        toast.error(error.response.data.error.message);
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
        toast.error(error.response.data.error.message);
      });
  };
};

export const changeCardText = (listId, cardId, newText) => {
  return dispatch => {
    axios
      .put("/board/card", {
        id: cardId,
        edit: { text: newText }
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

export const addCard = (listId, text) => {
  return dispatch => {
    axios
      .post("/board/card", { listId, text })
      .then(res => {
        const { newCard } = res.data;
        dispatch({ type: actionTypes.ADD_CARD, newCard });
      })
      .catch(error => {
        toast.error(error.response.data.error.message);
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
        toast.error(error.response.data.error.message);
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
        toast.error(error.response.data.error.message);
      });
  };
};

export const changeCardList = (fromList, toList, cardId) => {
  return dispatch => {
    axios
      .put("/board/card/changeList", { fromList, toList, cardId })
      .then(() => {
        dispatch({ type: actionTypes.CHANGE_LIST, fromList, toList, cardId });
      })
      .catch(error => toast.error(error.response.data.error.message));
  };
};
