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

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    //const token = localStorage.getItem("token")
    const type = localStorage.getItem("type")
    if(type){
      const loginUsingToken = async() =>{
        const res = await fetch(`/${type.toLowerCase()}/token`)
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
    <Router>
      <Switch>
        <Route exact={false} path="/podcaster">
          <PodcasterNav />
        </Route>
        <Route exact={false} path="/transcriber">
          <TranscriberNav />
        </Route>
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
      <Route exact={true} path="/transcriber">
        <TranscriberHomepage />
      </Route>
      <Route exact={true} path="/researcher">
        <ResearcherHomepage />
      </Route>
      <Route exact={true} path="/transcriber/transcribe/:transcriptId">
        <EditorWrapper />
      </Route>
    </Router>
  );
}

export default App;
