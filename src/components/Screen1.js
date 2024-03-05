import React from 'react';
import { useUser } from './UserContext';
const Screen1 = () => {
    const { userName } = useUser();
    return ( 
        <section id='home'>
            <h1>WELCOME, {userName}! </h1>
        </section>
     );
}
 
export default Screen1;