import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./customOrderList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProgress, // Import the action for updating progress
  myAssignedCustomOrders,
} from "../../actions/customOrderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button, TextField } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { UPDATE_PROGRESS_RESET } from "../../constants/customOrderConstants";

const MyAssignedCustomOrder = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, customOrders } = useSelector((state) => state.customOrders);
  const { success: updateSuccess, error: updateError } = useSelector(
    (state) => state.updateProgress
  );

  const [progressInputs, setProgressInputs] = useState({});// State for progress input
  const updateProgressHandler = (orderId) => {
    const progressValue = progressInputs[orderId];
    if (!progressValue || isNaN(progressValue) || progressValue < 0 || progressValue > 100) {
      alert.error("Please enter a valid progress value between 0 and 100.");
      return;
    }

    dispatch(updateProgress(orderId, parseInt(progressValue)));
  };

  const handleProgressInputChange = (orderId, value) => {
    setProgressInputs((prevInputs) => ({
      ...prevInputs,
      [orderId]: value,
    }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (updateSuccess) {
      alert.success("Progress Updated Successfully");
      dispatch({ type: UPDATE_PROGRESS_RESET });
     history.push("/user/assigned-custom-orders") // Reload the page
    }

    dispatch(myAssignedCustomOrders());
  }, [dispatch, alert, error, updateError, updateSuccess, history]);

  const columns = [
    {
      field: "id",
      headerName: "CustomOrder ID",
      minWidth: 200,
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/custom-order-details/${params.getValue(params.id, "id")}`}>
          {params.value}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 0.5,
    },
   
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "status",
      headerName: "Order Status",
      minWidth: 200,
      flex: 0.3,
      
    },
    {
      field: "progressInput",
      headerName: "Progress",
      minWidth: 350,
      flex: 0.5,
      renderCell: (params) => (
        <TextField
          variant="outlined"
          type="number"
          value={progressInputs[params.getValue(params.id, "id")] || ""}
          onChange={(event) =>
            handleProgressInputChange(params.getValue(params.id, "id"), event.target.value)
          }
          inputProps={{ min: 0, max: 100 }}
        />
      ),
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateProgressHandler(params.getValue(params.id, "id"))}
            >
              Update
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = customOrders.map((item) => ({
    id: item._id,
    email: item.email,
    name: item.name,
    status: item.status,
    progressInput: progressInputs[item._id] || "",  // Assuming the assignedTo field contains the user object with a name property
  }));

  return (
    <Fragment>
      <div className="class-for-margin-top">
        <MetaData title={`ALL CUSTOM_ORDERS - Admin`} />

        <div className="dashboard">
          <SideBar />
          <div className="customOrderListContainer">
            <h1 id="customOrderListHeading">ALL CUSTOM_ORDERS</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="customOrderListTable"
              autoHeight
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyAssignedCustomOrder;
