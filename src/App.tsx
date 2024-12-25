import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login'
import Medicamentos from './components/Medicamentos/Medicamentos'
import { MedicamentoProvider } from './context/MedicamentoContext'
import MedicamentoCard from './components/Medicamentos/MedicamentoCard'

const App: React.FC = () =>  {


  return (
    <MedicamentoProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/medicamentos" element={<Medicamentos/>}/>
        <Route path="/medicamentos/view" element={<MedicamentoCard/>} />
      </Routes>
    </Router>
    </MedicamentoProvider>

  )
}

export default App
