import './App.css';
import FormEditor from './components/FormEditor';
import FormDetail from './components/FormDetail';
import Home from './pages/Home'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormComponent from './components/FormComponent';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormEditor />} />
        <Route path="/forms/:formId" element={<FormComponent />} />
        <Route path='/forms/:formId/details' element={<FormDetail />} />
        {/* Add other routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;
