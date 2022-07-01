import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"
import './App.css';
import React, { Component, useState } from 'react';
import { Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import Stack from 'react-bootstrap/Stack'
import centifission from './c.png'

import Table from 'react-bootstrap/Table'

import MovingComponent from 'react-moving-text'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './component/HOme';
// import About from './component/About';
import Revoke from './component/revoke';
import Ratify from './component/ratify';


function App() {

  return (
      
    <Router>
      <div to="/"></div> 
<Routes>
  <Route exact path='/' element={< Home />}></Route>
  <Route exact path='/revoke' element={< Revoke />}></Route>
  <Route exact path='/enable' element={< Ratify />}></Route>
</Routes>
   
     </Router> 
//       <div>
// <p>cal{this.state.transactionID}</p>
//       </div>
    
  
     
  );

}

export default App;
