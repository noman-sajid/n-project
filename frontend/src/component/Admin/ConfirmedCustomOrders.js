import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  assignCustomOrder,
  getConfirmedCustomOrders,
} from "../../actions/customOrderAction";
import { getTeamUsers } from "../../actions/userAction";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

const ConfirmedCustomOrder = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, customOrders } = useSelector(
    (state) => state.customOrders
  );
  const { success: assignSuccess, error: assignError } = useSelector(
    (state) => state.assignCustomOrder
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.customOrder
  );

  const { loading: teamLoading, users: teamMembers, error: teamError } =
    useSelector((state) => state.teamUsers);

  const [selectedTeamMember, setSelectedTeamMember] = useState({}); // Updated state

  const deleteCustomOrderHandler = (id) => {
    dispatch(deleteCustomOrder(id));
  };

  const assignOrderHandler = (orderId) => {
    if (!selectedTeamMember[orderId]) {
      alert.error("Please select a team member to assign the custom order to.");
      return;
    }
  
    dispatch(assignCustomOrder(orderId, selectedTeamMember[orderId]));
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
    }

    if (assignSuccess) {
      alert.success("CustomOrder Assigned Successfully");
      history.push("/admin/confirmed-custom-orders");
    }

    dispatch(getConfirmedCustomOrders());
    dispatch(getTeamUsers());
  }, [
    dispatch,
    alert,
    error,
    deleteError,
    history,
    isDeleted,
    assignSuccess,
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
        const orderId = params.getValue(params.id, "id"); // Get the order ID
        return (
          <Fragment>
            <FormControl variant="outlined">
              <InputLabel id={`team-member-label-${params.id}`}></InputLabel>
              {teamLoading ? (
                <p>Loading team member data...</p>
              ) : (
                <FormControl variant="outlined">
                  <InputLabel id={`team-member-label-${params.id}`}></InputLabel>
                  <Select
                    labelId={`team-member-label-${params.id}`}
                    id={`team-member-select-${params.id}`}
                    value={selectedTeamMember[orderId] || ""}
                    onChange={(event) =>
                      setSelectedTeamMember({
                        ...selectedTeamMember,
                        [orderId]: event.target.value,
                      })
                    }
                    label="Assign To"
                  >
                    {teamMembers &&
                      teamMembers.map((member) => (
                        <MenuItem key={member._id} value={member._id}>
                          {member.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={() => assignOrderHandler(orderId)}
            >
              Assign
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
  }));

  return (
    <Fragment>
      <div className="class-for-margin-top">
        <MetaData title={`Confirmed orders - Admin`} />
        <div className="dashboard">
          <SideBar />
          <div className="customOrderListContainer">
            <h1 id="customOrderListHeading">Confirmed Custom Orders</h1>
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

export default ConfirmedCustomOrder;
