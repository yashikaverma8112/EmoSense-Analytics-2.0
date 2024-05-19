import React from 'react'
import './CSS/Home.css'
import './CSS/about.css'
const Home = () => {
  return (
    <>
    <div className="container-fluid p-0" >
      <div className="position-relative vh-75" style={{ background: "url('https://source.unsplash.com/random') no-repeat", backgroundSize: "cover" }} >
        <div className="position-absolute top-0 w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} ></div>
        <div className="container py-5" >
          <div className="row justify-content-center align-items-center">
            <div className="col-md-8 text-center text-white">
              <h1 className="fw-bold fs-3" style={{ marginTop: "100px" }}>
                Delve into the emotional ocean hidden within the words 😊
              </h1>
              <p className="mt-3 fs-5">
                Welcome to our Movie Review Sentiment Analysis Tool! At EmoSense Analytics, we are passionate about movies and technology. Our goal is to provide you with a powerful tool to analyze the sentiments expressed in movie reviews. Whether you're a movie enthusiast, a filmmaker, or a researcher, our tool can help you gain valuable insights into audience reactions and trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div className="container my-5">
      <div className="row">
        <div className="col-sm-6">
          <img src="https://i.ibb.co/r7ZGsym/undraw-Data-points-re-vkpq.png" alt="description-pic" className="img-fluid" />
        </div>
        <div className="col-sm-6 mt-5">
          <h3 className="text-primary fw-bold mb-4">Why choose EmoSense Analytics</h3>
          <ul className="list-unstyled">
            <li>Quickly detect negative reviews & respond instantly 👍</li>
            <li>Generate Analysis in form of Pie Chart for bulk Data 👍</li>
            <li>Tested on 10,000+ Movie Reviews with an accuracy of around 87% 👍</li>
            <li>Deep Learning Model is Trained over 50,000 movie reviews 👍</li>
            <li>Know your viewers are most happy or unhappy about. 👍</li>
          </ul>
        </div>
      </div>
    </div>
  
    <div className="container my-5">
    <h2 className="text-center text-secondary mb-4">Benefits of Our Tool</h2>
    <div className="row justify-content-center">
      <div className="col-md-4 mb-3 d-flex">
        <div className="border shadow bg-light rounded p-3 hover-effect flex-grow-1">
          <strong className="m-3">Understand Audience :</strong>
          <p className="m-3">Gain insights into audience sentiments surrounding movies, allowing for a deeper understanding of their emotions and reactions. Understand the nuances of audience feedback, helping to tailor strategies and content to better resonate with viewers.</p>
        </div>
      </div>
      <div className="col-md-4 mb-3 d-flex">
        <div className="border shadow bg-light rounded p-3 hover-effect flex-grow-1">
          <strong className="m-3">Improve Marketing :</strong>
          <p className="m-3">Enhance your marketing strategies by refining your approach and effectively targeting your audience. Increase engagement and drive conversions with tailored content and targeted campaigns.</p>
        </div>
      </div>
      <div className="col-md-4 mb-3 d-flex">
        <div className="border shadow bg-light rounded p-3 hover-effect flex-grow-1">
          <strong className="m-3">Research and Analysis:</strong>
          <p className="m-3">Researchers and analysts can leverage our tool to delve into the nuances of movie reviews and audience preferences, uncovering valuable insights and trends. Gain a comprehensive understanding of audience sentiments and preferences.</p>
        </div>
      </div>
    </div>
  </div>
  
    {/* <div className="container-fluid p-0">
      <div className="monster">
        <div className="over-images">
          <div className="over-image">
            <div className="separate-images">
              <img src="https://uxfoundation.files.wordpress.com/2016/02/monster.png" alt="monster" className="main-image" /><br />
              <img src="https://uxfoundation.files.wordpress.com/2016/02/monster-reflect.png" alt="monster-reflect" className="reflection-image" />
            </div>
          </div>
        </div>
      </div>
    </div> */}
  </>
  
  )
}

export default Home