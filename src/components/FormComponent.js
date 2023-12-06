import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FormComponent = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Fetch form data based on formId
    fetch(`http://localhost:8080/api/forms/${formId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Form Data:', data);
        setFormData(data);
      })
      .catch((error) => console.error('Error fetching form data:', error));
  }, [formId]);

  const handleInputChange = (questionId, answer) => {
    setResponses({ ...responses, [questionId]: answer });
  };

  const handleSubmit = () => {
    // Prepare and send responses to the API
    const apiResponses = Object.entries(responses).map(([questionId, answer]) => ({
      answer,
      question: { id: parseInt(questionId, 10) },
    }));

    console.log('API Responses:', apiResponses);

    fetch('http://localhost:8080/api/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiResponses),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Responses saved successfully:', data);
        // Optionally, you can redirect or perform other actions after successful submission.
      })
      .catch((error) => console.error('Error saving responses:', error));
  };

  return (
    <div className="container mt-5">
      {formData && (
        <form>
          <h1 className="mb-4">{formData.title}</h1>
          {formData.questions.map((question) => (
            <div key={question.id} className="mb-3">
              <label htmlFor={`question-${question.id}`} className="form-label">
                {question.text}
              </label>
              <input
                type="text"
                id={`question-${question.id}`}
                className="form-control"
                onChange={(e) => handleInputChange(question.id, e.target.value)}
              />
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FormComponent;
