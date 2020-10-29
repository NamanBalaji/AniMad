import React from 'react';
import {useHistory} from 'react-router-dom'

const Error = ()=>{
    let history=useHistory();
    const handleClick = ()=>{
        history.push('/')
    }

    return(
        <div className="container">
        <h1>
        This is the  Shinobi training facility, please go back.
        </h1>
            
            <button className="btn" onClick={handleClick}>Take me back</button>
        </div>
    )
}

export default Error;