import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login'
import Medicamentos from './components/Medicamentos/Medicamentos'
import { MedicamentoProvider } from './context/MedicamentoContext'
import MedicamentoCard from './components/Medicamentos/MedicamentoCard'
import { ToastProvider } from './context/ToastContext'
import { ToastContainer } from "react-toastify";

const App: React.FC = () =>  {


  return (
    <ToastProvider>
    <MedicamentoProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/medicamentos" element={<Medicamentos/>}/>
        <Route path="/medicamentos/view" element={<MedicamentoCard/>} />
        <Route path="/medicamentos/edit" element={<MedicamentoCard/>} />
        <Route path="/medicamentos/create" element={<MedicamentoCard/>} />

      </Routes>
    </Router>
    <ToastContainer 
    hideProgressBar={true}
    autoClose={2000}/>
    </MedicamentoProvider>
    </ToastProvider>

  )
}

export default App
