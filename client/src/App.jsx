import React from 'react'
import Home from './pages/Home'
import BuyCredit from './pages/Buycredit'
import Result from './pages/Result'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b frm-teal-50 to-orange-50'>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />{/*here we had kept path="/" as this thing indicates that its the home page */}
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
        
      </Routes>

    </div>
  )
}

export default App
