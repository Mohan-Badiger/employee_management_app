import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmpEdit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const { eid } = useParams();
  const navigate = useNavigate();

  // Fetch & populate employee data
  useEffect(() => {
    axios
      .get(`http://localhost:8000/employees/${eid}`)
      .then((res) => {
        const emp = res.data;
        setName(emp.name);
        setEmail(emp.email);
        setPhone(emp.phone);
        setGender(emp.gender); // ✅ FIXED
      })
      .catch(() => toast.error("Employee not found"));
  }, [eid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !gender) {
      toast.error("All fields are required");
      return;
    }

    const payload = { name, email, phone, gender };

    axios
      .put(`http://localhost:8000/employees/${eid}`, payload)
      .then(() => {
        toast.success("Employee updated successfully");
        navigate("/");
      })
      .catch(() => toast.error("Employee not updated"));
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-sm shadow-lg p-6">

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Employee
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-blue-500"
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Enter phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-sm focus:ring-2 focus:ring-blue-500"
          />

          {/* Gender */}
          <div className="flex gap-4">
            {["male", "female", "others"].map((g) => (
              <label key={g} className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                  className="accent-blue-600"
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-sm font-semibold transition"
          >
            Update Employee
          </button>

          {/* Back */}
          <Link
            to="/"
            className="block text-center text-sm text-gray-500 hover:text-blue-600"
          >
            ← Back to Home
          </Link>
        </form>
      </div>
    </section>
  );
};

export default EmpEdit;
