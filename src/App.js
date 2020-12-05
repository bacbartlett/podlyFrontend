import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage"
import Login from "./Login/Login"
import Signup from "./Signup/Signup"
import PodcasterHomepage from "./Podcasters/Homepage/Homepage"
import TranscriberHomepage from "./Transcribers/Homepage/Homepage"
import ResearcherHomepage from "./Researcher/Homepage/Homepage"

function App() {
  return (
    <Router>
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
      <Route exact={true} path="/transcriber">
        <TranscriberHomepage />
      </Route>
      <Route exact={true} path="/researcher">
        <ResearcherHomepage />
      </Route>
    </Router>
  );
}

export default App;
