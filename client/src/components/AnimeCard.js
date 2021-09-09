import React from 'react'
import '../index.css';

const AnimeCard = ({title, episodeNumber, image}) => {
    
    return (
        <div class="card bg-dark h-100" style={{"textAlign": "center"}}>
            <img src={image} class="card-img-top img-fluid" alt={title} />
            <div class="card-body">
                <h5 class="card-title">{title}</h5>
                {episodeNumber && <p class="card-text">{episodeNumber}</p>}
            </div>
        </div>
    )
}

export default AnimeCard
