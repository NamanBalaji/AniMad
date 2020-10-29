import React, { useState, useEffect } from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import { render } from 'react-dom';

import '../App.css';

const Popular = ()=>{
    
    const history = useHistory();
    let {page}  = useParams();
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
        fetch(`/popular/${page}`)
        .then(res=> res.json())
        .then(doc => {
            if(doc.results.length!==0){
            setData(doc.results);
            setLoading(false);
        }
        else{
            history.push('/error')
        }
        })
    }, [page]);
    return loading ? (
        <Loader type="Rings" color="#00BFFF" height={300} width={300} />
    ) : (
        <div className="container">
          <div className="row">
          {
                data.map((ele, index)=>{
                    return (
                        <div key={index} className="col s3" style={{"marginTop": "3%"}}>
                        <Link style={{"color": "#18ffff"}}to={`/details/${ele.id}`}>
                            <div>
                            <img className="im" style={{"width": "100%","height": "100%","objectFit": "contain"}} src = {ele.image}></img>
                            </div>
                            <div style={{"justify-content": "center"}}>
                            <h5>
                            {ele.title}
                            </h5>
                            
                            </div>  
                         </Link>
                         </div>
                        
                    )
                })
            }
          </div>
            <div className="row">
                <div className="col s2">
                {page === "1" ? null : (
          <Link to={`/popular/${Number(page) - 1}`}>
            Previous
          </Link>
        )}
                </div>
                <div className="col s2 push-s9">
                <Link to={`/popular/${Number(page) + 1}`}>
          Next
        </Link>
                </div>
            </div>
            
        
            </div>
    )
}
///popular/${newpage}
export default Popular;

