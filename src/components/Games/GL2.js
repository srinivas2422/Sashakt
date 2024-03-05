import React, { useState, useEffect } from "react";
import "./GL1.css";
import axios from "axios";
import Quiz1 from "./QL2";
const SlidePuzzle1 = () => {
  const initialImages = [
    { id: 1, src: "/images/level2/00.jpg", alt: "Image 1" },
    { id: 2, src: "/images/level2/01.jpg", alt: "Image 2" },
    { id: 3, src: "/images/level2/02.jpg", alt: "Image 3" },
    { id: 4, src: "/images/level2/10.jpg", alt: "Image 4" },
    { id: 5, src: "/images/level2/11.jpg", alt: "Image 5" },
    { id: 6, src: "/images/level2/12.jpg", alt: "Image 6" },
    { id: 7, src: "/images/level2/20.jpg", alt: "Image 7" },
    { id: 8, src: "/images/level2/21.jpg", alt: "Image 8" },
    { id: 9, src: "/images/level2/22.jpg", alt: "Image 9" },
  ];

  const shuffleOrder = (array) => {
    let shuffledOrder = [...Array(array.length).keys()];
    for (let i = shuffledOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOrder[i], shuffledOrder[j]] = [
        shuffledOrder[j],
        shuffledOrder[i],
      ];
    }
    return shuffledOrder;
  };

  const shuffledOrder = shuffleOrder(initialImages);

  const correctOrder = [1, 2, 3, 4, 5, 6, 7, 8];

  const [images, setImages] = useState(initialImages);
  const [droppedImages, setDroppedImages] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuizDiv, setShowQuizDiv] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [QuizButtonVisible, setQuizButtonVisible] = useState(true);
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    setImages((prevImages) =>
      shuffledOrder.map((index) => ({ ...prevImages[index] }))
    );
  }, []);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const draggedImageId = e.dataTransfer.getData("text/plain");
    const draggedImage = images.find(
      (img) => img.id.toString() === draggedImageId
    );

    if (draggedImage) {
      setDroppedImages((prevDroppedImages) => [
        ...prevDroppedImages,
        draggedImage,
      ]);
      setImages((prevImages) =>
        prevImages.filter((img) => img.id !== draggedImage.id)
      );
    }

    if (images.length === 1) {
      const droppedIds = droppedImages.map((img) => img.id);
      const isCorrectOrder =
        JSON.stringify(droppedIds) === JSON.stringify(correctOrder);

      setShowCongrats(isCorrectOrder);
      setUndoDisabled(isCorrectOrder);
    }
  };

  const handleUndo = () => {
    const lastDroppedImage = droppedImages[droppedImages.length - 1];
    if (lastDroppedImage) {
      setImages((prevImages) => [...prevImages, lastDroppedImage]);
      setDroppedImages((prevDroppedImages) => prevDroppedImages.slice(0, -1));
      setShowCongrats(false);
      setUndoDisabled(false);
    }
  };

  const handlePreview = () => {
    setPreviewImage("/images/level2/lab.jpg");
  };

  
  const handleNext = async () => {
    try {
      // Make a POST request to save game progress
      await axios.post('http://localhost:5000/api/game/level', {level:2,  isCompleted:true},{headers: {
        'auth-token': authToken,
        'Content-Type': 'application/json', 
      }});

      console.log('Game progress saved successfully');
      
      setShowQuizDiv(true);
      setQuizStarted(true);
      setQuizButtonVisible(false);
      setShowCongrats(false);
      setDroppedImages([]);
      setImages([]);
      setPreviewImage(null);
    } catch (error) {
      console.error('Error saving game progress:', error);
    }
  };

  const handleQuizCompletion = () => {
    setShowQuizDiv(false);
    setQuizStarted(false);
  };
  const restartPuzzle = () => {
    setImages(initialImages);
    setDroppedImages([]);
    setShowCongrats(false);
    setUndoDisabled(false);

    const newShuffledOrder = shuffleOrder(initialImages);
    setImages((prevImages) =>
      newShuffledOrder.map((index) => ({ ...prevImages[index] }))
    );
  };

  return (
    <section className={`slidegame ${showCongrats ? 'congrats-background1' : ''}`}>
      {showCongrats ? (
        <div className="congrats-container">
          <h1 className="congrats-message visible">
            Right to be protected from any hazardous employment till the age of 14 years 
          </h1>
          <div className="buttons">
            <button className="restart-button" onClick={restartPuzzle}>
              Restart
            </button>
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="pre-img">
            <img src="/images/level2/lab.jpg" alt="preview pic" />
          </div>
          <div
            className="drop-zone"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {showQuizDiv && quizStarted ? (
              <Quiz1 onComplete={handleQuizCompletion} />
            ) : (
              <>
                {droppedImages.map((img) => (
                  <img
                    key={img.id}
                    src={img.src}
                    alt={img.alt}
                    className={showCongrats ? "fade-out" : ""}
                  />
                ))}
                {previewImage && isHovered && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                      width: isHovered ? "595px" : "auto",
                      height: isHovered ? "595px" : "auto",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  />
                )}
              </>
            )}
          </div>
          <div className="image-list">
            {images.map((img) => (
              <img
                key={img.id}
                src={img.src}
                alt={img.alt}
                draggable
                onDragStart={(e) => handleDragStart(e, img.id)}
                style={{
                  height: "110px" 
                }}
              />
            ))}
          </div>
          <button
            className="preview-button"
            onClick={handlePreview}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={showCongrats || quizStarted}
            style={{ display: undoDisabled ? "none" : "block" }}
          >
            Preview
          </button>
          <button
            className="undo-button"
            onClick={handleUndo}
            disabled={undoDisabled}
            style={{ display: undoDisabled ? "none" : "block" }}
          >
            Undo
          </button>
        </>
      )}
    </section>
  );
};
export default SlidePuzzle1;
