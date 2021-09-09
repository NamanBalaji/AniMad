import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { useGlobalContext } from '../utils/context';
import AnimeCard from './AnimeCard';
import Loading from './Loading';
import '../index.css';
import Buttons from './Buttons';

const Home = () => {
    const history = useHistory();
    const [page, setPage] = useState(1);
    const {isLoading, setIsLoading} = useGlobalContext();
    const [data, setData] = useState([]);

    useEffect(()=>{
        setIsLoading(true);
        fetch(`/recentlyadded/${page}`)
        .then(res=> res.json())
        .then(doc => {
            if(doc.results.length!==0){
                setData(doc.results);
                setIsLoading(false);
            }
        else{
            history.push('/error');
        }
        })
    }, [page]);

    return isLoading ? <Loading /> : (
        <div className='container'>
            <div className="mb-4" style={{"textAlign": "center"}}>
                <h1 className="display-2">Latest Episodes</h1>
            </div>
            <div className="row">
                {
                    data.map((anime, index)=>{
                        return (
                            <div className='col-sm-6 col-md-3 col-lg-3 mb-4'>
                        <Link style={{ textDecoration: 'none' }} className='link' to={`/watch/${anime.id}/${anime.episodeNumber}`}>
                            <AnimeCard key={index} {...anime}/>
                        </Link>
                        </div>
                        )  
                    })
                }
                <Buttons setPage={setPage} page={page} />
            </div>
        </div>
        
    )
}

export default Home
