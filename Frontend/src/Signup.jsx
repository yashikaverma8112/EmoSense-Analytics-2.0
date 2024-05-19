
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:80/api/signup',{
                        name,
                        email,
                        password
    })
                                .then(res=>{
                                  
                                  console.log('Email:', email, 'Password:', password);
                                  navigate('/login')
                                })
                                .catch(error=>{
                                  console.log(error)
                                })
          console.log(response)
  };

  return (
    <div className="container vh-100  "style={{ position: "relative", paddingTop: "70px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow">
            <div className="card-header">
              <h3 className="text-center">Sign Up</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
