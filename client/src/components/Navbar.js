import React,{useContext,useRef,useEffect,useState} from 'react';
import {Link, useHistory} from 'react-router-dom';


const Navbar  = ()=>{
    const history = useHistory();
    const [term, setTerm] = useState("")
    return (
        <nav className="teal accent-4" >
            <div  className="nav-wrapper">
            <Link className="brand-logo" to="/">AniMad</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
                 <Link  to="/popular/1">Popular</Link>
             </li>
             <li>
                 <Link  to="/recentlyadded/1">Latest Episodes</Link>
             </li>
             <li>
                 <Link  to="/list/all/1">List</Link>
             </li>
             <li>
                 <form onSubmit={(e)=>{
                     e.preventDefault();
                     history.push(`/search/${term}/1`)
                 }}>
                     <input type="text" placeholder="Search" onChange={(e)=>{setTerm(e.target.value)}}></input>
                     
                 </form>
             </li>
            </ul>
            </div>
        </nav>
     
    )
}

export default Navbar;