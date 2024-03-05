import React from 'react';
import { Link } from "react-router-dom";
const Video1 = () => {
    return (
        <div className="videos">
            <div className='video1'>
                <iframe width="500" height="300" src="https://www.youtube.com/embed/i2m7dY47EB8?si=wK-J5Lslz540rdhN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <Link to="/QuizComponent1" className="btn btn-primary" style={{ display: 'block', width: '500px', height: '35px' }}>Let's start Quiz</Link>
            </div>
        </div>
    );
}

export default Video1;