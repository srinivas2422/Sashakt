import React, { useState } from "react";
import axios from "axios";

const Parents = () => {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      // Send a GET request to the server with the email parameter
      const response = await axios.get(`http://localhost:5000/api/users/getuser?email=${email}`);
      console.log(response.data);
      if (response.data.auth === true) {
        setUserData(response.data);
      } else {
        alert(response.data.message);
        setUserData(null);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Please enter the email");
      setUserData(null);
    }
  };

  return (
    <div className="parent">
      <label htmlFor="email">Enter Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={getUserData}>Get User Data</button>

      {userData && (
        <div className="data">
          <div className="cards">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">User Data</h5>
                <p className="card-text">
                  Name: {userData.user_data?.name ?? "null"},
                  <br />
                  Age: {userData.user_data?.age ?? "null"},
                  <br />
                  Email: {userData.user_data?.email ?? "null"},
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Puzzle Game</h5>
                <p className="card-text">
                  Puzzle Level: {userData.puzzle?.level ?? "null"},
                  <br />
                  Puzzle Completed:  {userData.puzzle?.isCompleted?.toString() ?? "null"},
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Waga mole Game</h5>
                <p className="card-text">
                  Wagamole Level: {userData.wagascore?.level ?? "null"},
                  <br />
                  Wagamole Completed:  {userData.wagascore?.isCompleted?.toString() ?? "null"},
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Candy Crush Game</h5>
                <p className="card-text">
                  Candy Crush Level: {userData.wagascore?.level ?? "null"},
                  <br />
                  Candy Crush Completed:  {userData.wagascore?.isCompleted?.toString() ?? "null"},
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Parents;
