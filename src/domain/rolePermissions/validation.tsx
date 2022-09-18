import * as yup from "yup";

export const rolePermissionValidationSchema = yup.object({
  role: yup.string(),
  permission: yup.string(),
});