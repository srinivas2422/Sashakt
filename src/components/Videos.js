import React from "react";
import { Link } from "react-router-dom";
const Videos = () => {
  return (
    <>
      <div className="video">
        <div className=" videomain ">
          <div className="cards">
          <div className="card" style={{ width: "18rem" }}>
              <img
                src="images/education.jpeg"
                className="card-img-top"
                alt="..."
                style={{ height: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">Education</h5>
                <p className="card-text"></p>
                <Link to="/video1" className="btn btn-primary">
                  Let's start
                </Link>
              </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="images/touch.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Good - Bad touch</h5>
                <p className="card-text"></p>
                <Link to="/video2" className="btn btn-primary">
                  Let's start
                </Link>
              </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="images/rights.jpeg"
                className="card-img-top"
                alt="..."
                style={{ height: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">Child's rights</h5>
                <p className="card-text"></p>
                <Link to="/video3" className="btn btn-primary">
                  Let's start
                </Link>
              </div>
            </div>

            </div>
        </div>
      </div>
    </>
  );
};

export default Videos;
