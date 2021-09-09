import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { useGlobalContext } from '../utils/context';
import Loading from './Loading';

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
            <div className='row align-items-center'>
            {
                data.map((g, index)=>{
                    return(
                        <div className='col-sm-6 col-md-4 col-lg-2 mt-4 d-flex align-items-stretch'>
                            <Link to={`/genre/${g.split(" ").join("-")}/1`} key={index}>
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
