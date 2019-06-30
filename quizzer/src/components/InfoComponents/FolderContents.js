import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const FolderContents = props => {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const onDeleteClick = async id => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/folder/removequiz/${id}`
    );

    console.log(res);
  };

  const deleteFolder = async id => {
    const res = await axios.delete(
      `${process.env.REACT_APP_BE_URL ||
        process.env.REACT_APP_BE_LOCAL}/api/folder/delete/${id}`
    );

    console.log(res);
  };

  const { folder, quizzes } = props;

  return (
    <div key={folder.id}>
      <button onClick={() => setShowContactInfo(!showContactInfo)}>
        {folder.folder_name}
      </button>
      {showContactInfo ? (
        <div>
          <p onClick={() => deleteFolder(folder.id)}>remove folder</p>
          {quizzes.map(quiz =>
            quiz.folder_name === folder.folder_name ? (
              <div>
                <i
                  className="fas fa-times"
                  style={{
                    cursor: "pointer",
                    float: "right",
                    color: "red"
                  }}
                  onClick={() => onDeleteClick(quiz.id)}
                />{" "}
                <p>{quiz.quiz_name}</p>
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FolderContents;
