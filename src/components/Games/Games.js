import React from "react";
import { Link } from "react-router-dom";
const Games = () => {
  return (
    <>
      <div className="game">
        <div className=" gamemain ">
          <div className="cards">
          <div className="card" style={{ width: "18rem" }}>
              <img
                src="images/g1.jpg"
                className="card-img-top"
                alt="..."
                style={{ height: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">Puzzle-Game</h5>
                <p className="card-text"></p>
                <Link to="/game/level1" className="btn btn-primary">
                  Start the Game
                </Link>
              </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="images/whackamole.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Whacka-mole Game</h5>
                <p className="card-text"></p>
                <Link to="/game/wa" className="btn btn-primary">
                  Start the Game
                </Link>
              </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="images/memory.jpeg"
                className="card-img-top"
                alt="..."
                style={{ height: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">Memory Game</h5>
                <p className="card-text"></p>
                <Link to="/game/memory" className="btn btn-primary">
                  Start the Game
                </Link>
              </div>
            </div>

            </div>
        </div>
      </div>
    </>
  );
};

export default Games;
