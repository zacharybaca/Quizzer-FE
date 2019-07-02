import React, { useState } from "react";
import QuizContents from "./QuizContents";

const FolderContents = props => {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const { folder, quizzes } = props;

  return (
    <div key={folder.id}>
      <button onClick={() => setShowContactInfo(!showContactInfo)}>
        {folder.folder_name}
      </button>
      {showContactInfo ? (
        <div>
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
