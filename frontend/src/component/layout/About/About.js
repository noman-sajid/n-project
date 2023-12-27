import "./aboutSection.css";
import React, { Fragment } from 'react';
import abimg1 from '../../../images/aboutimg1.jpeg';
import abimg2 from '../../../images/aboutimg2.jpeg';

function About() {
  return (
    <Fragment>
        <div className="container-fluid m-0 p-0 about">
           <div className="about-us-header p-2">
           <div className="about-us-heading">
           <h1>ABOUT US</h1>
           <p>Our design philosophy sets us apart from others, as we prioritize two key principles: simplicity and clarity.</p>
           </div>
           </div>
           <div className="company-intro">
           <h1>WHO WE ARE</h1>
           <hr className="hr1"/>
           <p>Welcome to RAA Digitizing, We are one-stop-shop for all your embroidery digitizing needs. Our company is committed to providing high-quality digitized embroidery designs & graphics designs to help businesses and individuals showcase their brand and creativity.</p>
           </div>
           <div className="about-us">
            <div className="about-us-text">
            <h2>ABOUT OUR COMPANY</h2>
            <p>Welcome to <span className="raa">RAA Digitizing</span> - Your Premier Destination for Premium Embroidery Digitizing & Vector Art Services. </p>
            <p>At RAA Digitizing, we take immense pride in offering the world's best embroidery digitizing and vector art services. With over 15 years of experience in the industry, we have earned a stellar reputation for delivering top-notch quality and exceptional craftsmanship. 
            </p>
            <p>
            Our team of highly skilled and experienced digitizers and designers are truly the backbone of our success. Their passion for their craft and unwavering attention to detail ensure that every design we create is a masterpiece in itself. With their expertise, we bring your ideas to life, transforming them into stunning embroidered or printed masterpieces. 
            </p>
            </div>
            <div className="about-us-images">
            <img src={abimg1} alt='image' className="image"/>
            <img src={abimg2} alt='image' className="image"/>
            </div>
           </div>
           <div className="standards m-0">
           <h5>Our Standards</h5>
           <p>If it is necessary,
              we have the ability to visualize it</p>
            <div className="rules">
            <div className="rule">
            <i class="fa-brands fa-artstation fa-3x"></i>
            <p>Keep it simple</p>
            </div>
            <div className="rule">
            <i class="fa-solid fa-wand-sparkles fa-3x"></i>
            <p>Best and unique</p>
            </div>
            <div className="rule">
            <i class="fa-solid fa-lightbulb fa-3x"></i>
            <p>Love our work</p>
            </div>
            </div>
           </div>
        </div>
    </Fragment>
  )
}

export default About