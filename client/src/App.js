import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Genre from './components/Genre';
import GenreList from './components/GenreList';
import Home from './components/Home';
import List from './components/List';
import Navbar from './components/Navbar';
import Popular from './components/Popular';

const App = ()=>{
  return <Router>
    <Navbar />
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/genrelist'>
        <Genre />
      </Route>
      <Route exact path = '/popular'>
      <Popular />
     </Route>
     <Route exact path = '/list'>
      <List />
     </Route>
     <Route exact path = '/genre/:type'>
      <GenreList />
      </Route>
    </Switch>
  </Router>
}

export default App;