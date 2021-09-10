import React from 'react'

const VideoPlayer = ({url}) => {
    return (

        <iframe sandbox = "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
            className='mb-4' title="outer" src={url} style = {{
            position: "relative",
            boxShadow: "2% 2% 4% rgba(0,0,0,0.5)",
            width: "100%",
            height: "700px"
        }} 
        frameBorder="0"
        allowFullScreen={true}
        marginHeight="0"
        marginWidth="0"
        scrolling="no" 

        />
    
    )
}

export default VideoPlayer
