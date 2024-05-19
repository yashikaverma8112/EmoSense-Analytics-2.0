import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary py-4 text-light">
      <div className="container">
        <div className="row ">
          <div className="col-lg-6">
            <div className="text-sm">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-light">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="text-light">About</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-light">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-sm">
              <h5>Contact Us</h5>
              <p>Email: info@emosense.com</p>
              <p>Phone: 123-456-7890</p>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-12">
            <p className="text-center">&copy; 2024 EmoSense Analytics. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
