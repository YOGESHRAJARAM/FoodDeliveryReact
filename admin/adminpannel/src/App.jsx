import React from 'react'
import Navebar from './components/Navbar/Navebar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const url = "https://food-del-backend-9w5x.onrender.com"
  return (
    <>
    <ToastContainer/>
    <Navebar url={url}/>
    <hr/>
    <div className="app-content">
      <Sidebar/>
      <Routes>
        <Route path='/add' element={<Add url={url}/>}/>
        <Route path='/list' element={<List url={url}/>}/>
        <Route path='/orders' element={<Orders url={url}/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
