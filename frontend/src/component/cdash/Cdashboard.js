// import React from 'react';
// import Csidebar from './Csidebar';
// import './Cdashboard.css';
// import NewCustomOrder from '../Admin/NewCustomOrder';
// import PendingCustomOrder from '../Admin/PendigCustomOrders';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// function Cdashboard() {
//   return (
//     <Router>
//       <div className='container-fluid mr-0 mb-0 ml-0 p-0 margin-top'>
//         <Csidebar />
//         <div className='welc' ></div>
//         <div className='c_content'>
//         <div className='Dashboard-Wel'>
//         <p>Welcome  <i className="fas fa-smile"></i> </p>
//         </div>
//         
//    
          
//         </div>
//       </div>
//     </Router>
//   );
// }

// // Replace ComponentA, ComponentB, and ComponentC with your actual components or use the component inline

// const ComponentA = () => <div>Content for Route A</div>;
// const ComponentB = () => <div>Content for Route B</div>;
// const ComponentC = () => <div>Content for Route C</div>;

// export default Cdashboard;
import React from "react";
import Sidebar from "./Csidebar.js";
import "./Cdashboard.css";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";

const UserDashboard = () => {
  return (
    <div className="class-for-margin-top">
      <div className="dashboard">
        <MetaData title="Dashboard - User Panel" />
        <Sidebar />
        <div className="dashboardContainer">
          <Typography variant="h4" component="h1" align="center">
            Welcome to Your Dashboard
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

