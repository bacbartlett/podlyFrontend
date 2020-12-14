import React from 'react';

const Homepage = (props) =>{
    return(
        <>
        <div className={"homepageHero"} style={{backgroundImage: "url(/homepageHero.jpg)"}}>
            <h1 className="bannerText">Welcome To Podly</h1>
            <h2 className="bannerText">A Podcast Transcription and Research Tool</h2>
        </div>
        <h1>Homepage</h1>
        </>
    )
}

export default Homepage