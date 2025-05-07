import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import StartPage from './pages/StartPage'
import PrintView from './pages/PrintView'

function App() {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/print" element={<PrintView />} />
      </Routes>
    </div>
  )
}

export default App
