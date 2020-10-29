import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import { render } from 'react-dom';

const Home = ()=>{
    const history = useHistory();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect( ()=>{
      fetch('/genrelist')
      .then((res) => res.json())
      .then((doc) => {
        
        setData(doc.list);
        console.log(data);
        setLoading(false);
    })
}, []);

    return loading ? (
      <Loader type="Rings" color="#00BFFF" height={300} width={300} />
    ) : (
      <div className="container">
      <div style={{"textAlign": "center"}}>
      <h1>Genres</h1>
      </div>
          
          <div className="row">
              {data.map((ele, index)=>{
                  return(
                    <div className="col s2">
                    <h5>
                    <Link className="link" to={`/genre/${ele.split(" ").join("-")}/1`} key={index}>
                  {ele}
                </Link>
                </h5>
                </div>
                  )
                
              })}
          </div>

          <h3>
            Made by Naman Balaji
          </h3>
          <a href="">
            Github
          </a>

      </div>
    );
};

export default Home;