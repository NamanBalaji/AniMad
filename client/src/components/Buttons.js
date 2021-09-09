import React from 'react'

const Buttons = ({setPage, page}) => {

    const prevPage = ()=>{
        if(page <= 1){
            setPage(1);
        }
        setPage(page -1);
    }

    const nextPage = ()=>{
        setPage(page+1);
    }

    return (
        <div className='row'>
            {page <=1 ? (
                <></>
            ) :  <div className = 'col-sm-2 col-md-2 col-lg-2'>
                    <button type="button" className="btn btn-success" onClick={prevPage}>Prev</button> 
                </div>
            }
            <div className= 'col-sm-2 offset-sm-8 col-md-2 offset-md-8 col-lg-2 offset-lg-8'>
            <button type="button" className="btn btn-success" onClick={nextPage}>Next</button> 
            </div>
        </div>
    )
}

export default Buttons
