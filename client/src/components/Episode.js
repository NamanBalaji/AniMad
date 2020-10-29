import React, { useState, useEffect } from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import { render } from 'react-dom';

import '../App.css';
const Episode = ()=>{
    const {id, ep} = useParams();
    let history = useHistory();
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("");
    
    useEffect(()=>{
      setLoading(true);
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
                setLoading(false);
              } else {
                history.push("/error");
              }
      }
        )
    }, [url, ep, id])
   

    return loading ? (
        <Loader type="Rings" color="#00BFFF" height={300} width={300} />
    ) :
    (
        <div className="container">
            <h3 style={{"textAlign":"center"}}> You are watching <Link className='link' to={`/details/${id}`}>{id.split("-").join(" ")}</Link>  episode {ep}</h3>
            <iframe title="outer"
            src={url}
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            style={{
              position: "relative",
              width: "100%",
              height: "700px",
              boxShadow: "10px 10px 20px rgba(0,0,0,0.5)",
            }}
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
          <div className="row">
          <div className="col s2">
            {ep === "1" ? null : (
          <Link className='link'to={`/watch/${id}/${Number(ep) - 1}`}>
            <h4>Previous</h4>
          </Link>
        )}
          </div>
          <div className="col s2 push-s9">
            <Link className='link' to={`/watch/${id}/${Number(ep) + 1}`}>
          <h4>Next</h4>
        </Link>
        </div>
        </div>
      </div>
          
      )
}

export default Episode;