import React, { Fragment } from 'react'
import "./Dformats.css";
import wilcom from "../../../images/wilcom.png";
import emb from "../../../images/emb.png";
import pxf from "../../../images/pxf.png";
import ngs from "../../../images/ngs.png";
import dst from "../../../images/dst.png";
import pes from "../../../images/pes.png";
import cdr from "../../../images/cdr.png";
import eps from "../../../images/eps.png";
import ai from "../../../images/ai.png";
import pdf from "../../../images/pdf.png";
import psd from "../../../images/psd.png";
function Dformats() {
  return (
    <Fragment>
        <div className='dformats container-fluid m-0'>
        <h1>Digitizing Formats We Offer</h1>
        <div className='formats-offer'>
        <div className='format'>
        <div className='format-images w-25'>
        <img src={wilcom} alt='image'/>
        <img src={emb} alt='image'/>
        <img src={ngs} alt='image'/>
        <img src={pxf} alt='image'/>
        <img src={dst} alt='image'/>
        <img src={pes} alt='image'/>
        </div>
        <div className='format-description w-75'>
        <p>We understand that compatibility is key when it comes to embroidery files. That's why we offer a wide range of machine file formats, including Dst, Pes, Pec, Exp, Pxf, Ngs, Toyota, Happy, Emb, Pof, and more. Rest assured, we have the format that suits your machine</p>
        </div>
        
        
        </div>
        <div className='format'>
        <div className='format-description w-75'>
        <p>For your convenience, we also offer <span>vector formats </span>  like Cdr, Ai, Eps, Svg, and others. These scalable formats guarantee sharp, high-quality prints and smooth edges for your designs. </p>
        <p>
        At <span>RAA Digitizing</span>, we are committed to delivering meticulous quality, fast turnaround times, and exceptional customer service. Our team strives to exceed your expectations, ensuring that every project is executed with precision and care. Your satisfaction is our ultimate goal. 
        </p>
        <p>
        Partner with us today and experience the unparalleled expertise and craftsmanship that sets us apart. Let us bring your vision to life and elevate your brand to new heights. 
        </p>
        <p>
        Contact us now to get started on your next embroidery digitizing or vector art project. Your success is our success. 
        </p>
        <p>
        Remember, at RAA Digitizing, our quality is our identity.
        </p>
        </div>
        <div className='format-images w-25'>
         <img src={cdr} alt='image'/>
         <img src={eps} alt='image'/>
         <img src={ai} alt='image'/>
         <img src={pdf} alt='image'/>
         <img src={psd} alt='image'/>
        </div>
        
        </div>
        </div>
        </div>
    </Fragment>
  )
}

export default Dformats