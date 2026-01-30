import React, { useEffect, useState } from "react";
import "./empAll.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmpAllList = () => {
  const [employees, setEmployees] = useState([]);
  // console.log(employees);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/employees")
    .then(res=>{
      setEmployees(res.data);
    }).catch(err=>console.log(err))
  }, []);

  //! for remove/delete inidividual employee data
  const removeEmployee = (id) => {
      // console.log(id);
      axios.delete("http://localhost:8000/employees/"+id).then(_=>{
        toast.success("Employee deleted successfully");
        setTimeout(()=>{
          window.location.reload();
        },1500)
      })
      .catch(_=>toast.error("employee not deleted"))
  };

  //! for editing individual employee data
  const loadEdit =(id) =>{
    // console.log(id);
    // console.log("/empedit/"+id);
    navigate("/empedit/"+id);
  };

  //!for viewing single employee data
  const viewDetail=id=>{
    navigate("/empdetails/"+id);
  }
  return (
    <section id="listOfAllEmp">
      <article>
        <h1>All Employee Lists</h1>

        <div className="createBtn">
            <Link to="/empcreate">Add Employee +</Link>
        </div>
       {
        employees && employees.length > 0 ? ( <table>
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => {
              return (
                <tr key={i}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.gender}</td>
                  <td>
                    <button className="btn btn-edit" onClick={()=>loadEdit(emp.id)}>Edit</button>

                    <a className="btn btn-delete" onClick={()=>removeEmployee(emp.id)}>Delete</a>
                    <a className="btn btn-view" onClick={()=>viewDetail(emp.id)}>View Details</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>) : <h1>No Employee Data available</h1>
       }
      </article>
    </section>
  );
};

export default EmpAllList;
