import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Filter from './pages/Filter';
import TempShow from "./pages/TempShow"
import TempShow2 from './pages/TempShow2';
import TempShow3 from './pages/TempShow3';
import DashBoard from './pages/DashBoard';
import Layout from './pages/layout';
import  Sidebar  from '@/components/Sidebar';
import Profile from './pages/Profile';
import DocumentationPage from './pages/Documentation';
import AboutUsPage from './pages/AboutPage';
import LoginPage from './pages/Login';
import { Toaster } from './components/ui/toaster';
import SignupPage from './pages/Signup';
import ProtectedRoute from './components/Auth';
import Navbar from './components/Navbar';
import Error404 from './pages/Error404';


//   const location = useLocation();
//   const isLoginPage = location.pathname === '/login';
//   return (
//     <BrowserRouter>
//     {/* <Layout> */}
//     <div className='flex mt-2'>

//     {!isLoginPage && <Sidebar />}
//     <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path='/' element={<DashBoard />}></Route>
//         <Route path="/filter" element={<Filter />}></Route>
//         <Route path="/filters" element={<Profile />}></Route>
//         <Route path="/documentation" element={<DocumentationPage />}></Route>
//         <Route path="/about" element={<AboutUsPage />}></Route>
//         <Route path="/filters2" element={<TempShow2></TempShow2>}></Route>
//         <Route path="/filters3" element={<TempShow3></TempShow3>}></Route>
//       </Routes>
//     </div>
//     {/* </Layout> */}
//     </BrowserRouter>
//   )
// }

function LayoutWithSidebar({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-10">
        {children}
      </div>
    </div>
  );
}

function MainContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/docs';

  return (
    <Routes>
      {isLoginPage ? (
        <>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/docs" element={
          <>
          <Navbar />
          <DocumentationPage />
          </>} />
  
        </>
      ) : (
        <Route
          path="*"
          element={
            <LayoutWithSidebar>
              <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
        <Route path='/' element={<DashBoard />}></Route>
        <Route path="/filter" element={<Filter />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        </Route>
        <Route path="/documentation" element={<DocumentationPage />}></Route>
        <Route path="/about" element={<AboutUsPage />}></Route>
        <Route path="/filters2" element={<TempShow2></TempShow2>}></Route>
        <Route path="/filters3" element={<TempShow3></TempShow3>}></Route>
        <Route path='*' element = {<Error404 />} />
      </Routes>
            </LayoutWithSidebar>
          }
        />
      )}
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainContent />
      <Toaster />
      

    </BrowserRouter>
  );
}

