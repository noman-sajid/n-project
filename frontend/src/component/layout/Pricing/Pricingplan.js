import React from 'react'
import './Pricingplan.css'
function Pricingplan() {
  return (
   <div className="container-fluid m-0 p-0 pricingplan-main-container">
     <div className="pricingplan-header">
            <h1>PRICING</h1>            
            <p>We are offering very cheap rates to our precious clients.</p>
            <p>We have 2 price plans for our valuable customer.</p>
     </div>
     <div className='pricing-plans'>
      <div className='plan1'>
      <h1>Basic</h1>
      <div className='plan1-content'>
      <p className='p-2'>We are offering flat fix rates to our small scale business’s customers.</p>
      <div className='pricing text-center'>
      <div className='bg-success text-light pt-2 pb-2'>
      <p>Left Chest Upto 5"</p>
      <p>$10</p>
      </div>
      <div className='bg-warning text-dark pt-2 pb-2'>
      <p>Full Back</p>
      <p>$20</p>
      </div>
      <div className='bg-success text-light pt-2 pb-2'>
      <p>Vector Art</p>
      <p>$10 (Per 2 hour)</p>
      </div>
      <div className='bg-warning text-dark pt-2 pb-2'>
      <p>Color Separations</p>
      <p>$15 (Per 2 hour)</p>
      </div>
      </div>
      </div>
      </div>
      <div className='plan2'>
        <h1>Business</h1>
        <div className='plan2-content'>
        <p className='p-2'>We are offering to our large scale business’s customer’s $1/1000 stitches.</p>
        <div className='pricing text-center'>
      <div className='bg-success text-light pt-2 pb-2'>
      <p>Upto 5000 Stitches</p>
      <p>$5</p>
      </div>
      <div className='bg-warning text-dark pt-2 pb-2'>
      <p>Vector Art Services</p>
      <p>$5 / hour</p>
      </div>
      <div className='bg-success text-light pt-2 pb-2'>
      <p>Color Separation</p>
      <p>$8 / hour</p>
      </div>
      </div>
      </div>
      </div>

     </div>
   </div>
  )
}

export default Pricingplan