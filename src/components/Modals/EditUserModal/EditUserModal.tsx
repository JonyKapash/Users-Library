import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { ButtonContainer, StyledBox } from "./EditUserModal.styles";

interface EditUserModalProps {
  open: boolean;
  selectedField: string;
  selectedValue: string;
  handleClose: () => void;
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

const EditUserModal: FC<EditUserModalProps> = ({
  open,
  selectedField,
  selectedValue,
  handleClose,
}) => {
  const formik = useFormik({
    initialValues: {
      [selectedField]: selectedValue || "",
    },
    validationSchema: yup.object().shape({
      [selectedField]:
        editUserValidationSchema.fields[
          selectedField as keyof typeof editUserValidationSchema.fields
        ],
    }),
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
        aria-labelledby="edit-user-modal"
        aria-describedby="edit-user-modal"
      >
        <StyledBox>
          <Typography mb={2} id="edit-user-modal" variant="h6" component="h2">
            Edit User
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              id={selectedField}
              name={selectedField}
              label={selectedField}
              value={formik.values[selectedField]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched[selectedField] &&
                Boolean(formik.errors[selectedField])
              }
              helperText={
                formik.touched[selectedField] && formik.errors[selectedField]
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

export default EditUserModal;
