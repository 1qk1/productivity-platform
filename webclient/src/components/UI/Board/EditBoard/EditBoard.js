import React, { Component } from "react";
import Switch from "react-switch";
import { GithubPicker } from "react-color";
import "./EditBoard.scss";
import colors from "../../../../shared/colors";

class EditBoard extends Component {
  state = {
    boardId: this.props.board._id,
    boardTitle: this.props.board.title,
    boardPrivate: this.props.board.private,
    boardColor: this.props.board.color
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.updateBoard(this.state);
    this.props.closeModal();
  };

  onDelete = () => {
    // this.props.closeModal();
    // wait for the modal to close before executing the delete function
    this.props.deleteBoard(this.state.boardId);
  };

  render() {
    return (
      <form className="EditBoard--Modal" onSubmit={this.onSubmit}>
        <div>
          <div className="EditBoard--Title">
            <p>Board title</p>
            <input
              value={this.state.boardTitle}
              onChange={e => this.setState({ boardTitle: e.target.value })}
              type="text"
            />
          </div>
        </div>
        <div>
          <p>
            Choose a color:{" "}
            <span style={{ color: this.state.color, fontWeight: "bold" }}>
              {this.state.color}
            </span>
          </p>
          <GithubPicker
            onChange={color => this.setState({ boardColor: color.hex })}
            width="238px"
            triangle="hide"
            colors={colors}
          />
        </div>
        <div className="EditBoard--Privacy">
          <p>Private:</p>
          <Switch
            onChange={value => this.setState({ boardPrivate: value })}
            checked={this.state.boardPrivate}
          />
        </div>
        <div className="EditBoard--Actions">
          <button className="btn btn-small red" onClick={this.onDelete}>
            Delete Board
          </button>
          <button type="submit" className="btn btn-small">
            Update Board
          </button>
        </div>
      </form>
    );
  }
}

export default EditBoard;
