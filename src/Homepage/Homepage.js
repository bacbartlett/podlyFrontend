import React from 'react';
import { useHistory } from 'react-router';

const Homepage = (props) =>{
    const history = useHistory()

    const aboutPageLink = e => history.push("/about")

    return(
        <>
        <div className={"homepageHero"} style={{backgroundImage: "url(/homepageHero.jpg)"}}>
            <h1 className="bannerText">Welcome To Podly</h1>
            <h2 className="bannerText">A Podcast Transcription and Research Tool</h2>
        </div>
        <div className="AboutPageDiv">
        <div className="AboutPage__writtenSection">
                <div className="AboutPage__Header">
                    <h2>Purpose of This Project</h2>
                    <p className="AboutPage__Content">
                        This project provides for the needs of three distinct groups: <br />
                        <br />
                        1) For <b>Podcasters</b>, this platform provides a place to have their podcast episodes inexpensively transcribed. The expense is reduced without loss in transcript quality by making use of Natual Language Processing to substaintally decrease the time required to transcribe each podcast episode. <br />
                        <br />
                        2) For <b>Transcriptionists</b>, this platform provides a place to find work and an intuitive set of tools that makes their job easier and faster than ever. <br />
                        <br />
                        3) For <b>Researchers</b> (i.e. those who may be accessing the information within podcasts not just for entertainment), this platform provides a place to find complete podcast episode transcripts, allowing for easy skimming to find relevant information, and a way to create and save timestamped notes for later reference.
                    </p>
                    <p onClick={aboutPageLink}>
                        For more information, click here to see our about page.
                    </p>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default Homepage