import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['authToken']);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:80/api/login' ,{
                      email,
                      password
    })
                                .then(res =>{
                                  let expires = new Date()
                                  expires.setTime(expires.getTime() + (1000 * 60 * 60))
                                  console.log(res.data.authToken);
                                  setCookie('authToken', res.data.authToken, { path: '/',  expires})
                                  navigate('/predict')
                                  console.log('Email:', email, 'Password:', password);  
                                })
                                .catch(error => {
                                  console.log(error);
                                });
                                console.log(response);
  };

  return (
    <div className="container vh-100" style={{ position: "relative", paddingTop: "70px" }}>
      <div className="row justify-content-center ">
        <div className="col-md-6 ">
          <div className="card mt-5 shadow">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
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

                <div className="text-center d-flex justify-content-between">
                
   {email !=='' ?
      <button className="btn btn-outline-light" >
      <Link to ={ `/forgot-password/${email}`}>  Forgot Password?</Link>
        
      </button>
      
      :
      <button className="btn btn-outline-light" >
      <Link to = '/login' onClick={()=>{alert('Please Write Valid Email')}}>  Forgot Password?</Link>
        
      </button>
      

    }

                  <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
                    Login
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
