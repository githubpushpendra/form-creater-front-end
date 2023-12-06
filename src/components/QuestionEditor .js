import React, { useState } from 'react';

const QuestionEditor = ({ onAddQuestion }) => {
  const [questionText, setQuestionText] = useState('');

  const addQuestion = () => {
    if (questionText.trim() !== '') {
      onAddQuestion({ text: questionText });
      setQuestionText('');
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="questionText" className="form-label">
        Question Text:
      </label>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          id="questionText"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <button type="button" className="btn btn-success" onClick={addQuestion}>
          Add Question
        </button>
      </div>
    </div>
  );
};

export default QuestionEditor;
