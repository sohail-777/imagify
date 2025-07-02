import React from 'react'
import Home from './pages/Home'
import BuyCredit from './pages/Buycredit'
import Result from './pages/Result'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>

      <Routes>

        <Home />
        <BuyCredit />
        <Result />
        
      </Routes>

    </div>
  )
}

export default App
