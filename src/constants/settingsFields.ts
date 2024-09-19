import { Field } from "@src/types/formTypes";

export const profileSettingsFields: Field[] = [
  {
    name: "avatar",
    label: "Avatar",
    type: "file",
  },
  {
    name: "username",
    label: "Username",
    type: "text",
    disabled: true,
  },
  {
    name: "name",
    label: "First Name",
    type: "text",
  },
  {
    name: "surname",
    label: "Last Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
];

export const passwordSettingsFields: Field[] = [
  {
    name: "currentPassword",
    label: "Current Password",
    type: "password",
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
  },
  {
    name: "confirmNewPassword",
    label: "Confirm New Password",
    type: "password",
  },
];
