import * as yup from "yup";

export const recipeValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  visibility: yup.string(),
  directions: yup.string(),
  rating: yup.number().min(0).max(5),
  dateOfOrigin: yup.date().required("Date of origin is required"),
  // firstName: yup.string()
  //     .required('First Name is required'),
  // lastName: yup.string()
  //     .required('Last Name is required'),
  // email: yup.string()
  //     .email('Email is invalid')
  //     .required('Email is required'),
  // role: yup.string()
  //     .required('Role is required'),
  // password: yup.string()
  //     .transform(x => x === '' ? undefined : x)
  //     .concat(isAddMode ? yup.string().required('Password is required') : null)
  //     .min(6, 'Password must be at least 6 characters'),
  // confirmPassword: yup.string()
  //     .transform(x => x === '' ? undefined : x)
  //     .when('password', (password, schema) => {
  //         if (password || isAddMode) return schema.required('Confirm Password is required');
  //     })
  //     .oneOf([yup.ref('password')], 'Passwords must match')
});
