// src/WordSearchGame.js
import React, { useState, useEffect } from 'react';
import './Grid.css';
import axios from 'axios';
const WordSearchGame = () => {
  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
//   const gridSize = 8;
  const authToken = localStorage.getItem('token');

  const levels = [
    { words: ['CHILD', 'PARENT', 'POWER', 'BOOK', 'BAG'], gridSize: 10 },
    { words: ['TEACHER', 'RIGHTS', 'FREEDOM', 'EDUCATION', 'EMPOWERMENT'], gridSize: 10 },
    // Add more levels as needed
  ];

  useEffect(() => {
    // Initialize the grid and words for the current level
    const currentLevel = levels[level - 1];
    const newGrid = Array.from({ length: currentLevel.gridSize }, () =>
      Array.from({ length: currentLevel.gridSize }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      )
    );
    setGrid(newGrid);
    setWords(currentLevel.words);
  }, [level]);

  const handleCellClick = (row, col) => {
    // Toggle the selected state of the cell
    const newSelectedCells = [...selectedCells];
    const isSelected = newSelectedCells.some(
      (cell) => cell.row === row && cell.col === col
    );

    if (isSelected) {
      setSelectedCells(newSelectedCells.filter((cell) => !(cell.row === row && cell.col === col)));
    }
    else {
      setSelectedCells([...newSelectedCells, { row, col }]);
    }
  };

  const checkSelectedWords = () => {
    const selectedWord = selectedCells.map(
      (cell) => grid[cell.row][cell.col]
    ).join('');

    if (words.includes(selectedWord)) {
      setScore(score + selectedWord.length);
      setSelectedCells([]);
    }
  };

  const handleLevelChange = () => {
    storeScore();
    setLevel((prevLevel) => (prevLevel < levels.length ? prevLevel + 1 : 1));
    setScore(0);
    setSelectedCells([]);
  };
  const storeScore = async () => {
    try {
      await axios.post('http://localhost:5000/api/game/wordscore', {  score: score, level:level },{headers: {
        'auth-token': authToken,
        'Content-Type': 'application/json', 
      }});
      console.log('Score and level saved to the server.');
    } 
    catch (error) {
      console.error('Error saving data to server:', error);
    }
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} className="grid-row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className={`grid-cell ${selectedCells.some(
              (selectedCell) =>
                selectedCell.row === rowIndex && selectedCell.col === colIndex
            ) ? 'selected' : ''}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          >
            {cell}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="image">
      <div className="word-search-game">
        <div className="scoreboard">
          <div className="score">Score: {score}</div>
      
          <div className="level">Level: {level}</div>
         
          <button onClick={handleLevelChange}>Next Level</button>
          <br />

        </div>
        <div className="grid">{renderGrid()}</div>
        <div className="word-list">
          <h3>WORD LIST:</h3>
          <ul>
            {words.map((word, index) => (
              <li key={index} className={selectedCells.length === word.length && selectedCells.every((cell, i) => cell.row === index && cell.col === i) ? 'found' : ''}>
                {word}
              </li>
            ))}
          </ul>
        </div>
        <br />
        <button onClick={checkSelectedWords}>Check score of Selected Word</button>
      </div>
      </div>
      );
};

export default WordSearchGame;
