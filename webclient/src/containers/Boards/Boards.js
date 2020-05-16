import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../axios";
import NewBoard from "../../components/UI/Board/NewBoard/NewBoard";
import "./Boards.scss";
import boardPreviewClasses from "../../components/UI/Board/BoardPreview/BoardPreview.module.scss";
import { toast } from "react-toastify";
import Modal from "../../components/UI/Modal/Modal";
import Loader from "../../components/UI/Loader/Loader";
import { validateBoards } from "../../shared/utilities";
import BoardPreview from "../../components/UI/Board/BoardPreview/BoardPreview";
import { cloneDeep } from "lodash";

class Boards extends Component {
  state = {
    boards: null,
    showNewBoard: false,
  };

  getBoards = () => {
    axios
      .get("/boards")
      .then((res) => {
        this.setState(() => ({ boards: res.data.boards }));
      })
      .catch((error) => {
        toast.error(error);
        this.props.history.push("/");
      });
  };

  updateBoard = ({ boardId, boardTitle, boardColor, boardPrivate }) => {
    axios
      .put(`/boards`, {
        boardId,
        boardTitle,
        boardColor,
        boardPrivate,
      })
      .then((res) => {
        const newBoards = cloneDeep(this.state.boards);
        // replace board with updated board
        const boardIndex = this.state.boards.findIndex(
          (board) => board._id === boardId
        );
        newBoards[boardIndex] = {
          ...newBoards[boardIndex],
          title: boardTitle,
          color: boardColor,
          private: boardPrivate,
        };
        this.setState({ boards: newBoards });
      });
  };

  deleteBoard = (boardId) => {
    // window.confirm("Are you sure you want to delete this board?");
    if (!window.confirm("Are you sure you want to delete this board?")) {
      return;
    }
    axios
      .delete(`/boards/${boardId}`)
      .then(() => {
        const newBoards = this.state.boards.reduce((all, curr) => {
          if (curr._id !== boardId) {
            return all.concat([curr]);
          }
          return all;
        }, []);
        this.setState(() => ({ boards: newBoards }));
      })
      .catch((error) => toast.error(error.response.data.error.message));
  };

  onSubmitNewBoard = (boardData) => {
    if (!validateBoards(boardData.boardTitle)) {
      return toast.error("Board Title must be at least 3 characters long.");
    }
    axios
      .post("/boards", boardData)
      .then((res) => {
        const newBoards = cloneDeep(this.state.boards);
        newBoards.unshift(res.data.newBoard);
        this.setState({ boards: newBoards });
      })
      .catch((error) => {
        toast.error(error.response.data.error.message);
      });
  };

  componentDidMount() {
    this.getBoards();
  }

  render() {
    if (this.state.boards === null) {
      return <Loader />;
    }

    document.title = "Boards | Productivity Platform";

    return (
      <div className="Container--Wide Boards scrollbar-horizontal">
        {/* render list */}
        <h5>Your boards</h5>
        <div className="Boards--Preview">
          {this.state.boards.map((board, index) => (
            <BoardPreview
              board={board}
              key={`board-${index}`}
              deleteBoard={this.deleteBoard}
              updateBoard={this.updateBoard}
            />
          ))}
          <button
            className={`${boardPreviewClasses["Board-Link"]} Board-Preview--Button`}
            onClick={() =>
              this.setState({ showNewBoard: !this.state.showNewBoard })
            }
          >
            <p>Create new board</p>
          </button>
          <Modal
            modalClasses="NewBoard--Modal"
            show={this.state.showNewBoard}
            close={() => this.setState({ showNewBoard: false })}
          >
            <NewBoard
              closeModal={() => this.setState({ showNewBoard: false })}
              newBoard={this.onSubmitNewBoard}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default withRouter(Boards);
