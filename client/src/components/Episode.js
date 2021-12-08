import React, { useState, useEffect } from 'react'
import {Link, useParams, useHistory} from 'react-router-dom';
import { useGlobalContext } from '../utils/context';
import Loading from './Loading';
import VideoPlayer from './VideoPlayer';

const Episode = () => {

    const {id, ep} = useParams();
    let history = useHistory();
    const {isLoading, setIsLoading} = useGlobalContext();
    const [url, setUrl] = useState("");

    useEffect(()=>{
        setIsLoading(true);
          fetch(`/watch/${id}/${ep}`)
          .then((res)=>res.json())
          .then(
              (data) => {
                console.log(data);
                if (data.links.length >= 1 || data.link.length >= 2) {
                  if (data.links.length === 0 || data.links[0].label === "hls P") {
                    setUrl(data.link);
                  } else {
                    setUrl(data.links[0]["url"]);
                  }
                  setIsLoading(false);
                } else {
                  history.push("/error");
                }
        }
          )
      }, [url, ep, id])

    return isLoading ? <Loading /> : (
        <div className='container'>
            <div className="mb-4" style={{"textAlign": "center"}}>
                <h1 className="display-2">
                    You are watching <Link style={{ textDecoration: 'none' }} className='link' to={`/details/${id}`}>
                        {id.split("-").join(" ")}
                    </Link> episode {ep}
                </h1>
            </div>
            <VideoPlayer className='mb-3' url = {url}/>
            <div className="row">
                <div className="col-sm-2 col-md-2 col-lg-2">
                    {ep === "1" ? null : (
                        <Link className='link' style={{ textDecoration: 'none'}} to={`/watch/${id}/${Number(ep) - 1}`}>
                        <button type="button" className="btn btn-success">Prev</button> 
                        </Link>
                     )}
                </div>
                    <div className="col-sm-2 offset-sm-8 col-md-2 offset-md-8 col-lg-2 offset-lg-8">
                        <Link className='link' to={`/watch/${id}/${Number(ep) + 1}`}>
                            <button type="button" className="btn btn-success">Next</button> 
                        </Link>
                    </div>
                </div>
            </div>

    )
}

export default Episode
