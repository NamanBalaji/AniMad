import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useGlobalContext } from '../utils/context';
import Loading from './Loading';
import '../index.css';

const Genre = () => {
    const {isLoading, setIsLoading} = useGlobalContext();
    const [data, setData] = useState([]);

    useEffect( ()=>{
        fetch('/genrelist')
        .then((res) => res.json())
        .then((doc) => {
          setData(doc.list);
          setIsLoading(false);
        })
    }, []);

    return isLoading || data.length === 0? <Loading /> : (
        <div className='container'>
            <div className="mb-4" style={{"textAlign": "center"}}>
                <h1 className="display-2">Genres</h1>
            </div>
            <div className='row align-items-center mb-3'>
            {
                data.filter((d)=>d!=='Hentai')
                .map((g, index)=>{
                    return(
                        <div className='col-sm-6 col-md-4 col-lg-2 mt-4 d-flex align-items-stretch'>
                            <Link style={{ textDecoration: 'none' }}  className='link' to={`/genre/${g.split(" ").join("-")}`} key={index}>
                                <h1>
                                    <span className="badge bg-transparent">
                                        {g}
                                    </span>
                                </h1>
                                
                            </Link>
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
}

export default Genre
