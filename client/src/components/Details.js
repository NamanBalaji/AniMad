import React, { useState, useEffect } from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import { render } from 'react-dom';

import '../App.css'

const Detail = ()=>{
    let id = useParams().id;
    
    const history = useHistory();
    const [details, setDetails] = useState({});
    
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        fetch(`/details/${id}`)
        .then(res=> res.json())
        .then(doc => {
            

            
            setDetails(doc.results[0])
            
            setLoading(false);}
            
        )
    }, [id, ep]);
    var ep = Number(details.totalEpisode);
    const epList = ()=> {
        let l  = []
        for(let i=0; i<ep; i++){
          l[i] = i+1;;
        }
        return l;
    }
    
    return(
        loading ? (
            <Loader type="Rings" color="#00BFFF" height={300} width={300} />
        ) :
        (<div className="container">
           <h3>
              {details.title}
            </h3>
        <div className="row">
            <div className="col s4">
               <div style={{"textAlign": "center", "marginTop": "3%", "marginBottom": "0"}}>
                  <img className ="im" src={details.image}></img>
               </div>
            </div>
            <div className="col s8">
               {details.summary}
            </div>
        </div>
        <div className="row" style={{"textAlign": "center"}}>
            {String(details.genres).split(',').map((genre, i)=>{
               return(
                   <div className="col s2">
                   <h5>
                   <Link className="link" key={i} to={`/genre/${genre.split(" ").join("-")}/1`}>{genre}</Link>
                   </h5> 
                   </div>
                )
           })
        } 
        </div>
        
           <div className="row">
           <div style={{"overflow": "auto"}}>
           {ep===0?<span>Coming Soon</span>:epList().map((ep,index)=> {return <div style={{"marginBottom": "1%"}} className="col s1"><Link key={index} to={`/watch/${id}/${ep}`}><button className="waves-effect waves-light btn">{ep}</button></Link></div>})}
           </div>
           </div>
           </div>
          
        )
    )
}

export default Detail;