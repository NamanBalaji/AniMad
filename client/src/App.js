import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AnimeDetail from './components/AnimeDetail';
import Genre from './components/Genre';
import GenreList from './components/GenreList';
import Home from './components/Home';
import List from './components/List';
import Navbar from './components/Navbar';
import Popular from './components/Popular';
import Search from './components/Search';

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
      <Route exact path = '/search/:term'>
       <Search/>
      </Route>
      <Route exact path = '/details/:id'>
       <AnimeDetail />
      </Route>
    </Switch>
  </Router>
}

export default App;