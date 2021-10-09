import React, { Component } from "react";
import Switch from "react-switch";
import { GithubPicker } from "react-color";
import "./NewBoard.scss";

class NewBoard extends Component {
  state = {
    boardTitle: "",
    boardPrivate: true,
    boardColor: null
  };

  onSubmit = e => {
    e.preventDefault();
    // send data to redux action which will come from a property
    this.props.newBoard(this.state);
    this.props.closeModal();
  };

  render() {
    return (
      <form className="NewBoard--Modal" onSubmit={this.onSubmit}>
        <div>
          <div className="NewBoard--Title">
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
            colors={[
              "#E04E8D",
              "#ff8080",
              "#C4766D",
              "#E2D84D",
              "#27ae60",
              "#33AAA8",
              "#537ec5",
              "#AA70E0",
              "#63707e"
            ]}
          />
        </div>
        <div className="NewBoard--Privacy">
          <p>Private:</p>
          <Switch
            onChange={value => this.setState({ boardPrivate: value })}
            checked={this.state.boardPrivate}
          />
        </div>
        <div style={{ textAlign: "right" }}>
          <button type="submit" className="btn btn-green">
            New Board
          </button>
        </div>
      </form>
    );
  }
}

export default NewBoard;
