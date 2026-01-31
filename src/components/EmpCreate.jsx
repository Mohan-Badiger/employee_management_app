import React, { useState } from "react";
import "./empcreate.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EmpCreate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const handleGenderChange = (e) => {
    if (e.target.checked) setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, email, phone, gender };

    axios
      .post("http://localhost:8000/employees", payload)
      .then(() => {
        toast.success("Employee created successfully 🚀");
        navigate("/");
      })
      .catch(() => toast.error("Failed to create employee ❌"));
  };

  return (
    <div className="mainBlock">
      <section id="formBlock">
        <article className="glassCard">
          <h1>Create Employee</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="boxset"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              className="boxset"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="boxset"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="radioAndLabel">
              <label>
                <input type="radio" name="gender" value="male" onChange={handleGenderChange} />
                <span>Male</span>
              </label>

              <label>
                <input type="radio" name="gender" value="female" onChange={handleGenderChange} />
                <span>Female</span>
              </label>

              <label>
                <input type="radio" name="gender" value="others" onChange={handleGenderChange} />
                <span>Others</span>
              </label>
            </div>

            <input type="submit" value="Create Employee" className="submitting" />

            <Link to="/" className="backhome">
              ← Back to Home
            </Link>
          </form>
        </article>
      </section>
    </div>
  );
};

export default EmpCreate;
