import React from "react";
import extensionMap from "../../../../containers/Store/extensionMap";

const extensionCard = props => {
  return (
    <div className="card blue-grey darken-1 Store-Extension">
      <div className="card-content white-text">
        <span className="card-title">
          {extensionMap[props.extension].title}
        </span>
        <p>{extensionMap[props.extension].description}</p>
      </div>
      <div className="card-action">
        {!props.userHasExtension ? (
          <button
            onClick={() => props.addExtension(props.extension)}
            className="btn btn-small"
          >
            Add
          </button>
        ) : (
          <button
            onClick={() => props.removeExtension(props.extension)}
            className="btn btn-small red"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default extensionCard;
