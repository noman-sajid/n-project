import React from 'react'
import './OurServices.css'
import OurServiceCard from './OurServiceCard'
import leftchest from '../../../images/ourservices_images/left-chest.png';
import fullback from '../../../images/ourservices_images/full-back.png';
import appliq from '../../../images/ourservices_images/applique-logo.png';
import threedpuff from '../../../images/ourservices_images/3d-puff.png';
import cstitch from '../../../images/ourservices_images/cross-stitch.png';
import hatlogo from '../../../images/ourservices_images/hat-logo.png';
import digiprint from '../../../images/ourservices_images/digi-printing.png';
import screenprint from '../../../images/ourservices_images/screen-printing.png';
import vinylcut from '../../../images/ourservices_images/vinyl-cutting.png';
import colseparation from '../../../images/ourservices_images/color-separation.png';
function Ourservice() {
  return (
    <div className='main-ourservices-wrapper container-fluid m-0 p-0'>
      <div className='our-services-box m-0'>
        <h1 className='text-center os-main-heading m-0'>OUR SERVICES</h1>
        <div className="our-service-cards">
          <div className="row w-100 m-0 p-0">
            <div className="col-lg-4 col-md-6">
              <OurServiceCard os_img={leftchest} os_name="Left Chest Logo" os_description="Enhance your garments with a beautifully embroidered left chest logo, adding a touch of sophistication and professionalism to your apparel. "/>
            </div>
            <div className="col-lg-4 col-md-6">
              <OurServiceCard os_img={fullback} os_name="Full Back Logo" os_description="Make a bold statement with a striking full back logo embroidery. Perfect for jackets, hoodies, and any apparel that demands attention."/>
            </div>
            <div className="col-lg-4 col-md-6">
              <OurServiceCard os_img={appliq} os_name="Applique Logo" os_description="Create a unique and textured look with our applique logo service. Add a pop of color and dimension to your designs."/>
            </div>
            <div className="col-lg-4 col-md-6">
              <OurServiceCard os_img={threedpuff} os_name="3D Puff Logo" os_description="Give your logos a 3-dimensional effect with our 3D puff embroidery. Elevate your designs with a tactile and eye-catching appeal."/>
            </div>
            <div className="col-lg-4 col-md-6">
              <OurServiceCard os_img={cstitch} os_name="Cross Stitch Logo" os_description="Experience the timeless beauty of cross-stitch embroidery. Perfect for adding a touch of tradition and elegance to your designs."/>
            </div>
            <div className="col-lg-4 col-md-6 d-none d-md-block">
              <OurServiceCard os_img={hatlogo} os_name="Hat Logo" os_description="Your brand deserves to stand out, even on hats. Our hat logo embroidery service ensures that your logo pops, making a lasting impression. "/>
            </div>
            <div className="col-lg-4 col-md-6">
              <OurServiceCard os_img={digiprint} os_name="Digital Printing" os_description="Get your designs impeccably printed with our state-of-the-art digital printing services. Vibrant colors and sharp details guaranteed. "/>
            </div>
            <div className="col-lg-4 col-md-6">
              <OurServiceCard os_img={screenprint} os_name="Screen Printing" os_description="For large quantities and cost-effective solutions, our screen printing service offers high-quality results on a wide range of substrates."/>
            </div>
            <div className="col-lg-4 col-md-6">
              <OurServiceCard os_img={vinylcut} os_name="Vinyl Cutting" os_description="Add a personal touch to your projects with our vinyl cutting service. Ideal for custom decals, stickers, and more."/>
            </div>
            <div className="col-lg-4 col-md-6">
              <OurServiceCard os_img={colseparation} os_name="Color Separation" os_description="Achieve stunning printed designs with our expert color separation service. We ensure precise color reproduction and utmost accuracy."/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ourservice;
