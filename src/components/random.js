import React, { useState, useEffect } from "react";
import "./Jumble.css";

const JumbledSentenceGame = () => {
  const [finalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [input, setInput] = useState("");
  const [displayedQuestion, setDisplayedQuestion] = useState("");
  const [showQuestion, setShowQuestion] = useState(true);

  const questions = [
    { text: "Dream big and work hard", isCorrect: true },
    { text: "Don't be afraid be focused", isCorrect: true },
    { text: "Education for child is like wings for a bird", isCorrect: true },
  ];

  useEffect(() => {
    setShowQuestion(true);
    setDisplayedQuestion(questions[currentQuestion].text);

    const timeout = setTimeout(() => {
      const words = questions[currentQuestion].text.split(" ");
      const scrambledArray = words.sort(() => Math.random() - 0.5);
      setDisplayedQuestion(scrambledArray.join(" "));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currentQuestion]);

  const checkTrue = () => {
    if (input.toLowerCase() === questions[currentQuestion].text.toLowerCase()) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setShowQuestion(false);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setInput("");
      }, 3000);
    } else {
      setFinalResults(true);
      storeScore();
    }
  };

  const resetButton = () => {
    setCurrentQuestion(0);
    setFinalResults(false);
    setScore(0);
  };

  const storeScore = async () => {
    try {
      const response = await fetch("https://your-api-domain.com/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score }),
      });

      if (!response.ok) {
        throw new Error("Failed to save score");
      }

      console.log("Score saved successfully");
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  return (
    <div className="edu">
      <div className="App">
        <h1>Jumbled Sentence Game</h1>

        <h2>Current Score: {score}</h2>

        {finalResults ? (
          <div className="sj-resultCard">
            <h1>Final Score</h1>
            <h2>
              You scored {score} out of {questions.length}
            </h2>
            <button className="btn btn-danger" onClick={resetButton}>
              Restart
            </button>
          </div>
        ) : (
          <div className="sj-questionCard">
            {showQuestion ? (
              <>
                <h2>
                  Question {currentQuestion + 1} out of {questions.length}
                </h2>
                <h3>{displayedQuestion}</h3>
              </>
            ) : (
              <p>Get ready for the next question!</p>
            )}

            <input
              type="text"
              placeholder="Enter the sentence"
              className="sj-input"
              id="sj-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <br />
            <button className="btn btn-secondary" onClick={checkTrue}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JumbledSentenceGame;