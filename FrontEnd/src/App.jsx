import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import TempShow from "./pages/TempShow"
import TempShow2 from './pages/TempShow2';
import TempShow3 from './pages/TempShow3';
import DashBoard from './pages/DashBoard';
import Layout from './pages/layout';
import  Sidebar  from '@/components/Sidebar';

function App() {

  return (
    <BrowserRouter>
    {/* <Layout> */}
    <div className='flex mt-2'>

    <Sidebar />
      <Routes>
        <Route path='/' element={<DashBoard />}></Route>
        <Route path="/filter" element={<About></About>}></Route>
        <Route path="/filters" element={<TempShow></TempShow>}></Route>
        <Route path="/filters2" element={<TempShow2></TempShow2>}></Route>
        <Route path="/filters3" element={<TempShow3></TempShow3>}></Route>
      </Routes>
    </div>
    {/* </Layout> */}
    </BrowserRouter>
  )
}

export default App