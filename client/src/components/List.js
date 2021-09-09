import React, { useState, useEffect } from 'react'
import {Link, useParams, useHistory} from 'react-router-dom';
import { useGlobalContext } from '../utils/context';
import Buttons from './Buttons';
import Loading from './Loading';


const List = () => {
    const {isLoading, setIsLoading} = useGlobalContext();
    const history = useHistory();
    const [alpha, setAlpha]= useState('all');
    const [page, setPage] = useState(1);
    const [list,  setList] = useState([]);

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

    useEffect(()=>{
        setIsLoading(true);
       fetch(`/list/${alpha}/${page}`)
       .then(res=> res.json())
       .then(data=>{
           if(data.list.length!==0){
        setList(data.list);
        setIsLoading(false);
    }
        else{
            history.push('/error')
        }
       })
    }, [page, alpha])

    return (
        isLoading ? <Loading /> : (
           <div className='container'>
                <div className="mb-4" style={{"textAlign": "center"}}>
                    <h1 className="display-2">Anime List</h1>
                </div>
                <div className="row align-items-center mb-5">
                {
                    Alphabet().map((el,index)=>{
                        return(
                            <div className="col">   
                                <Link style={{ textDecoration: 'none' }} onClick={()=>{setPage(1); setAlpha(el)}} key={index} to={`/list`}>
                                    <h4 style={{color: "white"}}>{el}</h4>
                                </Link>
                            </div>
                        )
                    })
                }
                </div>
                <div className="row">
                {
                    list.map((el, index)=>{
                        return (
                            <div className="col-sm-6 col-md-6 col-lg-6 mt-2 mb-4">
                                <Link style={{ textDecoration: 'none' }} key={index} to={`/details/${el.id}`}>
                                    <h4 style={{color: "white"}}>
                                        {el.title}
                                    </h4>                            
                                </Link>
                            </div>
                        )
                    })
                    }
                </div>
                <Buttons setPage={setPage} page={page} />
           </div>
        )
    )
}

export default List
