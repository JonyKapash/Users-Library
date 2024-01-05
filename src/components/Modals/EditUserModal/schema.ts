import * as yup from "yup";

export const editUserValidationSchema = yup.object().shape({
  title: yup.string().min(3).required(),
  first: yup.string().min(3).required(),
  last: yup.string().min(3).required(),
  email: yup.string().email().required(),
  country: yup.string().min(3).required(),
  city: yup.string().min(3).required(),
  streetName: yup.string().min(3).required(),
  streetNumber: yup.number().min(1).required(),
});
