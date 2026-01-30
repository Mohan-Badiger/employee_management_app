import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import EmpAllList from './components/EmpAllList';
import EmpCreate from './components/EmpCreate';
import EmpEdit from './components/EmpEdit';
import EmpDetails from './components/EmpDetails';
const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<EmpAllList/>}/>
      <Route path='/empcreate' element={<EmpCreate/>}/>
      <Route path='/empedit/:eid' element={<EmpEdit/>}/>
      <Route path='/empdetails/:eid' element={<EmpDetails/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App