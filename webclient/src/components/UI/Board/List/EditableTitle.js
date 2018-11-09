import React from "react";

const editableTitle = props =>
  props.editingTitle ? (
    <form onSubmit={props.onSubmitTitleHandler}>
      <input
        autoFocus
        onClick={props.toggleEditing}
        value={props.newTitle}
        onChange={props.onChangeTitleHandler}
      />
    </form>
  ) : (
    <p onClick={props.toggleEditing} className="List-Title">
      {props.title}
    </p>
  );

export default editableTitle;
