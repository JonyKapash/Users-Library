/*
This page will show all the users resolved from the requests with a proper design
1. The design should be responsive. 
2. Use material-ui.
3. Each user can edit(locally). 
4. The edit button should open a modal with save and cancel buttons. 
5. The fields that can be edited are- Name, Email, and Location. 
6. Proper validation should be included - use ‘yup’ for validation
    * -  All Fields cannot be empty. 
    * -  Name - min of 3 characters. 
    * -  Email - should be a valid email address. 
    * -  Each user should have a unique email address 
    * -  If validation fails,  error message should be shown when trying to save a user - don’t use HTML5 validation. 
7. Implement “Add user” button - This should open a new save user form modal.all fields should have ‘yup’ validations.form fields should be: Name - title, first name, last name. Email. User image-medium. Location-country, city, street.uuid - generated automatically. 
8. Each user can be deleted (show confirm message before deleting). 
9. Add a search filter by email, name, id, and location(client-side search).
10. the users are passed from the parent component (App.tsx) to the child component (UsersTable.tsx) as a prop.
11. use dateGrid to show the users.
 */

import { FC } from "react";
import { User } from "../../utils/types";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

interface UsersTableProps {
  users: User[];
}

const UsersTable: FC<UsersTableProps> = ({ users }) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
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
      width: 200,
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
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.name?.first || ""} ${params.row.name?.last || ""}`,
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
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
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default UsersTable;
