import React, { useState } from "react";
import axios from 'axios';

const Contact = () => {
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    to: "",
    name: "",
    number: "",
    description: ""
  });


  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!user.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!user.to.trim()) {
      newErrors.to = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(user.to)) {
      newErrors.to = 'Email is invalid';
      isValid = false;
    }

    if (!user.number.trim()) {
      newErrors.number = 'Contact number is required';
      isValid = false;
    }

    if (!user.description.trim()) {
      newErrors.description = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setMsg('');
  };
  const onSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
    axios.post('http://localhost:80/contact', user)
    .then(response => {
      setUser({
        to: "",
        name: "",
        number: "",
        description: ""
      });
    });
    setMsg("Email Sent Successfully !!");
  }
  };

  return (
<div className="container mt-5 mb-5" style={{ position: "relative", paddingTop: "70px" }}>
  <div className="row justify-content-center">
    <div className="col-lg-6 fw-bold">
      <form>
        <div className="form-group">
          <label>Your Name:</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Name"
            name="name"
            onChange={onInputChange}
            value={user.name}
            style={{ backgroundColor: "#f8f9fa", border: "1px solid #ced4da" }}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label>Your Email:</label>
          <input
            type="email"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Email"
            name="to"
            onChange={onInputChange}
            value={user.to}
            style={{ backgroundColor: "#f8f9fa", border: "1px solid #ced4da" }}
          />
           {errors.to && <div className="invalid-feedback">{errors.to}</div>}
        </div>
        <div className="form-group">
          <label>Your Contact Number:</label>
          <input
            type="number"
            className={`form-control ${errors.number ? 'is-invalid' : ''}`}
            placeholder="Contact Number"
            name="number"
            onChange={onInputChange}
            value={user.number}
            style={{ backgroundColor: "#f8f9fa", border: "1px solid #ced4da" }}
          />
            {errors.number && <div className="invalid-feedback">{errors.number}</div>}
        </div>
        <div className="form-group">
          <label>Your Message:</label>
          <textarea
             className={`form-control ${errors.number ? 'is-invalid' : ''}`}
            placeholder="Description"
            name="description"
            onChange={onInputChange}
            value={user.description}
            style={{ backgroundColor: "#f8f9fa", border: "1px solid #ced4da" }}
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        <p style={{ color: "green" }}><b>{msg}</b></p>
        <button onClick={onSubmit} className="btn btn-primary btn-block" style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}>Send Mail</button>
      </form>
    </div>
  </div>
</div>

  

  );
};

export default Contact;
