import React, {useEffect, createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Genre from './components/Genre';
import Detail from './components/Details';
import Popular from './components/Popular';
import Recent from './components/Recent';
import Episode from './components/Episode';
import Search from './components/Search';
import List from './components/List';
import Error from './components/Error';
const Routing = ()=>{
  const history = useHistory();
  useEffect(()=>{
         
     
  },[])

  return(
    <Switch>
     <Route exact path='/'>
       <Home/>
     </Route>
     <Route exact path = '/genre/:type/:page'>
      <Genre />
      </Route>
     <Route exact path = '/popular/:page'>
      <Popular />
     </Route>
     <Route exact path = '/details/:id'>
       <Detail />
     </Route>
     <Route exact path = '/recentlyadded/:page'>
       <Recent />
     </Route>
     <Route exact path = '/watch/:id/:ep'>
       <Episode />
     </Route>
     <Route exact path = '/search/:term/:page'>
       <Search/>
     </Route>
     <Route exact path = '/list/:vari/:page'>
       <List />
     </Route>
     <Route exact path = '/error'>
       <Error />
     </Route>
    </Switch>
  )
}

function App() {
  
 return (
    
   <BrowserRouter>
   <Navbar />
   <Routing />
     
   </BrowserRouter>
  
  
 );
}

export default App;
