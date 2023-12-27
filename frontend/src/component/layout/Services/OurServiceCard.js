import React from 'react'
import './OurServiceCard.css'
function OurServiceCard(props) {
  return (
    <div className='digitizing-service-card'>
     <div className='our-service-img'>
     <img src={props.os_img} alt="image" />
     </div>
     <div className="our-service-name">
     <h1>{props.os_name}</h1>
     </div>
     <div className="our-service-description">
     <p>{props.os_description}</p>
     </div>
    </div>
  )
}

export default OurServiceCard