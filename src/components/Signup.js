import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const SignUp = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', { name, age, email });
      if(response.data.auth === true)
      {
        const ageNumber = parseInt(age);
        if (ageNumber >= 8 && ageNumber <= 11) {
            navigate("/screen1");
        } else if (ageNumber >= 12 && ageNumber <= 16) {
            navigate("/screen2");
        } else {
            alert("Please enter a valid age.");
        }
        
        console.log(response.data.message);
        localStorage.setItem('token',response.data.authtoken)
      }
      else
      {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      alert("Please enter the correct credentials to signup!");
    }
  };


  return (
    <div className='center'>
    <div className="form-container">
      <h2>Sign Up</h2>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Age:</label>
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Sign Up</button>
      <h5>Already have an account?</h5>
      <Link className="btn" to="/signin" role="button">Sign In</Link>
    </div>
    </div>
  );
};

export default SignUp;
