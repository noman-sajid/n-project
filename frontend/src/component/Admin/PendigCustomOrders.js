import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./customOrderList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getPendingCustomOrders,
  deleteCustomOrder,
  confirmCustomOrder,
  declineCustomOrder,
} from "../../actions/customOrderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_CUSTOM_ORDER_RESET,
         CONFIRM_CUSTOM_ORDER_RESET,
         DECLINE_CUSTOM_ORDER_RESET 

} from "../../constants/customOrderConstants";

const PendingCustomOrder = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, customOrders } = useSelector((state) => state.customOrders);
  const confirmSuccess = useSelector((state) => state.customOrder.success);
  const declineSuccess = useSelector((state) => state.customOrder.success);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.customOrder
  );

  const deleteCustomOrderHandler = (id) => {
    dispatch(deleteCustomOrder(id));
  };

  const confirmOrderHandler = (orderId) => {
    dispatch(confirmCustomOrder(orderId));
    alert.success("Custom Order Confirmed Successfully");
    history.push("/admin/pending-custom-orders");
  };

  const declineOrderHandler = (orderId) => {
    dispatch(declineCustomOrder(orderId));
    alert.success("Custom Order declined Successfully");
    history.push("/admin/pending-custom-orders");
    
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
  
    if (isDeleted) {
      alert.success("CustomOrder Deleted Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_CUSTOM_ORDER_RESET });
    }
  
    if (confirmSuccess) {
      alert.success("CustomOrder Confirmed Successfully");
      history.push("/")
      dispatch({ type: CONFIRM_CUSTOM_ORDER_RESET });
    }
  
    if (declineSuccess) {
      alert.success("CustomOrder Declined Successfully");
      dispatch({ type: DECLINE_CUSTOM_ORDER_RESET });
    }
  
    dispatch(getPendingCustomOrders());
  }, [
    dispatch,
    alert,
    error,
    deleteError,
    history,
    isDeleted,
    confirmSuccess,
    declineSuccess,
  ]);
  

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
    // {
    //   field: "stock",
    //   headerName: "Stock",
    //   type: "number",
    //   minWidth: 150,
    //   flex: 0.3,
    // },

    {
      field: "email",
      headerName: "Email",
      
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
  color="primary"
  onClick={() => confirmOrderHandler(params.getValue(params.id, "id"))}
  disabled={confirmSuccess} // Disable the button after confirmation
>
  {confirmSuccess && confirmSuccess === params.getValue(params.id, "id") ? "Confirmed" : "Confirm"}
</Button>

<Button
  variant="contained"
  color="secondary"
  onClick={() => declineOrderHandler(params.getValue(params.id, "id"))}
  disabled={declineSuccess} // Disable the button after decline
>
  {declineSuccess && declineSuccess === params.getValue(params.id, "id") ? "Declined" : "Decline"}
</Button>

          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  customOrders &&
    customOrders.forEach((item) => {
      rows.push({
        id: item._id,
        // stock: item.Stock,
        email: item.email,
        name: item.name,
      });
    });

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

export default PendingCustomOrder;
