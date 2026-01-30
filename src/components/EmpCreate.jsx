import React, { useState } from 'react'
import "./empcreate.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const EmpCreate = () => {
    const[name , setName]=useState("");
    const[email , setEmail]=useState("");
    const[phone , setPhone]=useState("");
    const[gender , setGender]=useState("");


    const navigate = useNavigate();

    let handleGenderChange = e=>{
        if(e.target.checked == true)
        {
            setGender(e.target.value);
        }
    };

    let handleSubmit = e=>{
        e.preventDefault();
        // console.log(name , email , phone , gender);
        let payload ={name , email , phone , gender};

        axios.post("http://localhost:8000/employees" , payload)
        .then(()=>{toast.success("employee data created successfully");
            navigate("/");
        })
        .catch(()=>toast.error("employee data not created"));
    }
  return (
    <div className="mainBlock">
        <section id='formBlock'>

        <article>
            <h1>Create An Employee</h1>
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
                <input type="submit" value="Create Employee" className='submitting'/>
                <Link to="/" className='backhome'>Back to Home page</Link>
            </form>
        </article>
    </section>
    </div>
  )
}

export default EmpCreate