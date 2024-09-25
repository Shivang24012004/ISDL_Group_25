import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import TempShow from "./pages/TempShow"
import TempShow2 from './pages/TempShow2';
import Login from './pages/Login.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login />} />
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/filters" element={<TempShow></TempShow>}></Route>
        <Route path="/filters2" element={<TempShow2></TempShow2>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
