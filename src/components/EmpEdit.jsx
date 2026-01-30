import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const EmpEdit = () => {
      const[name , setName]=useState("");
      const[email , setEmail]=useState("");
      const[phone , setPhone]=useState("");
      const[gender , setGender]=useState("");
  
  const {eid} = useParams();
  // console.log(eid);
  let navigate = useNavigate();

  //! to fetch and populate the data inside the form inputs
  useEffect(()=>{
   axios.get("http://localhost:8000/employees/"+eid)
   .then(res=>{
    console.log(res.data.name);
      setName(res.data.name);
      setEmail(res.data.email);
      setPhone(res.data.phone);
   })
    .catch(err=>console.log(err))
  },[])

  const handleSubmit=e=>{
    e.preventDefault();
    let payload = {name , email , phone , gender};
    axios.put("http://localhost:8000/employees/"+eid , payload).then(res=>{
        toast.success("employee updated successfully");
        navigate("/");
    })
    .catch(()=>toast.error("employee not updated"))
  };

     let handleGenderChange = e=>{
        if(e.target.checked == true)
        {
            setGender(e.target.value);
        }
    };
  return (
    <div className="mainBlock">
        <section id='formBlock'>

        <article>
            <h1>Update An Employee</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='enter username' 
                className='boxset'
                value={name}
                onChange={e=>setName(e.target.value)}
                />
                <br />
                <input type="email" placeholder='enter email'
                className='boxset'
                 value={email}
                onChange={e=>setEmail(e.target.value)}
                />
                <br />
                <input type="tel" placeholder='enter phone number'
                className='boxset'
                 value={phone}
                onChange={e=>setPhone(e.target.value)}
                />
                <br />
                <div className="radioAndLabel">
                <input type="radio" name='gender' value="male" onChange={handleGenderChange}/>Male 
                <input type="radio" name='gender' value="female" onChange={handleGenderChange}/>Female 
                <input type="radio" name='gender' value="others" onChange={handleGenderChange}/>Others
                </div>
                <br />
                <input type="submit" value="Update Employee" className='submitting'/>
                <Link to="/" className='backhome'>Back to Home page</Link>
            </form>
        </article>
    </section>
    </div>
  )
}

export default EmpEdit