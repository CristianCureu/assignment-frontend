import * as yup from "yup";
import {
  emailValidation,
  fieldRequiredValidation,
  hexColorValidation,
} from "@schemas/validationRules";

export const processSchema = yup.object({
  name: fieldRequiredValidation("Name"),
  color: hexColorValidation,
});

export const userEmailSchema = yup.object({
  email: emailValidation,
});
