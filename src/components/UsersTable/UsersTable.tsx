import { FC, useEffect, useState } from "react";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import AddUserModal from "../Modals/AddUserModal/AddUserModal";
import { User } from "../../utils/types";
import { useFormik } from "formik";
import EditUserModal from "../Modals/EditUserModal/EditUserModal";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../store/slices/users";

interface UsersTableProps {
  users: User[];
}

const editUserValidationSchema = yup.object().shape({
  title: yup.string().min(3).required(),
  first: yup.string().min(3).required(),
  last: yup.string().min(3).required(),
  email: yup.string().email().required(),
  location_country: yup.string().min(3).required(),
  location_city: yup.string().min(3).required(),
  location_street_name: yup.string().min(3).required(),
  location_street_number: yup.number().min(1).required(),
});

const UsersTable: FC<UsersTableProps> = ({ users }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      first: "",
      last: "",
      email: "",
      location_country: "",
      location_city: "",
      location_street_name: "",
      location_street_number: "",
    },
    validationSchema: editUserValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
    },
  });

  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      sortable: false,
      width: 100,
      editable: false,
      renderCell: (params) => {
        const imageUrl = params.row.picture;

        return (
          <img
            src={imageUrl}
            alt=""
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        );
      },
    },
    { field: "title", headerName: "Title", width: 120, editable: true },
    { field: "first", headerName: "First Name", width: 120, editable: true },
    { field: "last", headerName: "Last Name", width: 120, editable: true },
    { field: "email", headerName: "Email", width: 220, editable: true },
    { field: "country", headerName: "Country", width: 120, editable: true },
    { field: "city", headerName: "City", width: 120, editable: true },
    {
      field: "streetName",
      headerName: "Street Name",
      width: 120,
      editable: true,
    },
    {
      field: "streetNumber",
      headerName: "Street Number",
      type: "number",
      width: 130,
      editable: true,
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const onClick = (event: React.MouseEvent) => {
          event.stopPropagation();
          const idToDelete = params.id;
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
          );
          if (confirmDelete) {
            dispatch(deleteUser(idToDelete));
          }
        };
        return <Button onClick={onClick}>Delete</Button>;
      },
    },
  ];

  const toggleEditUserModal = (params?: GridCellParams) => {
    if (params) {
      setSelectedUserId(params.id as string);
      setSelectedField(params.field);
      setSelectedValue(params.value as string);
    }
    setIsEditUserModalOpen((prev) => !prev);
  };

  const toggleAddUserModal = () => {
    setIsAddUserModalOpen(!isAddUserModalOpen);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Button
        sx={{ mb: 2 }}
        onClick={toggleAddUserModal}
        variant="contained"
        color="primary"
      >
        Add User
      </Button>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        onCellClick={toggleEditUserModal}
      />
      <EditUserModal
        open={isEditUserModalOpen}
        handleClose={toggleEditUserModal}
        selectedUserId={selectedUserId}
        selectedField={selectedField}
        selectedValue={selectedValue}
      />
      <AddUserModal
        open={isAddUserModalOpen}
        handleClose={toggleAddUserModal}
      />
    </Box>
  );
};

export default UsersTable;
