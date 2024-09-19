import * as yup from "yup";
import {
  checkboxGroupValidation,
  emailValidation,
  fieldRequiredValidation,
} from "@schemas/validationRules";

export const cardSchema = yup.object({
  name: fieldRequiredValidation("Name"),
  email: emailValidation,
  phoneNumber: fieldRequiredValidation("Phone Number"),
  phoneProvider: fieldRequiredValidation("Phone Provider"),
  description: fieldRequiredValidation("Description"),
  companyData: yup.object({
    companyName: fieldRequiredValidation("Company Name"),
    surname: fieldRequiredValidation("Surname"),
    type: checkboxGroupValidation("Company Type is required"),
  }),
  gender: checkboxGroupValidation("Gender is required"),
  contractNumber: fieldRequiredValidation("Contract Number"),
  contractType: fieldRequiredValidation("Contract Type"),
  newContractDate: fieldRequiredValidation("New Contract Date"),
});

export const createCardSchema = yup.object({
  name: fieldRequiredValidation("Name"),
  email: emailValidation,
  phoneNumber: fieldRequiredValidation("Phone Number"),
  phoneProvider: fieldRequiredValidation("Phone Provider"),
  description: fieldRequiredValidation("Description"),
  companyData: yup.object({
    companyName: fieldRequiredValidation("Company Name"),
    surname: fieldRequiredValidation("Surname"),
    type: checkboxGroupValidation("Company Type is required"),
  }),
  gender: checkboxGroupValidation("Gender is required"),
  contractNumber: fieldRequiredValidation("Contract Number"),
  contractType: fieldRequiredValidation("Contract Type"),
  startDate: fieldRequiredValidation("Start Date"),
  newContractDate: fieldRequiredValidation("New Contract Date"),
});
