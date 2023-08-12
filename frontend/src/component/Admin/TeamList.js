import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./customOrderList.css";
import { useSelector, useDispatch } from "react-redux";
import { getTeamUsers, clearErrors } from "../../actions/userAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import SideBar from "./Sidebar";

const TeamUsersList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getTeamUsers());
  }, [dispatch, alert, error]);
  console.log(users);
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 1.5 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1.5 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1.5 },
    { field: "country", headerName: "Country_Code", minWidth: 50, flex: 1.5 },
    { field: "ph_no", headerName: "Phone No.", minWidth: 100, flex: 1 },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) =>
        params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor",
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const userRole = params.getValue(params.id, "role");

        if (userRole === "admin") {
          return null; // Hide the actions column for admin users
        }

        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
          </Fragment>
        );
      },
    },
  ];
  const rows = users.map((item) => ({
    id: item._id,
    role: item.role,
    email: item.email,
    name: item.name,
    country: item.country,
    ph_no: item.ph_no,
  }));
  console.log(rows);

  return (
    <Fragment>
      <div className="class-for-margin-top">
        <MetaData title={`ALL USERS - Admin`} />

        <div className="dashboard">
          <SideBar />
          <div className="customOrderListContainer">
            <h1 id="customOrderListHeading">ALL USERS</h1>

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

export default TeamUsersList;
