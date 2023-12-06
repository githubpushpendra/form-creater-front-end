import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const FormDetail = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Fetch form data based on formId
    axios
      .get(`http://localhost:8080/api/forms/${formId}`)
      .then((response) => {
        console.log(response.data);
        setFormData(response.data);
      })
      .catch((error) => console.error('Error fetching form data:', error));
  }, [formId]);

  useEffect(()=>{
    // Fetch responses for each question
    if (formData) {
      formData.questions.forEach((question) => {
        axios
          .get(`http://localhost:8080/api/responses/question/${question.id}`)
          .then((response) =>
            setResponses((prevResponses) => ({
              ...prevResponses,
              [question.id]: response.data,
            }))
          )
          .catch((error) =>
            console.error(`Error fetching responses for question ${question.id}:`, error)
          );
      });
    }
  }, [formData])

  return (
    <div className="container mt-5">
      {formData && (
        <div>
          <h1>{formData.title}</h1>
          <div className="row">
            {formData.questions.map((question) => (
              <div key={question.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <p className="h5 mb-3">{question.text}</p>
                    {responses[question.id] && (
                      <ul className="list-group">
                        {responses[question.id].map((response) => (
                          <li key={response.id} className="list-group-item">
                            {response.answer}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormDetail;
