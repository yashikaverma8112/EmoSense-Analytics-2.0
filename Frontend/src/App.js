import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Analysis from "./Analysis";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login";
import Signup from "./Signup";
import Footer from "./Footer";
import ContactUs from "./Contact";
import ForgotPassword from "./ForgotPassword";

function App() {

  return (
    <div className="App">
      <>
      <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/predict" element={<Analysis />}/>
        <Route path="/contact" element={<ContactUs />}/>
        <Route path="/forgot-password/:email" element={<ForgotPassword />}/>
      
      </Routes>
    <Footer />
    </Router>
      </>
    </div>
  );
}

export default App;
