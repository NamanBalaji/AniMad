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
                    You are watching <Link className='link' to={`/details/${id}`}>
                        {id.split("-").join(" ")}
                    </Link> episode {ep}
                </h1>
            </div>
            <VideoPlayer url = {url}/>
        </div>
    )
}

export default Episode
