import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./customOrderList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteCustomOrder,
  getAssignedCustomOrders,
} from "../../actions/customOrderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { DELETE_CUSTOM_ORDER_RESET } from "../../constants/customOrderConstants";

const AssignedCustomOrder = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, customOrders } = useSelector((state) => state.customOrders);
  const { success: deleteSuccess, error: deleteError } = useSelector(
    (state) => state.customOrder
  );

  const deleteOrderHandler = (orderId) => {
    dispatch(deleteCustomOrder(orderId));
    alert.success("Order Deleted")
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (deleteSuccess) {
      alert.success("CustomOrder Deleted Successfully");
      dispatch({ type: DELETE_CUSTOM_ORDER_RESET });
      history.go(0); // Reload the page
    }

    dispatch(getAssignedCustomOrders());
  }, [dispatch, alert, error, deleteError, deleteSuccess, history]);

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
      field: "progress",
      headerName: "Progress",
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
      field: "assignedTo",
      headerName: "Assigned To", // New column for the name of the user order is assigned to
      minWidth: 200,
      flex: 0.3,
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
              color="secondary"
              onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}
              disabled={deleteSuccess}
            >
              Delete
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
    progress :item.progress,
    assignedTo: item.assignedTo, // Assuming the assignedTo field contains the user object with a name property
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

export default AssignedCustomOrder;
