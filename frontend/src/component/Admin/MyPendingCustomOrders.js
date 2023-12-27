import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./customOrderList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myPendingCustomOrders } from "../../actions/customOrderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import SideBar from "../cdash/Csidebar";

const MyPendingCustomOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, customOrders } = useSelector((state) => state.customOrders);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myPendingCustomOrders());
  }, [dispatch, alert, error]);

  const columns = [
    {
      field: "id",
      headerName: "CustomOrder ID",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <Link to={`/custom-order-details/${params.getValue(params.id, "id")}`}>
          {params.value}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 1,
    },
   
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Order Status",
      minWidth: 200,
      flex: 1,
    },
  ];

  const rows = customOrders.map((item) => ({
    id: item._id,
    email: item.email,
    name: item.name,
    status: item.status,
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

export default MyPendingCustomOrder;
