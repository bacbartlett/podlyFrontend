import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage/Homepage"
import Login from "./Login/Login"
import Signup from "./Signup/Signup"
import PodcasterHomepage from "./Podcasters/Homepage/Homepage"
import TranscriberHomepage from "./Transcribers/Homepage/Homepage"
import ResearcherHomepage from "./Researcher/Homepage/Homepage"
import EditorWrapper from "./Editor/EditorWrapper"
import PodcastDisplayWrapper from "./Podcasters/PodcastDisplay/PodcastDisplayWrapper"
import { useDispatch } from 'react-redux';
import PodcasterNav from "./NavBar/PodcasterNav/NavBar"
import TranscriberNav from "./NavBar/TranscriberNav/NavBar"
import DefaultNav from "./NavBar/DefaultNav/NavBar"
import { SET_USER } from './Store/actions';
import MyPodcasts from "./Podcasters/MyPodcasts/MyPodcasts"
import NewTranscriptForm from "./Podcasters/NewTranscriptionForm/NewTranscriptForm"
import AllPodcastWrapper from "./Researcher/AllPodcasts/AllPodcastsWrapper"
import TranscriptViewerWrapper from "./TranscriptViewer/WrapperTranscriptViewer"
import {baseUrl} from "./config"
import PendingTranscripts from "./Podcasters/PendingTranscripts/PendingTranscripts"
import PodcastTranscripts from "./Researcher/PodcastTranscripts/PodcastTranscripts"
import AboutPage from "./AboutPage/AboutPage"
import HelpPage from "./HelpPage/HelpPage"

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    //const token = localStorage.getItem("token")
    const type = localStorage.getItem("type")
    if(type){
      const loginUsingToken = async() =>{
        const res = await fetch(baseUrl + `/${type.toLowerCase()}/token`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        const data = await res.json()
        if(data.msg){
          return
        }
        const action = {
          type: SET_USER,
          payload: {...data, type}
        }
        dispatch(action)
      }


      loginUsingToken()
    }
  },[])
  return (
    <>
    <Router>
      <Switch>
        <Route path="/" exact={false}>
          <DefaultNav />
        </Route>
      </Switch>     
      <Route exact={true} path="/">
        <Homepage />
      </Route>
      <Route exact={true} path="/login">
        <Login />
      </Route>
      <Route exact={true} path="/signup">
        <Signup />
      </Route>
      <Route exact={true} path="/podcaster">
        <PodcasterHomepage />
      </Route>
      <Route exact={true} path="/podcaster">
        <MyPodcasts />
      </Route>
      <Route exact={true} path="/podcaster/podcasts/:id">
        <PodcastDisplayWrapper />
      </Route>
      <Route exact={true} path="/podcaster/podcasts/:id/newtranscript/:title">
        <NewTranscriptForm />
      </Route>
      <Route exact={true} path="/podcaster/pendingjobs">
        <PendingTranscripts />
      </Route>
      <Route exact={true} path="/transcriber">
        <TranscriberHomepage />
      </Route>
      <Route exact={true} path="/transcriber/mytranscripts">
        <h1>Coming Soon</h1>
      </Route>
      <Route exact={true} path="/researcher">
        <ResearcherHomepage />
      </Route>
      <Route exact={true} path={"/podcasts"}>
        <AllPodcastWrapper />
      </Route>
      <Route exact={true} path="/transcriber/transcribe/:transcriptId">
        <EditorWrapper />
      </Route>
      <Route exact={true} path="/transcript/:transcriptId">
          <TranscriptViewerWrapper />
      </Route>
      <Route exact={true} path={"/podcasts/:id"}>
        <PodcastTranscripts />
      </Route>
      <Route exact={true} path="/about">
        <AboutPage />
      </Route>
      <Route exact={true} path="/help">
        <HelpPage />
      </Route>
    </Router>
    {/* <a href="https://www.freepik.com/vectors/technology">Technology vector created by freepik - www.freepik.com</a> */}
    </>
  );
}

export default App;
