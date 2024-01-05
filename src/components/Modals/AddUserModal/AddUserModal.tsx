import { FC } from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { ButtonContainer, StyledBox } from "./AddUserModal.styles";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../store/slices/users";
import { RootState } from "../../../store/store";

interface AddUserModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddUserModal: FC<AddUserModalProps> = ({ open, handleClose }) => {
  const users = useSelector((state: RootState) => state.users.users);

  const addUserValidationSchema = yup.object().shape({
    title: yup.string().min(3).required(),
    first: yup.string().min(3).required(),
    last: yup.string().min(3).required(),
    email: yup
      .string()
      .email()
      .required()
      .test("unique", "This email already exists", (value) => {
        return !users.some((user) => user.email === value);
      }),
    country: yup.string().min(3).required(),
    city: yup.string().min(3).required(),
    streetName: yup.string().min(3).required(),
    streetNumber: yup.number().min(1).required(),
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      first: "",
      last: "",
      email: "",
      country: "",
      city: "",
      streetName: "",
      streetNumber: "",
    },
    validationSchema: addUserValidationSchema,
    onSubmit: (values) => {
      const userWithId = { ...values, id: uuidv4() };
      dispatch(addUser(userWithId));
      formik.resetForm();
      handleClose();
    },
  });

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-user-modal"
        aria-describedby="add-user-modal"
      >
        <StyledBox>
          <Typography mb={2} id="add-user-modal" variant="h6" component="h2">
            Add User
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="title"
              name="title"
              label="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="first"
              name="first"
              label="Name"
              value={formik.values.first}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.first && Boolean(formik.errors.first)}
              helperText={formik.touched.first && formik.errors.first}
            />
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="last"
              name="last"
              label="Last Name"
              value={formik.values.last}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.last && Boolean(formik.errors.last)}
              helperText={formik.touched.last && formik.errors.last}
            />
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="country"
              name="country"
              label="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="city"
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="streetName"
              name="streetName"
              label="Street Name"
              value={formik.values.streetName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.streetName && Boolean(formik.errors.streetName)
              }
              helperText={formik.touched.streetName && formik.errors.streetName}
            />
            <TextField
              sx={{ mb: 1 }}
              fullWidth
              id="streetNumber"
              name="streetNumber"
              label="Street Number"
              value={formik.values.streetNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.streetNumber &&
                Boolean(formik.errors.streetNumber)
              }
              helperText={
                formik.touched.streetNumber && formik.errors.streetNumber
              }
            />
            <ButtonContainer>
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  formik.resetForm();
                  handleClose();
                }}
              >
                Cancel
              </Button>
            </ButtonContainer>
          </form>
        </StyledBox>
      </Modal>
    </Box>
  );
};

export default AddUserModal;
