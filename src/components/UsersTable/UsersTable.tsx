import { FC, useState } from "react";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import AddUserModal from "../Modals/AddUserModal/AddUserModal";
import { User } from "../../utils/types";
import { useFormik } from "formik";
import EditUserModal from "../Modals/EditUserModal/EditUserModal";

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

  // const [open, setOpen] = useState(false);

  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  console.log("selectedField", selectedField);
  console.log("selectedValue", selectedValue);

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 120,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.name ? params.row.name.title : "",
    },
    {
      field: "first",
      headerName: "Name",
      width: 120,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.name ? params.row.name.first : "",
    },
    {
      field: "last",
      headerName: "Last Name",
      width: 120,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.name ? params.row.name.last : "",
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      editable: true,
    },
    {
      field: "location_country",
      headerName: "Country",
      width: 120,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.location ? params.row.location.country : "",
    },
    {
      field: "location_city",
      headerName: "City",
      width: 120,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.location ? params.row.location.city : "",
    },
    {
      field: "location_street_name",
      headerName: "Street",
      width: 120,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.location?.street ? params.row.location.street.name : "",
    },
    {
      field: "location_street_number",
      headerName: "Street Number",
      type: "number",
      width: 130,
      editable: true,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.location?.street ? params.row.location.street.number : null,
    },
  ];

  const toggleEditUserModal = (params?: GridCellParams) => {
    if (params) {
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
