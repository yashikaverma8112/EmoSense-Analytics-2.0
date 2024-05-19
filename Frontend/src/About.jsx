import React from 'react'
import './CSS/about.css'
import { Link } from 'react-router-dom'
const About = () => {
  const authToken = document.cookie.split(';').some((item) => item.trim().startsWith('authToken='));
  return (
    <>

      <section id="about" style={{ position: "relative", paddingTop: "70px" }}>
        <div className="container">

          <header className="section-header text-center mb-5 pb-2">
            <h3>About Us</h3>
            <p className="text-lg text-gray-700 mb-8 text-center">Welcome to EmoSense Analytics! Our cutting-edge Sentiment Analysis Tool has been meticulously trained on a vast dataset of over 50,000 records. Leveraging state-of-the-art techniques, it delivers insightful sentiment analysis results. With an impressive accuracy rate of 87%, our tool empowers users to glean valuable insights into audience sentiments, enabling informed decision-making and enhanced understanding of public opinion in the dynamic world of cinema.</p>
          </header>
          <div className="row about-cols">

            <div className="col-md-4 wow fadeInUp">
              <div className="about-col">
                <div className="img">
                  <img src="img/about-mission.webp" alt="" className="img-fluid" />
                  <div className="icon"><i className="ion-ios-speedometer-outline"></i></div>
                </div>
                <h2 className="title">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-8 text-center">Our tool uses advanced NLP
                  techniques and Deep Learning algorithm such as - LSTM, GRU to analyze the text of movie reviews. It can identify the overall sentiment of a review
                  (positive, negative) and provide you with detailed insights into the emotions and opinions
                  expressed by the reviewers.</p>
              </div>
            </div>

            <div className="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
              <div className="about-col">
                <div className="img">
                  <img src="img/about-plan.webp" alt="" className="img-fluid" />
                  <div className="icon"><i className="ion-ios-list-outline"></i></div>
                </div>
                <h2 className="title">Our Plan</h2>
                <p className="text-center">
                  We Plan to integrate Artificial Intelligence to analyse sentiments of Movie Reviews. Identify pain-points and detect patterns in viewers needs and behavior. Quickly detect negative Review and take action instantly. Know how your customers feel, and what they talk about
                </p>
              </div>
            </div>


            <div className="col-md-4 wow fadeInUp" data-wow-delay="0.2s">
              <div className="about-col">
                <div className="img">
                  <img src="img/about-vision.webp" alt="" className="img-fluid" />
                  <div className="icon"><i className="ion-ios-eye-outline"></i></div>
                </div>
                <h2 className="title">Our Vision</h2>
                <p className="text-center">
                  Our goal is to provide you with a powerful tool to analyze the sentiments expressed in movie reviews. Whether you're a movie enthusiast, a filmmaker, or a researcher, our tool can help you gain valuable insights into audience reactions and trends with EmoSense Analytics.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section id="call-to-action" className="wow fadeIn">
        <div className="container text-center">
          <h3>Having Problems in Analysing Movie Review?</h3>
          <p className="text-center">
            With EmoSense Analytics you can analyse sentiment/emotions of Movie Reviews</p>
          {!authToken && (

            <Link className="cta-btn" to='/login  '>
              Get Started
            </Link>
          )}
          {authToken && (
            <Link className="cta-btn" to='/predict'>
              Get Started
            </Link>
          )}

        </div>
      </section>


    </>
  )
}

export default About