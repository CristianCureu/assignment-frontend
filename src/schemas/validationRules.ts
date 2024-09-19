import * as yup from "yup";

export const emailValidation = yup
  .string()
  .email("Invalid email address")
  .required("Email is required");

export const passwordValidation = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[\W_]/, "Password must contain at least one special character")
  .required("Password is required");

export const confirmPasswordValidation = (ref: string) =>
  yup
    .string()
    .oneOf([yup.ref(ref)], "Passwords must match")
    .required("Please confirm your password");

export const fieldRequiredValidation = (fieldName: string) =>
  yup.string().required(`${fieldName} is required`);

export const checkboxValidation = (message: string) =>
  yup.boolean().oneOf([true], message);

export const checkboxGroupValidation = (message: string) =>
  yup.string().required(message);

export const hexColorValidation = yup
  .string()
  .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color format")
  .required("Color is required");
