import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myCustomOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myCustomOrders } from "../../actions/customOrderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyCustomOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, customOrders } = useSelector((state) => state.myCustomOrders);
  const { user } = useSelector((state) => state.user);

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
        field: "status",
        headerName: "Status",
      
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
          <Link to={`/customOrder/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  customOrders &&
    customOrders.forEach((item, index) => {
      rows.push({
        id: item._id,
        // stock: item.Stock,
       status:item.status,
        name: item.name,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myCustomOrders(user._id));
  }, [dispatch, alert, error, user._id]); 

  return (
    <Fragment>
      <MetaData title={`${user.name} - CustomOrders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myCustomOrdersPage">
         <div className="class-for-margin-top-mycustomOrder">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myCustomOrdersTable"
            autoHeight
          />

          <Typography id="myCustomOrdersHeading">{user.name}'s CustomOrders</Typography>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MyCustomOrders;
