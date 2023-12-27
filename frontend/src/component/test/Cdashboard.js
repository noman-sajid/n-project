import React from 'react'
import Csidebar from './Csidebar'
import './Cdashboard.css'
import Component1 from './Component1.js';
import Component2 from './Component2';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Cdashboard() {
  return (
    <Router>
     <div className='container-fluid mr-0 mb-0 ml-0 p-0 margin-top'>
      <Csidebar/>
     <div className='c_content'>
    <Routes>
      <Route exact path="/a" element={<Component1/>} />
      <Route exact path="/b" element={<Component2/>} />
      <Route exact path="/b" element={<Component2/>} />
      <Route exact path="/b" element={<Component2/>} />

    </Routes>
     </div>
     </div>
     </Router>
  )
}

export default Cdashboard