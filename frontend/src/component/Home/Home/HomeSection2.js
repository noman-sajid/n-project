import React from 'react'
import './HomeSections.css'
import home02 from '../../images/home-02.png'
function HomeSection2() {
  return (
    <div className='container-fluid m-0 p-0 home-section-2-main'>
    <div className='home-section-2'>
        <div className='home-section-2-content'>
        <h1 className='home-section-2-heading'>
        Get Your Vector Art Digitized with Our Professional Team
        </h1>
        <div className='home-section-2-subject'>
        <p>
        Looking to digitize your vector art? We can help! Our team of professional vector artists has years of experience digitizing vector art for a variety of clients. We can digitize your art into any format you need, including embroidery files, EPS files, and SVG files.
        </p>
        <p>
        We understand that vector art can be complex, and that's why we take the time to understand your needs and create a custom solution for you. We will work with you to ensure that your vector art is digitized accurately and to your specifications.
        </p>
        <p>
        We are also committed to providing affordable vector art digitizing services. We know that you have a budget to stick to, and we work with you to find a solution that fits your needs. So if you're looking for professional vector art digitizing services, look no further than RAA Digitizing. We offer high-quality, affordable services that are sure to meet your needs.
        </p>
        </div>
        </div>
        <div className='home-section-2-img'>
         <img src={home02} alt="image" />
        </div>
    </div>
    </div>
  )
}

export default HomeSection2