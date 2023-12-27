import React from 'react'
import './HomeSections.css'
import home01 from '../../images/home-01.png'
function Homesection1() {
  return (
    <div className='container-fluid m-0 p-0 home-section-1-main bg-dark'>
     <div className='home-section-1'>
      <div className='home-section-1-image'>
       <img src={home01} alt="image" />
      </div>
      <div className='home-section-1-content'>
        <h1 className='home-section-1-heading'>
        Get Your Embroidery Designs Digitized with the Best in the Industry
        </h1>
        <div className='home-section-1-subject'>
          <p>
          Looking for high-quality embroidery digitizing services? Look no further than RAA Digitizing. We are a leading provider of embroidery digitizing services, and we offer a wide range of services to meet your needs.
          </p>
          <p>
          Whether you need a simple logo digitized or a complex design, we can help. We have a team of experienced digitizers who are experts in creating high-quality embroidery files. We also offer a variety of add-on services, such as color separation and digitizing for multiple machines.
          </p>
          <p>
          We understand that embroidery digitizing can be a complex process, and that's why we make it easy for you. We offer a simple online ordering system, and we have a dedicated customer service team that is available to answer your questions.
          </p>
          <p>
          We are also committed to providing affordable embroidery digitizing services. We know that you have a budget to stick to, and we work with you to find a solution that fits your needs.
          </p>
          <p>
          So if you're looking for the best in embroidery digitizing services, look no further than RAA Digitizing. We offer high-quality, affordable services that are sure to meet your needs.
          </p>
        </div>

      </div>
     </div>
    </div>
  )
}

export default Homesection1