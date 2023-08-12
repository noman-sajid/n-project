import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./customOrderList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminCustomOrder,
  deleteCustomOrder,
} from "../../actions/customOrderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_CUSTOM_ORDER_RESET } from "../../constants/customOrderConstants";

const CustomOrderList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, customOrders } = useSelector((state) => state.customOrders);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.customOrder
  );

  const deleteCustomOrderHandler = (id) => {
    dispatch(deleteCustomOrder(id));
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

    dispatch(getAdminCustomOrder());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

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
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/customOrder/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteCustomOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
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

export default CustomOrderList;
