import * as yup from "yup";
import {
  confirmPasswordValidation,
  emailValidation,
  fieldRequiredValidation,
  passwordValidation,
} from "@schemas/validationRules";

export const profileSettingsSchema = yup.object({
  name: fieldRequiredValidation("Name"),
  surname: fieldRequiredValidation("Surname"),
  email: emailValidation,
});

export const passwordSettingsSchema = yup.object({
  currentPassword: passwordValidation,
  newPassword: passwordValidation,
  confirmNewPassword: confirmPasswordValidation("newPassword"),
});
