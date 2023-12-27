// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useHistory } from 'react-router-dom';
// import './Csidebar.css';

// function Csidebar() {
//   const history = useHistory();
//   const [activeOption, setActiveOption] = useState(null);

//   const handleNavigation = (option, route) => {
//     setActiveOption(option);
//     history.push(route);
//   };

//   return (
//     <div className="sidebar-container">
//       <div className="user-sidebar">
//         <div className='welcome-msg'> 
//           <i className="fas fa-smile"></i> Welcome !
//         </div>
//         <div className="usidebar-options">
//           <div
//             className={`usidebar-option ${activeOption === 'new' ? 'active' : ''}`}
//             onClick={() => handleNavigation('new', '/custom-order')}
//           >
//             <i className="fas fa-shopping-cart"></i> New Order
//           </div>
//           <div
//             className={`usidebar-option ${activeOption === 'pending' ? 'active' : ''}`}
//             onClick={() => handleNavigation('pending', '/user/pending-custom-orders')}
//           >
//             <i className="fas fa-clock"></i> Pending Orders
//           </div>
//           <div
//             className={`usidebar-option ${activeOption === 'completed' ? 'active' : ''}`}
//             onClick={() => handleNavigation('completed', '/c')}
//           >
//             <i className="fas fa-check"></i> Completed Order
//           </div>
//           <div 
//             className={`usidebar-option ${activeOption === 'invoices' ? 'active' : ''}`}
//             onClick={() => handleNavigation('invoices', '/entertainment')}
//           >
//             <i className="fas fa-file-invoice"></i> Invoices
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Csidebar;


import React from "react";
import "./Csidebar.css";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Csidebar = () => {
  return (
    <div className="sidebar">
     
        <h1 className="raa-heading">RAA Digitizing</h1>
    
      <Link to="/custom-order">
        <p>
       <AddShoppingCartIcon/>  New Order
        </p>
      </Link>
      
      <Link to="/user/pending-custom-orders">
        <p>
          <HourglassTopIcon/>
         Pending Orders
        </p>
      </Link>
      

      <Link to="/admin/reviews">
        <p>
          <CheckCircleIcon/>
           Completed Orders
        </p>
      </Link>


      <Link to="/admin/reviews">
        <p>
          <ReceiptIcon/>
           Receipts
        </p>
      </Link>
     
    
      
    </div>
  );
};

export default Csidebar;
