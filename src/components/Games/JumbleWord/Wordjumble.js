import React, { useState, useEffect } from 'react';
import './Wordjumble.css';
import axios from 'axios';
const WordJumble = ({ onScoreChange, onLastWordContentChange }) => {
  const words = [
    { word: 'CHILDLABOUR', content: 'Hint: Harmful activity of every children' },
    { word: 'PARENT', content: 'Hint: Support system of every child' },
    { word: 'EDUCATION', content: 'Hint: Process of getting knowledge' },
    { word: 'FREEDOM', content: 'Hint: State of being free' },
    { word: 'EMPOWERMENT', content: 'Hint: Having power over their own lives' },
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [jumbledWord, setJumbledWord] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const authToken = localStorage.getItem('token');
  const getRandomWord = () => words[wordIndex];

  const jumbleWord = (word) => word.split('').sort(() => Math.random() - 0.5).join('');

  const handleNewWord = () => {
    const newWord = getRandomWord();
    setJumbledWord(jumbleWord(newWord.word));
    setGuess('');
    onLastWordContentChange(newWord.content);
  };

  const handleGuess = () => {
    const normalizedGuess = guess.toUpperCase(); // Convert guess to uppercase

    if (normalizedGuess === words[wordIndex].word) {
      const newScore = score + 1;
      setScore(newScore);
      onScoreChange(newScore);
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      handleNewWord();
      storeScore();
    }
  };
  const storeScore = async () => {
    try {
      await axios.post('http://localhost:5000/api/game/jumblescore', {  score: score  },{headers: {
        'auth-token': authToken,
        'Content-Type': 'application/json', 
      }});
      console.log('Score saved to the server.');
    } 
    catch (error) {
      console.error('Error saving data to server:', error);
    }
  };

  useEffect(() => {
    handleNewWord();
  }, [wordIndex]);

  return (
    <div className="word-jumble">
      <h1>WORD JUMBLE GAME</h1>
      <p>{words[wordIndex].content}</p>
      <div className="jumbled-word">{jumbledWord}</div>
      <div>
        <input
          type="text"
          placeholder="Your guess"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
      </div>
      <br />
      <button onClick={handleGuess}>Submit</button>
    </div>
  );
};

const Scoreboard = ({ score, lastWordContent }) => {
  return (
    <div className="scoreboard">
      <h1>Scoreboard</h1>
      <p>Current Score: {score}</p>
      
    </div>
  );
};

const App = () => {
  const [score, setScore] = useState(0);
  const [lastWordContent, setLastWordContent] = useState('');

  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };

  const handleLastWordContentChange = (content) => {
    setLastWordContent(content);
  };

  return (
    <div className='image'>
    <div className="App">
      <WordJumble
        onScoreChange={handleScoreChange}
        onLastWordContentChange={handleLastWordContentChange}
      />
      <br />
      <Scoreboard score={score} lastWordContent={lastWordContent} />
    </div>
    </div>
  );
};
export default App;
