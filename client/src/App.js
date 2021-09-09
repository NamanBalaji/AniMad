import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar';

const App = ()=>{
  return <Router>
    <Navbar />
  </Router>
}

export default App;