import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmpDetails = () => {
  const[emp , setEmp] = useState({});
  // console.log(emp);
  const {eid} = useParams();
  useEffect(()=>{
    axios.get("http://localhost:8000/employees/"+eid)
    .then(res=>{
      setEmp(res.data);
    })
    .catch(error=>toast.warning("employee not found"))
  },[])

  return (
    <div>
      <h1>View Employee Data</h1>
      <hr />
      <h2>Employee Name : {emp.name}</h2>
      <h2>Employee Email : {emp.email}</h2>
      <h2>Employee Phone : {emp.phone}</h2>
      <h2>Employee Gender : {emp.gender}</h2>
      <Link to='/'>Back to Homepage </Link>
    </div>
  )
}

export default EmpDetails