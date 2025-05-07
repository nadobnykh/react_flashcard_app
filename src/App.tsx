import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import StartPage from './pages/StartPage'
import PrintView from './pages/PrintView'

function App() {
  return (
    <div className="p-4">
      <nav className="space-x-4">
        <Link to="/">Startseite</Link>
        <Link to="/print">Druckansicht</Link>
      </nav>

      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/print" element={<PrintView />} />
      </Routes>
    </div>
  )
}

export default App
