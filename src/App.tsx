import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login'
import Medicamentos from './components/Medicamentos/Medicamentos'

const App: React.FC = () =>  {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/medicamentos" element={<Medicamentos/>}/>
      </Routes>
    </Router>
  )
}

export default App
