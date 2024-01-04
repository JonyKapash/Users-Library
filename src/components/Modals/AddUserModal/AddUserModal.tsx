import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { ButtonContainer, StyledBox } from "./AddUserModal.styles";

interface AddUserModalProps {
  open: boolean;
  handleClose: () => void;
}

const addUserValidationSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
});

const AddUserModal: FC<AddUserModalProps> = ({ open, handleClose }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    validationSchema: addUserValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
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
              sx={{ mb: 2 }}
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
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
