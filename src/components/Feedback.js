import React, { useState } from "react";
const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setSubmitted(true);
  };
  return (
    <>
      <div className="feedback-container">
      {submitted ? (
        <div className="thank-you-message">
          <h1>Thank You!</h1>
          <p> Your feedback has been submitted.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Feedback-Page</h1>
          <label htmlFor="Feedback">Please give your valuable Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            cols="50"
            value={feedback}
            onChange={handleFeedbackChange}
            required
          ></textarea>
          <br />
          <button  type="Submit">Submit-Feedback</button>
        </form>
      )}
      </div>
    </>
  );
};

export default Feedback;
