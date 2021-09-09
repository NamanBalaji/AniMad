import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import NavList from '../utils/navData';

const Navbar = () => {
    const history = useHistory();
    const[term, setTerm] = useState("")

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
            <div className="container-fluid">
                <Link style={{ textDecoration: 'none' }} className="navbar-brand" to="/">Animad</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            NavList.map((item)=>{
                                const {id, link, text} = item;
                                return <li className="nav-item" key={id}>
                                            <Link style={{ textDecoration: 'none' }} className="nav-link active" aria-current="page" to={link}>{text}</Link>
                                        </li>
                            })
                        }
                    </ul>
                    <form className="d-flex" onSubmit={(e)=>{
                        history.push(`/search/${term}`)
                        setTerm('');
                    }}>
                        <input className="form-control me-2" value={term} type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setTerm(e.target.value)} />
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
