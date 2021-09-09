import React, { useState, useEffect } from 'react'
import {Link, useParams} from 'react-router-dom';
import { useGlobalContext } from '../utils/context';
import Loading from './Loading';

const AnimeDetail = () => {
    const {isLoading, setIsLoading} = useGlobalContext();
    const {id} = useParams();
    const [details, setDetails] = useState({});
    
    useEffect(()=>{
        setIsLoading(true)
        fetch(`/details/${id}`)
        .then(res=> res.json())
        .then(doc => {
            setDetails(doc.results[0])
            setIsLoading(false);}
        )
    }, [id]);

    let ep = Number(details.totalEpisode);
    const epList = ()=> {
        let l  = []
        for(let i=0; i<ep; i++){
          l[i] = i+1;;
        }
        return l;
    }

    return isLoading ? <Loading /> : (
        <div className = 'container'>
            <div className="mb-4" style={{"textAlign": "center"}}>
                <h1 className="display-2">{details.title}</h1>
            </div>
            <div className ='row'>
                <div className='col-sm-4 col-md-5 col-lg-6'>
                    <img className='img-fluid' src={details.image} alt={details.title} />
                </div>
                <div className="col-sm-8 col-md-7 col-lg-6">
                    {details.summary}
                </div>
            </div>
            <div className="row mt-5" style={{"textAlign": "center"}}>
                {
                    String(details.genres).split(',').map((genre, i)=>{
                        return(
                            <div className="col-sm-4 col-md-2 col-lg-2">
                                <h5>
                                    <Link style={{ textDecoration: 'none' }} className="link" key={i} to={`/genre/${genre.split(" ").join("-")}`}><h2 style={{color:'white'}}>{genre}</h2></Link>
                                </h5> 
                            </div>
                        )
                    })
                } 
            </div>
            <div className="row mt-5 mb-3">
                    {
                        ep===0 ? <span>Coming Soon</span> : epList().map((ep,index)=> {
                            return(
                                <div className="col-sm-3 col-md-2 col-lg-1" style={{"textAlign": "center"}}>
                                    <Link style={{ textDecoration: 'none' }} key={index} to={`/watch/${id}/${ep}`}>
                                       <h4 style={{color:"white"}}>{ep}</h4>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
           </div>
    )
}

export default AnimeDetail
