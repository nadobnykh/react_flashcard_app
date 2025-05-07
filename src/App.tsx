import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrintView from './pages/PrintView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/print" element={<PrintView />} />
        {/* andere Routen hier */}
      </Routes>
    </Router>
  );
}

export default App;
