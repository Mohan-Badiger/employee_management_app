import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmpAllList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/employees")
      .then((res) => setEmployees(res.data))
      .catch(() => toast.error("Failed to fetch employees"));
  }, []);

  // delete employee
  const removeEmployee = (id) => {
    axios
      .delete(`http://localhost:8000/employees/${id}`)
      .then(() => {
        toast.success("Employee deleted successfully");
        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      })
      .catch(() => toast.error("Employee not deleted"));
  };

  // edit
  const loadEdit = (id) => navigate(`/empedit/${id}`);  

  // view
  const viewDetail = (id) => navigate(`/empdetails/${id}`);

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-sm p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Management
          </h1>

          <Link
            to="/empcreate"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-sm font-medium transition"
          >
            + Add Employee
          </Link>
        </div>

        {/* Table */}
        {employees && employees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600 text-sm uppercase">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">{emp.id}</td>
                    <td className="p-3">{emp.name}</td>
                    <td className="p-3 text-blue-600">{emp.email}</td>
                    <td className="p-3">{emp.phone}</td>
                    <td className="p-3 capitalize">{emp.gender}</td>

                    <td className="p-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => loadEdit(emp.id)}
                          className="px-3 py-1 text-sm rounded-sm bg-yellow-500 hover:bg-yellow-600 text-white transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => removeEmployee(emp.id)}
                          className="px-3 py-1 text-sm rounded-sm bg-red-500 hover:bg-red-600 text-white transition"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => viewDetail(emp.id)}
                          className="px-3 py-1 text-sm rounded-sm bg-green-500 hover:bg-green-600 text-white transition"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <h2 className="text-xl font-semibold">
              No Employee Data Available
            </h2>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmpAllList;
