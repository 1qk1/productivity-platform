import React, { useState } from "react";
import Classes from "./BoardPreview.module.scss";
import { Link } from "react-router-dom";
import ClampLines from "react-clamp-lines";
import Modal from "../../Modal/Modal";
import EditBoard from "../EditBoard/EditBoard";

const BoardPreview = props => {
  const [showEditBoard, setShowEditBoard] = useState(false);
  return (
    <div
      className={Classes["Board-Link"]}
      style={{ backgroundColor: props.board.color }}
    >
      <div className={Classes["Board-Edit"]}>
        <i
          className="fas fa-pencil-alt"
          onClick={() => setShowEditBoard(true)}
        />
      </div>
      <Link to={`/boards/${props.board._id}`}>
        <div className={Classes["Board-Preview"]}>
          <ClampLines
            text={props.board.title}
            ellipsis="..."
            lines={2}
            id="xdopoulos"
            className={Classes["Board-Preview__Title"]}
            innerElement="span"
            buttons={false}
          />
        </div>
      </Link>
      <Modal
        show={showEditBoard}
        close={() => setShowEditBoard(false)}
        wrapperClasses={Classes["Board-Link__Modal"]}
      >
        <EditBoard
          board={props.board}
          updateBoard={props.updateBoard}
          deleteBoard={props.deleteBoard}
          closeModal={() => setShowEditBoard(false)}
        />
      </Modal>
    </div>
  );
};
export default BoardPreview;
