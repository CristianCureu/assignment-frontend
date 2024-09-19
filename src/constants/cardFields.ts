import { Field } from "@src/types/formTypes";

export const cardFields: Field[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
  },
  {
    name: "phoneProvider",
    label: "Phone Provider",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
  },
  {
    name: "companyData.companyName",
    label: "Company Name",
    type: "text",
  },
  {
    name: "companyData.surname",
    label: "Surname",
    type: "text",
  },
  {
    name: "companyData.type",
    label: "Company Type",
    type: "checkboxGroup",
    options: [
      { value: "person", label: "Person" },
      { value: "company", label: "Company" },
    ],
  },
  {
    name: "gender",
    label: "Gender",
    type: "checkboxGroup",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "none", label: "None" },
    ],
  },
  {
    name: "contractNumber",
    label: "Contract Number",
    type: "text",
  },
  {
    name: "contractType",
    label: "Contract Type",
    type: "select",
    options: [
      { value: "1 month", label: "1 Month" },
      { value: "6 months", label: "6 Months" },
      { value: "1 year", label: "1 Year" },
    ],
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "date",
  },
  {
    name: "newContractDate",
    label: "New Contract Date",
    type: "date",
  },
];

export const createCardFields: Field[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "text",
  },
  {
    name: "phoneProvider",
    label: "Phone Provider",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
  },
  {
    name: "companyData.companyName",
    label: "Company Name",
    type: "text",
  },
  {
    name: "companyData.surname",
    label: "Surname",
    type: "text",
  },
  {
    name: "companyData.type",
    label: "Company Type",
    type: "checkboxGroup",
    options: [
      { value: "person", label: "Person" },
      { value: "company", label: "Company" },
    ],
  },
  {
    name: "gender",
    label: "Gender",
    type: "checkboxGroup",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "none", label: "None" },
    ],
  },
  {
    name: "contractNumber",
    label: "Contract Number",
    type: "text",
  },
  {
    name: "contractType",
    label: "Contract Type",
    type: "select",
    options: [
      { value: "1 month", label: "1 Month" },
      { value: "6 months", label: "6 Months" },
      { value: "1 year", label: "1 Year" },
    ],
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "date",
  },
  {
    name: "newContractDate",
    label: "New Contract Date",
    type: "date",
  },
];
