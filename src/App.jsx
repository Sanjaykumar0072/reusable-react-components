import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import './app.scss'
import options from './assets/json/dropdown.json';
import Multiselect from './components/multiselect/multiselect';
import SingleSelect from './components/singleselect/singleselect';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/multiselect" element={<Multiselect options={options[1].data} />} />
          <Route path="/singleselect" element={<SingleSelect dropdowns={options} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
