import { Field } from "@src/types/formTypes";

export const loginFields: Field[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

export const workspaceDetailsFields: Field[] = [
  {
    name: "workspace",
    label: "WorkSpace Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "termsAndConditions",
    label: "Agree with Terms and Conditions",
    type: "checkbox",
  },
  {
    name: "personalData",
    label: "I authorize Coraly to process my personal data",
    type: "checkbox",
  },
];

export const userCredentialsFields: Field[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "surname",
    label: "Surname",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Repeat Password",
    type: "password",
  },
];

export const passwordResetField: Field[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
];

export const passwordResetFields: Field[] = [
  {
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Repeat Password",
    type: "password",
  },
];
