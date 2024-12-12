import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './Components/Home';
import AddBlood from './Components/AddBlood';
// import Singup from './Components/Singup';
import DonorDetail from './Components/DonorDetail';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addblood" element={<AddBlood />} />
          <Route path="/donordetail/:id" element={<DonorDetail />} />
          {/* <Route path="/signup" element={<Singup />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
