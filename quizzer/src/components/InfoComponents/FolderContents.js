import React, { useState } from "react";
import axios from "axios";
import QuizContents from "./QuizContents";

const FolderContents = props => {
  const [showContactInfo, setShowContactInfo] = useState(false);

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
              <QuizContents quiz={quiz} />
            ) : null
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FolderContents;
