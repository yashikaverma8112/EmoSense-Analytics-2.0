import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookie] = useCookies(['authToken']);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const authToken = document.cookie.split(';').some((item) => item.trim().startsWith('authToken='));
  const handleLogout = () => {

      let expires = new Date();
      setCookie('authToken', '', { path: '/', expires });
    
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 fw-bold w-100 fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand fst-italic fw-bold">
          EmoSense-Analytics
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About Us
              </Link>
            </li>
            
            {!authToken && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </li>
              </>
            )}
            {authToken && (
              <>
              <li className="nav-item">
              <Link to="/predict" className="nav-link">
                Analysis
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
                    <Link to="/login" className="nav-link" onClick={handleLogout}>
                      Logout
                    </Link>
                </li>

              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
