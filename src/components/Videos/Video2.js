import React from 'react';
import { Link } from "react-router-dom";
const Video2 = () => {
    return (
        <div className="videos">
            <div className='video2'>
                <iframe width="500" height="300" src="https://www.youtube.com/embed/zNTUMNKSNwk?si=XXR0-Gb7G2Cxggp3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <Link to="/QuizComponent1" className="btn btn-primary" style={{ display: 'block', width: '500px', height: '35px' }}>Let's start Quiz</Link>
            </div>
        </div>
    );
}

export default Video2;