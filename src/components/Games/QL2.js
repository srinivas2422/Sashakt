import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./GL1.css";
import { Link } from 'react-router-dom';

const questions = [
  {
    id: 1,
    text: 'What did learn from the image?',
    options: ['To provide optional education','Child labour is not allowed', 'To boost early work experience', 'To develop a sense of responsibility'],
    correctAnswer: 'Child labour is not allowed',
  },
  {
    id: 2,
    text: ' How can society best uphold the right to protect children from hazardous employment below the age of 14?',
    options: ['By organizing regular playdates for children in hazardous workplaces', 'By implementing strict regulations on child labor', 'By introducing hazardous chores as character-building activities', ' By hosting annual "Safety Fairs" for young workers'],
    correctAnswer: 'By implementing strict regulations on child labor',
  },
];

const Quiz1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    // Trigger the HTTP request when showScore becomes true and all questions are correct
    if (showScore && score === questions.length) {
      (async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/quiz/save",
            {
              level: 2,
              isCompleted: true,
            },{headers: {
              'auth-token': authToken,
              'Content-Type': 'application/json', 
            }}
          );

          console.log(response.data.message);
        } catch (error) {
          console.error(
            "Error saving quiz progress:",
            error.response?.data || error.message
          );
        }
      })();
    }
  }, [showScore, score]);

  const handleAnswerClick = async (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const isAllCorrect = score === questions.length;

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          {isAllCorrect ? (
            <div className='lev'>
              <h2>Congratulations!</h2>
              <p>You answered all questions correctly.</p>
              <Link class="btn btn-primary" to="/game/level3" role="button">Play Next Level</Link>
            </div>
          ) : (
            <div>
              <h2>Your Score: {score} out of {questions.length}</h2>
              <p>Sorry, you didn't answer all questions correctly.</p>
              <button onClick={restartQuiz}>Reattempt Quiz</button>
            </div>
          )}
        </div>
      ) : (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>
          <h5>{questions[currentQuestion].text}</h5>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button className='quiz-btn' key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz1;
