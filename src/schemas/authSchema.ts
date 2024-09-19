import * as yup from "yup";
import {
  checkboxValidation,
  confirmPasswordValidation,
  emailValidation,
  fieldRequiredValidation,
  passwordValidation,
} from "@schemas/validationRules";

export const loginSchema = yup.object({
  email: emailValidation,
  password: passwordValidation,
});

export const workspaceDetailsSchema = yup.object({
  workspace: fieldRequiredValidation("WorkSpace"),
  email: emailValidation,
  termsAndConditions: checkboxValidation("You must agree to the Terms and Conditions"),
  personalData: checkboxValidation("You must authorize personal data processing"),
});

export const useCredentialsSchema = yup.object({
  name: fieldRequiredValidation("Name"),
  surname: fieldRequiredValidation("Surname"),
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation("password"),
});

export const passwordResetSchema = yup.object({
  email: emailValidation,
});

export const passwordResetConfirmSchema = yup.object({
  password: passwordValidation,
  confirmPassword: confirmPasswordValidation("password"),
});
