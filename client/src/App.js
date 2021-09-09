import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Genre from './components/Genre';
import Navbar from './components/Navbar';

const App = ()=>{
  return <Router>
    <Navbar />
    <Switch>
      <Route exact path='/genrelist'>
        <Genre />
      </Route>
    </Switch>
  </Router>
}

export default App;