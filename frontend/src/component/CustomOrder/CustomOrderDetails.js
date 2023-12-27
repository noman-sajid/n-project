import React, { Fragment, useEffect, useState } from "react";
import "./CustomOrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getCustomOrderDetails,
  newReview,
} from "../../actions/customOrderAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";




const CustomOrderDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { customOrder, loading, error } = useSelector(
    (state) => state.customOrderDetails
  );



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

  
    dispatch(getCustomOrderDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert,]);

  return (
    
      <>
      <div className='container-fluid'>
      <div className="custom-order-details-main">
      <h1 className='codetails-heading'>Custom Order Details</h1>
      <div className='codetails-section'>
          <div className='single-detail sd-one'>
              <p className='single-detail-heading'>Name</p>
              <p className='single-detail-text'>{customOrder.name}</p>
          </div>
          <div className='single-detail sd-two'>
              <p className='single-detail-heading'>Email Address</p>
              <p className='single-detail-text w-75'>{customOrder.email}</p>
          </div>
          <div className='single-detail sd-one 0'>
              <p className='single-detail-heading'>Phone Number</p>
              <p className='single-detail-text '>{customOrder.phone}</p>
          </div>
          <div className='single-detail sd-two 0'>
              <p className='single-detail-heading'>Logo Name</p>
              <p className='single-detail-text '>{customOrder.logoName}</p>
          </div>
          <div className='single-detail sd-one 0'>
              <p className='single-detail-heading'>Required Format</p>
              <p className='single-detail-text '>{customOrder.format}</p>
          </div>
          <div className='single-detail sd-two'>
              <p className='single-detail-heading'>Software</p>
              <p className='single-detail-text '>{customOrder.software}</p>
          </div>
          <div className='single-detail sd-one'>
              <p className='single-detail-heading'>Dimensions</p>
              <p className='single-detail-text '>{customOrder.dimensions}</p>
          </div>
          <div className='single-detail sd-two'>
              <p className='single-detail-heading'>Required Color</p>
              <p className='single-detail-text '>{customOrder.requiredColors}</p>
          </div>
          <div className='single-detail sd-one'>
              <p className='single-detail-heading'>Number of Colors</p>
              <p className='single-detail-text '>{customOrder.numberOfColors}</p>
          </div>
          <div className='single-detail sd-two'>
              <p className='single-detail-heading'>Center Point</p>
              <p className='single-detail-text'>{customOrder.centerPoint}</p>
          </div>
          <div className='single-detail sd-one w-100'>
              <p className='single-detail-heading'>Comments</p>
              <p className='single-detail-text w-75'>{customOrder.remarks}</p>
          </div>
          <div className='single-detail sd-two w-100'>
              <p className='single-detail-heading'>Remarks</p>
              <p className='single-detail-text w-75'>{customOrder.description}</p>
          </div>
          <div className='single-detail sd-one w-100 image-section'>
              <p className='single-detail-heading'>Art Work provided:</p>
              <div className='single-detail-image w-75'>
              
                {customOrder.images &&
                  customOrder.images.map((item) => (
                    <img
                      className="CarouselImage"
                     
                      src={item.url}
                      alt={`Slide`}
                    />
                  ))}
            


            {/* {customOrder.images &&
  customOrder.images.map((item, index) => (
    <div key={index} className="image-container">
      <img className="CarouselImage" src={item.url} alt={`Slide`} />
      <a
        href={item.url}
        download={`artwork_${index}.jpg`} // You can customize the filename and extension here
        className="download-button"
        onClick={(e) => {
          e.preventDefault();
          fetch(item.url)
            .then((response) => response.blob())
            .then((blob) => {
              const url = window.URL.createObjectURL(new Blob([blob]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", `artwork_${index}.jpg`);
              document.body.appendChild(link);
              link.click();
              link.parentNode.removeChild(link);
            });
        }}
      >
        Download
      </a>
    </div>
  ))} */}



              </div>
          </div>
      </div>
      </div> 
      </div>
  
  
  
  
 
      </>
  );
};

export default CustomOrderDetails;
