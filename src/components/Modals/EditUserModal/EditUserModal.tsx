import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { ButtonContainer, StyledBox } from "./EditUserModal.styles";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../store/slices/users";
import { RootState } from "../../../store/store";

interface EditUserModalProps {
  open: boolean;
  selectedUserId: string;
  selectedField: string;
  selectedValue: string;
  handleClose: () => void;
}

const EditUserModal: FC<EditUserModalProps> = ({
  open,
  selectedUserId,
  selectedField,
  selectedValue,
  handleClose,
}) => {
  const users = useSelector((state: RootState) => state.users.users);

  const editUserValidationSchema = yup.object().shape({
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
      [selectedField]: selectedValue || "",
    },
    validationSchema: yup.object().shape({
      [selectedField]:
        editUserValidationSchema.fields[
          selectedField as keyof typeof editUserValidationSchema.fields
        ],
    }),
    onSubmit: (values) => {
      dispatch(
        updateUser({
          id: selectedUserId,
          field: selectedField,
          value: values[selectedField],
        })
      );
      handleClose();
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
