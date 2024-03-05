import React, { useState, useEffect } from 'react';
import "./GL1.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

const questions = [
  {
    id: 1,
    text: 'What did you learn from the previous child right?',
    options: ['Right to Candy','Right to Playtime', 'Right to Education', 'Right to Protection from Abuse and Exploitation'],
    correctAnswer: 'Right to Protection from Abuse and Exploitation',
  },
  {
    id: 2,
    text: 'Which legal framework is specifically designed to protect children from abuse and exploitation?',
    options: ['Protection of Children from Sexual Offences (POCSO) Act ', 'Child Welfare Act', 'Adult Rights Act', 'Workplace Safety Act'],
    correctAnswer: 'Protection of Children from Sexual Offences (POCSO) Act ',
  },
];

const Quiz2 = () => {

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
              level: 3,
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

  const handleAnswerClick = (selectedOption) => {
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
              <Link class="btn btn-primary" to="/game/level4" role="button">Play Next Level</Link>
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

export default Quiz2;
