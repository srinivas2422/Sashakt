import React, { useState } from "react";
import './Mcq1.css';
const QuizComponent1 = () => {
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      text: "What the video is describing about?",
      options: [
        { id: 0, text: "Importance of playing ", isCorrect: false },
        { id: 1, text: "Importance of child-labour", isCorrect: false },
        { id: 2, text: "Importance of education", isCorrect: true },
        { id: 3, text: "None of the above", isCorrect: false },
      ],
    },
    {
      text: "What is the primary goal of early childhood education?",
      options: [
        { id: 0, text: "Teaching advanced subjects", isCorrect: false },
        { id: 1, text: "Preparing for college", isCorrect: false },
        { id: 2, text: "Social and emotional development", isCorrect: true },
        { id: 3, text: "Physical fitness training", isCorrect: false },
      ],
    },
    {
      text: "Which of the following is a crucial factor influencing a child's language development?",
      options: [
        { id: 0, text: "Socioeconomic status", isCorrect: true },
        { id: 1, text: "Families and communities", isCorrect: false },
        { id: 2, text: "Favorite color", isCorrect: false },
        { id: 3, text: "Society as a whole", isCorrect: false },
      ],
    },
    {
      text: " What is the importance of reading regularly for a child's education?",
      options: [
        { id: 0, text: "It increases the risk of academic failure.", isCorrect: false },
        { id: 1, text: "It helps improve vocabulary and language skills.", isCorrect: true },
        { id: 2, text: "It only benefits language arts classes.", isCorrect: false },
        { id: 3, text: "Government decision-making", isCorrect: false },
      ],
    },
    {
      text: "What is the primary goal of inclusive education?",
      options: [
        { id: 0, text: "Limiting their involvement in decision-making", isCorrect: false },
        { id: 1, text: "Excluding children from society", isCorrect: false },
        { id: 2, text: "Providing a diverse and supportive learning environment for all students", isCorrect: true },
        { id: 3, text: "Focusing only on gifted students", isCorrect: false },
      ],
    },

  ];

  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
  };

  const resetButton = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
  };

  return (
    <div className="edu">
      <div className="App">
        {/* Header */}
        <h1>Quiz App</h1>

        {/* Current score */}
        <h1>Current Score: {score}</h1>

        {showFinalResults ? (
          /* Final Results */
          <div className="result-card">
            <h1>Final Results</h1>
            <h2>
              {score} out of {questions.length} is Correct - (
              {(score / questions.length) * 100}%)
            </h2>
            <button onClick={() => resetButton()} className="btn btn-danger">
              Restart Game
            </button>
          </div>
        ) : (
          /* Question Card */
          <div className="question-card" >
            <h1>
              Question {currentQuestion + 1} out of {questions.length}
            </h1>
            <h3>{questions[currentQuestion].text}</h3>
            <ul>
              {questions[currentQuestion].options.map((option) => {
                return (
                  <li
                    onClick={() => optionClicked(option.isCorrect)}
                    key={option.id}
                  >
                    {option.text}
                  </li>
                );
              })}
            </ul>
          </div>
      
      )}
    </div>
    </div>
  );
};

export default QuizComponent1;

