import React from 'react'
import './Software.css'
import s_image from '../../../images/software-1.png'
function Software() {
  return (
    <>
    <div className='main-software-comp-div container-fluid m-0 p-0'>
      <div className='software-component'>
      <div className="software-content">
      <h1 className='main-software-heading'>Software</h1>
      <p>
      We leverage the industry's leading embroidery software to bring your designs to life. Our team is proficient in working with Wilcom, Pulse, and Wing XP - ensuring compatibility and excellent results every time. 
      </p>
      </div>
      <div className="s-component-image">
        <img src={s_image} alt="image of a pc" />
      </div>
      </div>
      

      
    </div>
    </>
  )
}

export default Software