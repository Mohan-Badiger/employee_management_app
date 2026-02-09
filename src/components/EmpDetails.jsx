import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmpDetails = () => {
  const [emp, setEmp] = useState({});
  const { eid } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/employees/${eid}`)
      .then((res) => setEmp(res.data))
      .catch(() => toast.warning("Employee not found"));
  }, [eid]);

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-sm shadow-lg p-6">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Employee Details
        </h1>

        <hr className="mb-4" />

        {/* Details */}
        <div className="space-y-3 text-gray-700">
          <p className="flex justify-between">
            <span className="font-semibold">Name</span>
            <span>{emp.name}</span>
          </p>

          <p className="flex justify-between">
            <span className="font-semibold">Email</span>
            <span className="text-blue-600">{emp.email}</span>
          </p>

          <p className="flex justify-between">
            <span className="font-semibold">Phone</span>
            <span>{emp.phone}</span>
          </p>

          <p className="flex justify-between">
            <span className="font-semibold">Gender</span>
            <span className="capitalize">{emp.gender}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-sm transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmpDetails;
