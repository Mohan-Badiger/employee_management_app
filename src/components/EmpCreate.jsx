import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EmpCreate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !gender) {
      toast.error("All fields are required");
      return;
    }

    const payload = { name, email, phone, gender };

    axios
      .post("http://localhost:8000/employees", payload)
      .then(() => {
        toast.success("Employee created successfully");
        navigate("/");
      })
      .catch(() => toast.error("Employee data not created"));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Employee
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Gender
            </label>
            <div className="flex gap-4">
              {["male", "female", "others"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 cursor-pointer text-gray-700"
                >
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
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-sm font-semibold transition"
          >
            Create Employee
          </button>

          {/* Back */}
          <Link
            to="/"
            className="block text-center text-sm text-gray-500 hover:text-blue-600 transition"
          >
            ← Back to Home
          </Link>
        </form>
      </div>
    </section>
  );
};

export default EmpCreate;
