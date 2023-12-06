import React, { useState } from 'react';
import QuestionEditor from './QuestionEditor ';
import axios from 'axios';

const FormEditor = () => {
  const [formTitle, setFormTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [formLink, setFormLink] = useState("");
  const [formResLink, setFormResLink] = useState("");
  const [formInfo, setFormInfo] = useState("Questions");

  const addQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const saveForm = async () => {
    try {
      // Prepare data to send to the backend
      console.log('try entered');
      const formData = {
        title: formTitle,
        questions: questions.map((q) => ({ text: q.text })),
      };

      // Make a POST request to save the form
      const response = await axios.post('http://localhost:8080/api/forms/', formData);

      // Handle the response as needed
      console.log('Form saved successfully:', response.data);
      setFormLink(`http://localhost:3000/forms/${response.data}`);
      setFormResLink(`http://localhost:3000/forms/${response.data}/details`);
      setFormInfo("Links to access form and responses");
    } catch (error) {
      // Handle errors
      console.log('catch entered');
      console.error('Error saving form:', error.message);
    }
  };

  return (
    <div className="container mt-5 formedit">
      <h1 className="mb-4">Form Editor</h1>

      <div className="mb-3">
        <label htmlFor="formTitle" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          id="formTitle"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
      </div>

      <QuestionEditor onAddQuestion={addQuestion} />

      <div className="mt-4">
        <h2>{formInfo}</h2>
        {formInfo === "Questions" ?
        questions.map((question, index) => (
          <div key={index} className="mb-3">
            <p className="mb-1">{question.text}</p>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => removeQuestion(index)}
            >
              Remove
            </button>
          </div>
        ))
        : <div className="text-left mt-4">
            <div className="mb-3"> From Link: {formLink} </div>
            <div className="mb-3"> Form Responses Link: {formResLink} </div>
          </ div>
        }
      </div>

      <button className="btn btn-primary mt-4" onClick={saveForm}>
        Save Form
      </button>
    </div>
  );
};

export default FormEditor;
