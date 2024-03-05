// SignIn.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const navigate= useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/signin', { email });
      if(response.data.auth === true)
      {
        const ageNumber = response.data.userAge;
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
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      
    }
  };

  return (
    <div className='center'>
    <div className="form-container">
      <h2>Sign In</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
      <h5>Need an account?</h5>
      <Link className="btn" to="/signup" role="button">Sign Up</Link>
    </div>
    </div>
  );
};

export default SignIn;
