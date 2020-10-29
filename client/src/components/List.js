import React, { useState, useEffect } from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import Loader from 'react-loader-spinner'
import { render } from 'react-dom';
import '../App.css';
const List = ()=>{
    const Alphabet = ()=>{
        var x =[];
        var i = 65;
        var j = 91;
        for(var k = i; k < j; k++){
            var str =String.fromCharCode(k);
                    x.push(str)
        }
        return x
    }
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const {vari, page} = useParams();
    
    const [list,  setList] = useState([]);
    useEffect(()=>{
        setLoading(true);
       fetch(`/list/${vari}/${page}`)
       .then(res=> res.json())
       .then(data=>{
           if(data.list.length!==0){
        setList(data.list);
        setLoading(false);
    }
        else{
            history.push('/error')
        }
       })
    }, [page, vari])

    return(
        loading ? (
            <Loader type="Rings" color="#00BFFF" height={300} width={300} />
        ) :
        (
            <div className="container">
              <div style={{"textAlign": "center"}}>
                <h3>Anime List</h3>
              </div>
             
            <div className="row">
                {Alphabet().map((el,index)=>{
                    return(<div className="col s1"><Link className="link" key={index} to={`/list/${el}/1`}>{el}</Link></div>)
                })
                }
            </div>
            <div className="row">
                {
                    list.map((el, index)=>{
                        return (<div className="col s6">
                        <h6>
                        <Link key={index} className="link" to={`/details/${el.id}`}>
                               {el.title}
                        </Link>
                        </h6>
                        
                        </div>
                            
                        )
                    })
                    }
            </div>
                    <div className="row">
                        <div className="col 2">
                        {page === "1" ? null : (
          <Link  className="link" to={`/list/${vari}/${Number(page) - 1}`}>
            Previous
          </Link>
        )}
                        </div>
                        <div className="col s2 push-s9">
                        <Link className="link" to={`/list/${vari}/${Number(page) + 1}`}>
          Next
        </Link>
                        </div>
                    </div>
                    
             
            
            </div>
        )
    )

}
///list/${vari}/${newPage}
export default List;